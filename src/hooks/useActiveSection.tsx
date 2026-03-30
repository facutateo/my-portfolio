import { useEffect, useState } from "react";

export default function useActiveSection(
  sectionIds: readonly string[],
  beforeFirstSectionId = "home"
) {
  const [activeSection, setActiveSection] = useState(() => beforeFirstSectionId);
  const sectionIdsKey = sectionIds.join("|");

  useEffect(() => {
    const ids = sectionIdsKey.length > 0 ? sectionIdsKey.split("|") : [];
    const idsInOrder = [beforeFirstSectionId, ...ids];

    const getOrderedSections = () =>
      idsInOrder
        .map((id) => {
          const element = document.getElementById(id);
          if (!element) return null;
          const top = element.getBoundingClientRect().top + window.scrollY;
          return { id, top };
        })
        .filter((section): section is { id: string; top: number } => section !== null);

    const getActiveSection = () => {
      const sections = getOrderedSections();
      if (sections.length === 0) return beforeFirstSectionId;
      if (sections.length === 1) return sections[0].id;

      const nav = document.getElementById("navbar");
      const navHeight = nav?.getBoundingClientRect().height ?? 0;
      const markerY = window.scrollY + navHeight + 12;

      let current = sections[0].id;

      for (let i = 0; i < sections.length - 1; i += 1) {
        const currentSection = sections[i];
        const nextSection = sections[i + 1];
        const switchLine = (currentSection.top + nextSection.top) / 2;

        if (markerY >= switchLine) {
          current = nextSection.id;
        } else {
          break;
        }
      }

      return current;
    };

    let rafId = 0;
    const updateActiveSection = () => {
      const nextSection = getActiveSection();
      setActiveSection((prev) => (prev === nextSection ? prev : nextSection));
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateActiveSection();
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sectionIdsKey, beforeFirstSectionId]);

  return activeSection;
}
