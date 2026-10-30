import { apiClient } from "@/lib/api-client";
import type { Workspace } from "@/features/items/types";

const WORKSPACES_BASE = "/workspaces";

export interface WorkspacesResponse {
  workspaces: Workspace[];
}

export interface WorkspaceResponse {
  workspace: Workspace;
}

export interface CreateWorkspaceInput {
  name: string;
}

export const workspacesApi = {
  list: () =>
    apiClient.get<WorkspacesResponse>(`${WORKSPACES_BASE}`),

  create: (input: CreateWorkspaceInput) =>
    apiClient.post<WorkspaceResponse>(`${WORKSPACES_BASE}`, input),

  get: (workspaceId: string) =>
    apiClient.get<WorkspaceResponse>(`${WORKSPACES_BASE}/${workspaceId}`),

  update: (workspaceId: string, input: { name: string }) =>
    apiClient.patch<WorkspaceResponse>(
      `${WORKSPACES_BASE}/${workspaceId}`,
      input
    ),

  delete: (workspaceId: string) =>
    apiClient.delete<{ ok: boolean }>(`${WORKSPACES_BASE}/${workspaceId}`),
};
