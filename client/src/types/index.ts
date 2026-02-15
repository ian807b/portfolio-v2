// ─── Project Types ───

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  category: ProjectCategory;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export type ProjectCategory = "all" | "fullstack" | "frontend" | "mobile";

// ─── Skill Types ───

export interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

// ─── Experience Types ───

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  location?: string;
  period: string;
  description: string[];
  technologies: string[];
}

// ─── Education Types ───

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  period: string;
  logo: string;
  coursework: string[];
  achievements?: string[];
}

// ─── Visitor Types ───

export interface VisitorStats {
  totalVisitors: number;
  todayVisitors: number;
}

// ─── MCP Chat Types ───

export interface McpMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface McpConversation {
  conversationId: string;
  messages: McpMessage[];
}

// ─── API Response Types ───

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
