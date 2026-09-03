"use client";
import { DrawablyCard, DrawablyHighlight, DrawablyButton } from "drawably/react";

interface Project {
  name: string;
  url: string;
  description: string;
}

const projects: Project[] = [
  {
    name: "MyFolio — AI Resume Builder",
    url: "https://github.com/ansh4359",
    description: "Built a full-stack SaaS platform with React, Express, and MongoDB enabling developers to deploy professional portfolios in under 5 minutes. Implemented AI-powered resume parsing to auto-extract structured data from PDF/DOCX files. Features a RESTful API with JWT auth and one-click Vercel deployment."
  },
  {
    name: "Real-Time AI Messaging",
    url: "https://github.com/ansh4359",
    description: "Built a full-stack real-time messaging application for Android and Web platforms. Implemented live chat, online presence detection, typing indicators, and instant message delivery using WebSockets. Integrated AI-powered message suggestions and conversation summarization."
  }
];

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-label-wrapper">
        <DrawablyHighlight>
          <span className="section-label">projects</span>
        </DrawablyHighlight>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <DrawablyCard key={project.name}>
            <div className="project-card-inner">
              <div className="project-header">
                <div className="project-name-text">{project.name}</div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <DrawablyButton variant="scribble" tone="neutral">
                    view →
                  </DrawablyButton>
                </a>
              </div>
              <div className="project-desc">{project.description}</div>
            </div>
          </DrawablyCard>
        ))}
      </div>
    </section>
  );
}
