"use client";
import { useEffect, useState } from "react";
import { DrawablyHighlight } from "drawably/react";

const SECTIONS = [
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "education", label: "education" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "skills" },
  { id: "contact", label: "contact" },
];

export default function ScrollSpyNav() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      let currentId = "";
      // Loop through sections and check which one is near the top
      for (const sec of SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the section is above the middle of the screen
          if (rect.top <= window.innerHeight / 2) {
            currentId = sec.id;
          }
        }
      }
      
      // If we are at the very bottom of the page, force the last section to be active
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        currentId = "contact";
      }

      if (currentId && currentId !== activeId) {
        setActiveId(currentId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeId]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 60,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="scroll-spy">
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 20 }}>
        {SECTIONS.map((sec) => {
          const isActive = activeId === sec.id;
          return (
            <li key={sec.id}>
              <a 
                href={`#${sec.id}`}
                onClick={(e) => handleClick(e, sec.id)}
                style={{ 
                  textDecoration: "none", 
                  color: isActive ? "var(--ink)" : "var(--pencil)",
                  fontSize: "1.1rem",
                  fontFamily: '"Drawably Pen", cursive',
                  transition: "color 0.2s ease"
                }}
              >
                {isActive ? (
                  <DrawablyHighlight>
                    <span style={{ padding: "0 8px" }}>{sec.label}</span>
                  </DrawablyHighlight>
                ) : (
                  <span style={{ padding: "0 8px" }}>{sec.label}</span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
