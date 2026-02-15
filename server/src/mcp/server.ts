/**
 * MCP Server Module
 *
 * This module implements a Model Context Protocol (MCP) server that exposes
 * Ian's portfolio information as structured resources and tools.
 *
 * The MCP server can be used in two ways:
 *
 * 1. **Via the web chat UI**: The Express.js API routes in routes/mcp.ts
 *    provide a REST interface that the React frontend consumes. This uses
 *    the McpService for keyword-based responses (upgradeable to LLM).
 *
 * 2. **Via MCP-compatible clients**: Recruiters with MCP-compatible tools
 *    (e.g., Claude Desktop, Cursor, or other MCP clients) can connect
 *    directly to this server via SSE transport to use the tools and
 *    resources programmatically.
 *
 * To enable direct MCP client access, uncomment and configure the SSE
 * transport setup below.
 */

import { readFileSync } from "fs";
import { join } from "path";
import { logger } from "../middleware/requestLogger";

// Context document loader
const CONTEXT_DIR = join(__dirname, "context");

interface McpResource {
  name: string;
  uri: string;
  mimeType: string;
  content: string;
}

interface McpTool {
  name: string;
  description: string;
  handler: (params: Record<string, unknown>) => string;
}

class PortfolioMcpServer {
  private resources: Map<string, McpResource> = new Map();
  private tools: Map<string, McpTool> = new Map();

  constructor() {
    this.loadResources();
    this.registerTools();
  }

  /**
   * Load context documents as MCP resources.
   */
  private loadResources() {
    const docs = [
      { name: "about", uri: "about://ian" },
      { name: "projects", uri: "projects://ian" },
      { name: "skills", uri: "skills://ian" },
      { name: "education", uri: "education://ian" },
      { name: "experience", uri: "experience://ian" },
    ];

    for (const doc of docs) {
      try {
        const content = readFileSync(
          join(CONTEXT_DIR, `${doc.name}.md`),
          "utf-8"
        );
        this.resources.set(doc.name, {
          name: doc.name,
          uri: doc.uri,
          mimeType: "text/markdown",
          content,
        });
        logger.info(`MCP resource loaded: ${doc.name}`);
      } catch {
        logger.warn(`MCP resource not found: ${doc.name}.md`);
      }
    }
  }

  /**
   * Register MCP tools for structured queries.
   */
  private registerTools() {
    this.tools.set("get_candidate_summary", {
      name: "get_candidate_summary",
      description: "Get a high-level summary of Ian Hwang as a candidate",
      handler: () => {
        return this.resources.get("about")?.content || "No information available.";
      },
    });

    this.tools.set("get_project_details", {
      name: "get_project_details",
      description: "Get detailed information about Ian's projects",
      handler: (params) => {
        const content = this.resources.get("projects")?.content || "";
        const projectName = (params.projectName as string)?.toLowerCase();
        if (projectName) {
          // Try to find the specific project section
          const sections = content.split(/^## /m);
          const match = sections.find((s) =>
            s.toLowerCase().includes(projectName)
          );
          return match ? `## ${match}` : content;
        }
        return content;
      },
    });

    this.tools.set("get_skills_by_category", {
      name: "get_skills_by_category",
      description: "Get skills filtered by category",
      handler: (params) => {
        const content = this.resources.get("skills")?.content || "";
        const category = (params.category as string)?.toLowerCase();
        if (category) {
          const sections = content.split(/^## /m);
          const match = sections.find((s) =>
            s.toLowerCase().includes(category)
          );
          return match ? `## ${match}` : content;
        }
        return content;
      },
    });

    this.tools.set("get_education_details", {
      name: "get_education_details",
      description: "Get education background including coursework",
      handler: () => {
        return (
          this.resources.get("education")?.content || "No information available."
        );
      },
    });

    this.tools.set("get_contact_info", {
      name: "get_contact_info",
      description: "Get contact information and availability",
      handler: () => {
        const about = this.resources.get("about")?.content || "";
        // Extract contact section
        const contactIndex = about.indexOf("## Contact");
        const careerIndex = about.indexOf("## Career");
        if (contactIndex !== -1) {
          return about.slice(
            contactIndex,
            about.indexOf("\n## ", contactIndex + 1) === -1
              ? undefined
              : about.indexOf("\n## ", contactIndex + 1)
          );
        }
        if (careerIndex !== -1) {
          return about.slice(careerIndex);
        }
        return about;
      },
    });

    this.tools.set("check_skill_match", {
      name: "check_skill_match",
      description: "Check if Ian has experience with specific technologies",
      handler: (params) => {
        const technologies = params.technologies as string[];
        const skillsContent = (
          this.resources.get("skills")?.content || ""
        ).toLowerCase();

        const results = technologies.map((tech) => ({
          technology: tech,
          hasExperience: skillsContent.includes(tech.toLowerCase()),
        }));

        const matched = results.filter((r) => r.hasExperience);
        const unmatched = results.filter((r) => !r.hasExperience);

        let response = "";
        if (matched.length > 0) {
          response += `Ian has experience with: ${matched.map((r) => r.technology).join(", ")}.\n`;
        }
        if (unmatched.length > 0) {
          response += `No documented experience with: ${unmatched.map((r) => r.technology).join(", ")}.`;
        }
        return response;
      },
    });
  }

  /**
   * Get a resource by name.
   */
  getResource(name: string): McpResource | undefined {
    return this.resources.get(name);
  }

  /**
   * Execute a tool by name.
   */
  executeTool(name: string, params: Record<string, unknown> = {}): string {
    const tool = this.tools.get(name);
    if (!tool) return `Unknown tool: ${name}`;
    return tool.handler(params);
  }

  /**
   * List all available resources.
   */
  listResources(): Array<{ name: string; uri: string }> {
    return Array.from(this.resources.values()).map(({ name, uri }) => ({
      name,
      uri,
    }));
  }

  /**
   * List all available tools.
   */
  listTools(): Array<{ name: string; description: string }> {
    return Array.from(this.tools.values()).map(({ name, description }) => ({
      name,
      description,
    }));
  }
}

export const portfolioMcpServer = new PortfolioMcpServer();
