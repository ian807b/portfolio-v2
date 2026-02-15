import { useState, useEffect } from "react";

/**
 * Tracks which section is currently in view for active nav highlighting.
 * @param sectionIds - Array of section element IDs to observe
 * @param offset - Pixel offset from top to trigger active state
 */
export function useScrollSpy(sectionIds: string[], offset = 80): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${offset}px 0px -50% 0px`,
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds, offset]);

  return activeSection;
}
