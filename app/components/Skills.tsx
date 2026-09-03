"use client";
import { DrawablyHighlight, DrawablyBadge } from "drawably/react";

const skills = [
  "C++",
  "JavaScript",
  "TypeScript",
  "SQL",
  "React",
  "Express",
  "Next.js",
  "MongoDB",
  "MySQL",
  "AWS (EC2, S3, Lambda)",
  "Docker",
  "Git & GitHub",
  "OpenCode",
  "Microservices",
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section-label-wrapper">
        <DrawablyHighlight>
          <span className="section-label">skills</span>
        </DrawablyHighlight>
      </div>
      <div className="skills-grid">
        {skills.map((skill) => (
          <DrawablyBadge key={skill} variant="outline">
            <span style={{ padding: "4px 8px", display: "inline-block" }}>
              {skill}
            </span>
          </DrawablyBadge>
        ))}
      </div>
    </section>
  );
}
