"use client";
import { useState, useRef } from "react";
import {
  DrawablyHighlight,
  DrawablyInput,
  DrawablyTextarea,
  DrawablyButton,
} from "drawably/react";
import { sendContactMessage } from "../actions";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setFeedback(null);

    const formData = new FormData(e.currentTarget);
    const result = await sendContactMessage(formData);

    if (result?.error) {
      setStatus("error");
      setFeedback({ type: "error", message: result.error });
      setTimeout(() => {
        setStatus("idle");
        setFeedback(null);
      }, 4000);
    } else {
      setStatus("success");
      setFeedback({ type: "success", message: "✓ Message sent! I'll get back to you soon." });
      formRef.current?.reset();
      setTimeout(() => {
        setStatus("idle");
        setFeedback(null);
      }, 5000);
    }
  }

  return (
    <section id="contact" className="section">
      <div className="section-label-wrapper">
        <DrawablyHighlight>
          <span className="section-label">drop a line</span>
        </DrawablyHighlight>
      </div>

      <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-row-fields">
          <DrawablyInput name="name" placeholder="your name" required />
          <DrawablyInput name="email" type="email" placeholder="your email" required />
        </div>
        <DrawablyTextarea name="message" rows={4} placeholder="what's up?" required />
        <div className="contact-actions">
          <DrawablyButton
            type="submit"
            variant="solid"
            state={status}
            disabled={status === "loading"}
            className="submit-btn"
          >
            <span style={{ display: "inline-block", minWidth: "120px", textAlign: "center" }}>
              {status === "loading"
                ? "Sending..."
                : status === "success"
                ? "Sent! ✓"
                : status === "error"
                ? "Try Again"
                : "Send Message"}
            </span>
          </DrawablyButton>

          {feedback && (
            <div className={`contact-feedback ${feedback.type}`} style={{ marginTop: 8 }}>
              {feedback.message}
            </div>
          )}
        </div>
      </form>
    </section>
  );
}
