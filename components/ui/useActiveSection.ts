"use client";

import { useEffect, useState } from "react";

/** id of the landing page section a link points to ("#about" → "about") */
export const sectionId = (url: string) => url.replace(/^#/, "");

/** Keeps track of the section in the middle of the screen, so its link is shown as the current one */
export const useActiveSection = (urls: string[]) => {
  const [ids] = useState(() => urls.map(sectionId));
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
};
