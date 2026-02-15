import { readFileSync } from "fs";
import { join } from "path";
import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "../config/database";
import { logger } from "../middleware/requestLogger";
import { env } from "../config/env";

interface ChatInput {
  conversationId?: string;
  message: string;
}

interface ChatResponse {
  conversationId: string;
  reply: string;
}

/**
 * MCP Service handles the recruiter Q&A chat feature.
 *
 * This service loads structured context documents about Ian and uses them
 * to generate grounded responses. In a production deployment, this would
 * integrate with an LLM API (e.g., Anthropic Claude) for natural language
 * generation. For the initial implementation, it uses keyword matching
 * against the context documents to provide relevant information.
 *
 * To upgrade to full LLM-powered responses:
 * 1. Add an Anthropic/OpenAI API key to environment variables
 * 2. Replace the generateResponse method with an LLM API call
 * 3. Pass the context documents as system prompt context
 */
export class McpService {
  private context: Map<string, string> = new Map();
  private anthropic: Anthropic | null = null;

  constructor() {
    this.loadContextDocuments();

    // Initialize Anthropic client if API key is available
    if (env.ANTHROPIC_API_KEY) {
      this.anthropic = new Anthropic({
        apiKey: env.ANTHROPIC_API_KEY,
      });
      logger.info("MCP service initialized with Claude AI");
    } else {
      logger.warn("ANTHROPIC_API_KEY not set - using keyword matching fallback");
    }
  }

  /**
   * Load all context documents from the filesystem.
   */
  private loadContextDocuments() {
    const contextDir = join(__dirname, "../mcp/context");
    const documents = ["about", "projects", "skills", "education", "experience"];

    for (const doc of documents) {
      try {
        const content = readFileSync(join(contextDir, `${doc}.md`), "utf-8");
        this.context.set(doc, content);
        logger.info(`Loaded MCP context document: ${doc}`);
      } catch {
        logger.warn(`MCP context document not found: ${doc}.md`);
      }
    }
  }

  /**
   * Handle an incoming chat message and return a response.
   */
  async handleChat(input: ChatInput): Promise<ChatResponse> {
    // Get or create conversation
    let conversationId = input.conversationId;

    if (!conversationId) {
      const conversation = await prisma.mcpConversation.create({
        data: {},
      });
      conversationId = conversation.id;
    }

    // Abuse protection: Limit messages per conversation
    const messageCount = await prisma.mcpMessage.count({
      where: { conversationId },
    });

    const MAX_MESSAGES_PER_CONVERSATION = 10; // 5 back-and-forth exchanges (cost control)
    if (messageCount >= MAX_MESSAGES_PER_CONVERSATION) {
      throw new Error(
        "This conversation has reached its message limit. Please start a new conversation."
      );
    }

    // Abuse protection: Check conversation age (expire old conversations)
    const conversation = await prisma.mcpConversation.findUnique({
      where: { id: conversationId },
    });

    if (conversation) {
      const conversationAge = Date.now() - conversation.startedAt.getTime();
      const MAX_CONVERSATION_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

      if (conversationAge > MAX_CONVERSATION_AGE_MS) {
        throw new Error(
          "This conversation has expired. Please start a new conversation."
        );
      }
    }

    // Store user message
    await prisma.mcpMessage.create({
      data: {
        conversationId,
        role: "user",
        content: input.message,
      },
    });

    // Generate response based on context
    const reply = await this.generateResponse(input.message);

    // Store assistant response
    await prisma.mcpMessage.create({
      data: {
        conversationId,
        role: "assistant",
        content: reply,
      },
    });

    return { conversationId, reply };
  }

  /**
   * Generate a response using Claude AI if available, otherwise fall back to keyword matching.
   */
  private async generateResponse(message: string): Promise<string> {
    // Use Claude AI if available
    if (this.anthropic) {
      return await this.generateAIResponse(message);
    }

    // Fall back to keyword matching
    return this.generateKeywordResponse(message);
  }

  /**
   * Generate a response using Claude AI with context grounding.
   */
  private async generateAIResponse(message: string): Promise<string> {
    try {
      // Build system prompt with all context documents
      const systemPrompt = Array.from(this.context.entries())
        .map(([key, value]) => `## ${key.toUpperCase()}\n${value}`)
        .join("\n\n---\n\n");

      const response = await this.anthropic!.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300, // Limit output tokens for $10/month budget (~$0.0045 per response)
        system: `You are an AI assistant on Ian Hwang's portfolio website, helping recruiters learn about Ian.

Answer questions based ONLY on the following context about Ian. Do not make up information.
Be professional, concise, and helpful. Keep responses under 200 words. Format your responses in clear paragraphs.

CONTEXT:
${systemPrompt}`,
        messages: [{ role: "user", content: message }],
      });

      const textContent = response.content.find((c) => c.type === "text");
      return textContent && textContent.type === "text"
        ? textContent.text
        : "I'm having trouble processing that question. Could you rephrase it?";
    } catch (error) {
      logger.error("Error generating AI response:", error);
      // Fall back to keyword matching on error
      return this.generateKeywordResponse(message);
    }
  }

  /**
   * Generate a response based on keyword matching (fallback method).
   */
  private generateKeywordResponse(message: string): string {
    const lowerMessage = message.toLowerCase();

    // Determine which context documents are relevant
    const relevantDocs: string[] = [];

    if (
      lowerMessage.includes("skill") ||
      lowerMessage.includes("technolog") ||
      lowerMessage.includes("language") ||
      lowerMessage.includes("framework") ||
      lowerMessage.includes("react") ||
      lowerMessage.includes("python") ||
      lowerMessage.includes("javascript")
    ) {
      const skills = this.context.get("skills");
      if (skills) relevantDocs.push(skills);
    }

    if (
      lowerMessage.includes("project") ||
      lowerMessage.includes("built") ||
      lowerMessage.includes("portfolio") ||
      lowerMessage.includes("complex")
    ) {
      const projects = this.context.get("projects");
      if (projects) relevantDocs.push(projects);
    }

    if (
      lowerMessage.includes("education") ||
      lowerMessage.includes("school") ||
      lowerMessage.includes("university") ||
      lowerMessage.includes("degree") ||
      lowerMessage.includes("course")
    ) {
      const education = this.context.get("education");
      if (education) relevantDocs.push(education);
    }

    if (
      lowerMessage.includes("experience") ||
      lowerMessage.includes("work") ||
      lowerMessage.includes("job") ||
      lowerMessage.includes("intern")
    ) {
      const experience = this.context.get("experience");
      if (experience) relevantDocs.push(experience);
    }

    if (
      lowerMessage.includes("about") ||
      lowerMessage.includes("who") ||
      lowerMessage.includes("background") ||
      lowerMessage.includes("available") ||
      lowerMessage.includes("contact") ||
      lowerMessage.includes("stand out") ||
      lowerMessage.includes("summary") ||
      lowerMessage.includes("candidate")
    ) {
      const about = this.context.get("about");
      if (about) relevantDocs.push(about);
    }

    // If no specific match, return the about section as a general response
    if (relevantDocs.length === 0) {
      const about = this.context.get("about");
      if (about) {
        return (
          "Here is some general information about Ian:\n\n" +
          this.extractSummary(about)
        );
      }
      return "I can answer questions about Ian's skills, projects, education, experience, and availability. What would you like to know?";
    }

    // Return the relevant context (trimmed to a reasonable length)
    const combined = relevantDocs.join("\n\n---\n\n");
    return this.extractSummary(combined);
  }

  /**
   * Extract the first ~800 characters of content as a summary.
   * In production, the LLM would synthesize a proper answer.
   */
  private extractSummary(content: string): string {
    // Remove markdown headers for cleaner output
    const cleaned = content
      .replace(/^#{1,3}\s+/gm, "")
      .replace(/\*\*/g, "")
      .trim();

    if (cleaned.length <= 800) return cleaned;
    return cleaned.slice(0, 800).trim() + "...";
  }
}
