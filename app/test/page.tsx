"use client";
import { useState } from "react";
import { DrawablyButton } from "drawably/react";

export default function TestPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const cycleStatus = () => {
    if (status === "idle") setStatus("loading");
    else if (status === "loading") setStatus("success");
    else if (status === "success") setStatus("error");
    else setStatus("idle");
  };

  return (
    <div style={{ padding: 100 }}>
      <h1>Button Test</h1>
      <div style={{ minWidth: "150px", display: "inline-flex" }}>
        <DrawablyButton
          variant="solid"
          state={status}
          onClick={cycleStatus}
          disabled={status === "loading"}
        >
          {status === "loading"
            ? "Sending..."
            : status === "success"
            ? "Sent! ✓"
            : status === "error"
            ? "Try Again"
            : "Send Message"}
        </DrawablyButton>
      </div>
      <p>Current status: {status}</p>
    </div>
  );
}
