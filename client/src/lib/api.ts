import { API_BASE_URL } from "./constants";
import type { ApiResponse, VisitorStats } from "@/types";

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const data: ApiResponse<T> = await response.json();
  if (!data.success) {
    throw new Error(data.error || "Unknown API error");
  }

  return data.data;
}

// ─── Visitor Tracking API ───

export async function trackVisitor(path: string): Promise<VisitorStats> {
  return fetchApi<VisitorStats>("/api/visitors/track", {
    method: "POST",
    body: JSON.stringify({ path }),
  });
}

export async function getVisitorCount(): Promise<VisitorStats> {
  return fetchApi<VisitorStats>("/api/visitors/count");
}

// ─── MCP Chat API ───

export interface McpChatRequest {
  conversationId?: string;
  message: string;
}

export interface McpChatResponse {
  conversationId: string;
  reply: string;
}

export async function sendMcpMessage(
  request: McpChatRequest
): Promise<McpChatResponse> {
  return fetchApi<McpChatResponse>("/api/mcp/chat", {
    method: "POST",
    body: JSON.stringify(request),
  });
}
