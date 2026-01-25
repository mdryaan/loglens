"use client";

import { useState, useCallback } from "react";

interface UseClipboardReturn {
  copy: (text: string) => Promise<void>;
  copiedId: string | null;
}

export function useClipboard(resetDelay = 2000): UseClipboardReturn {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedId(text);
        setTimeout(() => setCopiedId(null), resetDelay);
      } catch {
        // clipboard unavailable in insecure contexts
      }
    },
    [resetDelay],
  );

  return { copy, copiedId };
}
