/**
 * MCP Tool Definitions
 *
 * These are the JSON Schema definitions for the MCP tools, following the
 * Model Context Protocol specification. They describe the available tools
 * that MCP-compatible clients can invoke.
 */

export const mcpToolDefinitions = [
  {
    name: "get_candidate_summary",
    description:
      "Get a high-level summary of Ian Hwang as a software engineering candidate, including background, strengths, and career goals.",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
  },
  {
    name: "get_project_details",
    description:
      "Get detailed information about Ian's projects, including tech stacks, descriptions, and live demos.",
    inputSchema: {
      type: "object" as const,
      properties: {
        projectName: {
          type: "string",
          description:
            "Optional: name of a specific project to get details for (e.g., 'Shoppy', 'YouTube Clone')",
        },
      },
    },
  },
  {
    name: "get_skills_by_category",
    description:
      "Get Ian's technical skills, optionally filtered by category (frontend, backend, mobile, languages, databases, tools).",
    inputSchema: {
      type: "object" as const,
      properties: {
        category: {
          type: "string",
          description:
            "Optional: skill category to filter by (e.g., 'frontend', 'backend', 'languages')",
        },
      },
    },
  },
  {
    name: "get_education_details",
    description:
      "Get Ian's education background, including university, degree, and relevant coursework.",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
  },
  {
    name: "get_contact_info",
    description:
      "Get Ian's contact information, availability, and preferred communication channels.",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
  },
  {
    name: "check_skill_match",
    description:
      "Check whether Ian has experience with specific technologies. Useful for job requirement matching.",
    inputSchema: {
      type: "object" as const,
      properties: {
        technologies: {
          type: "array",
          items: { type: "string" },
          description:
            "List of technologies to check (e.g., ['React', 'PostgreSQL', 'Kubernetes'])",
        },
      },
      required: ["technologies"],
    },
  },
] as const;
