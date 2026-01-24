"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseAutoScrollReturn {
  containerRef: React.RefObject<HTMLDivElement>;
  scrollToBottom: () => void;
}

export function useAutoScroll(
  enabled: boolean,
  deps: unknown[],
): UseAutoScrollReturn {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    if (!enabled) return;
    scrollToBottom();
  }, [enabled, scrollToBottom, ...deps]);

  return { containerRef, scrollToBottom };
}
