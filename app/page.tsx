"use client";

import Header from "./components/Header";
import About from "./components/About";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";
import ScrollSpyNav from "./components/ScrollSpyNav";
import { DrawablyDivider } from "drawably/react";

export default function Home() {
  return (
    <div>
      <ThemeToggle />
      <ScrollSpyNav />
    <div className="container" style={{ position: "relative" }}>
      
      <Header />

      <About />

      <div style={{ margin: "40px 0" }}>
        <DrawablyDivider />
      </div>

      <Experience />

      <div style={{ margin: "40px 0" }}>
        <DrawablyDivider />
      </div>
      
      <Education />

      <div style={{ margin: "40px 0" }}>
        <DrawablyDivider />
      </div>

      <Projects />

      <div style={{ margin: "40px 0" }}>
        <DrawablyDivider />
      </div>

      <Skills />

      <div style={{ margin: "40px 0" }}>
        <DrawablyDivider />
      </div>

      <Contact />

      <Footer />
    </div>
    </div>
  );
}
