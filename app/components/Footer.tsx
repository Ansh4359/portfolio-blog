"use client";
import { DrawablyDivider } from "drawably/react";

export default function Footer() {
  return (
    <footer>
      <DrawablyDivider />
      <div className="footer-inner">
        <span>last updated sept. 2026</span>
        <span className="footer-star">open to opportunities ✦</span>
      </div>
    </footer>
  );
}
