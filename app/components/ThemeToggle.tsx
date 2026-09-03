"use client";
import { useEffect, useState } from "react";
import { DrawablyToggle } from "drawably/react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    // Default to dark mode if nothing is saved
    const initialTheme = saved || "dark";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <div style={{ position: "fixed", top: 20, right: 20, display: "flex", alignItems: "center", gap: 12, zIndex: 100 }}>
      <span style={{ fontSize: "0.85rem", color: "var(--pencil)" }}>
        {theme === "light" ? "☾ dark mode" : "☀ light mode"}
      </span>
      <DrawablyToggle checked={theme === "dark"} onChange={toggleTheme} />
    </div>
  );
}
