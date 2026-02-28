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
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  const scrollToBottom = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    if (!enabledRef.current) return;
    scrollToBottom();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollToBottom, ...deps]);

  return { containerRef, scrollToBottom };
}
