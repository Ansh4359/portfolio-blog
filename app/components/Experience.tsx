"use client";
import { DrawablyCard, DrawablyHighlight, DrawablyBadge } from "drawably/react";

interface Job {
  year: string;
  role: string;
  company: string;
  description: string;
}

const jobs: Job[] = [
  {
    year: "Nov 2025 – Present",
    role: "Technical Lead",
    company: "Signodes Department Club · NIET",
    description: "Led a team of 5 developers in the Signodes Web Developer group, coordinating development activities, and contributing to collaborative web development projects and technical initiatives."
  },
  {
    year: "Freelance",
    role: "Full Stack Developer",
    company: "Self-Employed",
    description: "Built and deployed responsive full-stack web applications using React, Next.js, Node.js. Developed custom portfolio websites and business web applications based on client requirements. Delivered 3+ client web applications with production deployment."
  }
];

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-label-wrapper">
        <DrawablyHighlight>
          <span className="section-label">experience</span>
        </DrawablyHighlight>
      </div>

      <div className="timeline">
        {jobs.map((job) => (
          <DrawablyCard key={job.year}>
            <div className="entry-card-inner">
              <div className="entry-top">
                <div className="entry-role">{job.role}</div>
                {/* <DrawablyBadge variant="outline"> */}
                  <span className="entry-year">{job.year}</span>
                {/* </DrawablyBadge> */}
              </div>
              <div className="entry-company">{job.company}</div>
              <div className="entry-desc">{job.description}</div>
            </div>
          </DrawablyCard>
        ))}
      </div>
    </section>
  );
}
