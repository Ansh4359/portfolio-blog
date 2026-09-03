"use client";
import { DrawablyCard, DrawablyHighlight, DrawablyBadge } from "drawably/react";

const education = [
  {
    year: "Sep 2023 – Present",
    degree: "B.Tech, Computer Science and Engineering",
    school: "Noida Institute of Engineering and Technology",
    description: "CGPA: 8.23/10.0"
  },
  {
    year: "April 2021 – April 2022",
    degree: "Senior Secondary School",
    school: "Govt Boys Sr Sec School",
    description: "Percentage: 74.6%"
  }
];

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="section-label-wrapper">
        <DrawablyHighlight>
          <span className="section-label">education</span>
        </DrawablyHighlight>
      </div>

      <div className="timeline">
        {education.map((edu) => (
          <DrawablyCard key={edu.year}>
            <div className="entry-card-inner">
              <div className="entry-top">
                <div className="entry-role">{edu.degree}</div>
                {/* <DrawablyBadge variant="outline"> */}
                  <span className="entry-year">{edu.year}</span>
                {/* </DrawablyBadge> */}
              </div>
              <div className="entry-company">{edu.school}</div>
              <div className="entry-desc">{edu.description}</div>
            </div>
          </DrawablyCard>
        ))}
      </div>
    </section>
  );
}
