import { useCallback, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollRevealRef({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
}: UseScrollRevealOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const setRef = useCallback(
    (element: HTMLElement | null) => {
      if (!element || (triggerOnce && hasTriggered)) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce) {
              setHasTriggered(true);
              observer.disconnect();
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        },
        { threshold, rootMargin }
      );

      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    },
    [threshold, rootMargin, triggerOnce, hasTriggered]
  );

  return { ref: setRef, isVisible, hasTriggered };
}
