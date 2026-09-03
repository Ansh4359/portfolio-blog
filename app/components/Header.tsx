"use client";
import Link from "next/link";
import { DrawablyUnderline } from "drawably/react";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "text-bottom", marginRight: "6px" }}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "text-bottom", marginRight: "6px" }}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const links = [
  { href: "mailto:anshsingh4359@gmail.com", label: "anshsingh4359@gmail.com", prefix: "✉ " },
  { href: "https://github.com/ansh4359", label: "GitHub", icon: <GithubIcon /> },
  { href: "https://linkedin.com/in/ansh01/", label: "LinkedIn", icon: <LinkedinIcon /> },
  { href: "https://anshkushwaha.tech", label: "Website", prefix: "☞ " },
  { href: "/blog", label: "Blog", prefix: "✎ " },
];

export default function Header() {
  return (
    <header className="header">
      <div className="name-wrapper">
        <h1 className="name">Ansh Singh Kushwaha</h1>
      </div>
      <p className="title">Product-focused Full Stack Developer</p>
      <nav className="contact-row">
        {links.map((link) => {
          const isExternal = link.href.startsWith("http");
          return (
            <Link
              key={link.label}
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              style={{ textDecoration: "none", color: "inherit", padding: "0 8px", display: "inline-flex", alignItems: "center" }}
            >
              <DrawablyUnderline>
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                  {link.icon ? link.icon : link.prefix}
                  {link.label}
                </span>
              </DrawablyUnderline>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
