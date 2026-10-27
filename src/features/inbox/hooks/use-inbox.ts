import { inboxApi } from "../api/inbox";
import type { Item, UpdateItemInput } from "../../items/types";
import { normalizeError } from "@/lib/errors";

export const INBOX_QUERY_KEY = "inbox";

export function useInbox() {
  return {
    queryKey: [INBOX_QUERY_KEY],
    queryFn: () => inboxApi.list().then((res: { items: Item[] }) => res.items),
  };
}

export function useCreateInboxItem() {
  return {
    mutationFn: (input: { title: string }) =>
      inboxApi.create({ workspaceId: "workspace_123", title: input.title }),
    onError: (error: unknown) => {
      throw normalizeError(error);
    },
  };
}

export function useUpdateInboxItem() {
  return {
    mutationFn: ({
      itemId,
      input,
    }: {
      itemId: string;
      input: UpdateItemInput;
    }) => inboxApi.update(itemId, input),
    onError: (error: unknown) => {
      throw normalizeError(error);
    },
  };
}

export function useDeleteInboxItem() {
  return {
    mutationFn: (itemId: string) => inboxApi.delete(itemId),
    onError: (error: unknown) => {
      throw normalizeError(error);
    },
  };
}

export function useConvertInboxItem() {
  return {
    mutationFn: ({
      itemId,
      type,
    }: {
      itemId: string;
      type: Item["type"];
    }) => inboxApi.convert(itemId, type),
    onError: (error: unknown) => {
      throw normalizeError(error);
    },
  };
}

export function useMoveInboxToHierarchy() {
  return {
    mutationFn: ({
      itemId,
      parentId,
    }: {
      itemId: string;
      parentId: string | null;
    }) => inboxApi.moveToHierarchy(itemId, parentId),
    onError: (error: unknown) => {
      throw normalizeError(error);
    },
  };
}
