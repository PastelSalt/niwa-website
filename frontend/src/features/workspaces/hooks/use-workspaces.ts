import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { workspacesApi } from "../api/workspaces";
import type { CreateWorkspaceInput } from "../api/workspaces";
import type { Workspace } from "@/features/items/types";

const WORKSPACES_QUERY_KEY = "workspaces";

export function useWorkspaces() {
  return useQuery({
    queryKey: [WORKSPACES_QUERY_KEY],
    queryFn: () =>
      workspacesApi.list().then((res: { workspaces: Workspace[] }) =>
        res.workspaces
      ),
  });
}

export function useCreateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateWorkspaceInput) =>
      workspacesApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WORKSPACES_QUERY_KEY] });
    },
  });
}

export function useUpdateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      input,
    }: {
      workspaceId: string;
      input: { name: string };
    }) => workspacesApi.update(workspaceId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WORKSPACES_QUERY_KEY] });
    },
  });
}

export function useDeleteWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workspaceId: string) => workspacesApi.delete(workspaceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WORKSPACES_QUERY_KEY] });
    },
  });
}
