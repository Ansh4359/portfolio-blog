"use client";
import { DrawablyUnderline } from "drawably/react";

const links = [
  { href: "mailto:anshsingh4359@gmail.com", label: "✉ anshsingh4359@gmail.com" },
  { href: "https://github.com/ansh4359", label: "⌘ GitHub" },
  { href: "https://linkedin.com/in/ansh01/", label: "◈ LinkedIn" },
  { href: "https://anshkushwaha.tech", label: "☞ Website" },
  { href: "/blog", label: "✎ Blog" },
];

export default function Header() {
  return (
    <header className="header">
      <div className="name-wrapper">
        <h1 className="name">Ansh Singh Kushwaha</h1>
      </div>
      <p className="title">Product-focused Full Stack Developer</p>
      <nav className="contact-row">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit", padding: "0 8px" }}
          >
            <DrawablyUnderline>{link.label}</DrawablyUnderline>
          </a>
        ))}
      </nav>
    </header>
  );
}
