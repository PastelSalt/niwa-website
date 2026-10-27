"use client";

import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface KeyboardShortcutsProps {
  onOpenSearch?: () => void;
  onCreateItem?: () => void;
  onClosePanel?: () => void;
}

export function KeyboardShortcuts({
  onOpenSearch,
  onCreateItem,
  onClosePanel,
}: KeyboardShortcutsProps) {
  const navigate = useNavigate();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't trigger shortcuts when user is typing in an input/textarea/select
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        if (e.key === "Escape") {
          onClosePanel?.();
        }
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const ctrlOrMeta = isMac ? e.metaKey : e.ctrlKey;

      // Ctrl/Cmd + K: Open search
      if (ctrlOrMeta && e.key === "k") {
        e.preventDefault();
        onOpenSearch?.();
        navigate("/app/search");
        return;
      }

      // Ctrl/Cmd + N: Create a new item
      if (ctrlOrMeta && e.key === "n") {
        e.preventDefault();
        onCreateItem?.();
        return;
      }

      // Escape: Close current dialog or panel
      if (e.key === "Escape") {
        onClosePanel?.();
        return;
      }
    },
    [onOpenSearch, onCreateItem, onClosePanel, navigate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return null;
}
