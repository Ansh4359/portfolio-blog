"use client";
import { DrawablyHighlight } from "drawably/react";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="section-label-wrapper">
        <DrawablyHighlight>
          <span className="section-label">about me</span>
        </DrawablyHighlight>
      </div>
      <p className="about-text">
        Product-focused Full Stack Developer with experience building scalable, high-performance web applications using React, Node.js, and modern backend technologies. Skilled in designing efficient REST APIs, optimizing application performance, and delivering user-centric solutions for real-world production environments.
      </p>
    </section>
  );
}
