"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBlogPost } from "../actions";

export default function WriteBlogPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setFeedback("");

    const formData = new FormData(e.currentTarget);
    const result = await createBlogPost(formData);

    if (result?.error) {
      setStatus("error");
      setFeedback(result.error);
      setTimeout(() => setStatus("idle"), 3000);
    } else if (result?.slug) {
      setStatus("success");
      setFeedback("Post published!");
      setTimeout(() => {
        router.push(`/blog/${result.slug}`);
      }, 1000);
    }
  }

  return (
    <div className="blog-container">
      <header className="blog-header">
        <Link href="/blog" className="blog-back-link">← back to blog</Link>
        <h1 className="blog-title" style={{ marginTop: 16 }}>write a post</h1>
      </header>

      <form className="blog-write-form" onSubmit={handleSubmit}>
        <div className="blog-field">
          <label className="blog-label" htmlFor="title">title</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="My awesome post"
            className="blog-input"
          />
        </div>

        <div className="blog-field">
          <label className="blog-label" htmlFor="excerpt">excerpt</label>
          <input
            id="excerpt"
            name="excerpt"
            type="text"
            placeholder="A short summary of the post..."
            className="blog-input"
          />
        </div>

        <div className="blog-field">
          <label className="blog-label" htmlFor="tags">tags <span style={{ color: "var(--pencil)" }}>(comma separated)</span></label>
          <input
            id="tags"
            name="tags"
            type="text"
            placeholder="react, nextjs, tutorial"
            className="blog-input"
          />
        </div>

        <div className="blog-field">
          <label className="blog-label" htmlFor="content">content <span style={{ color: "var(--pencil)" }}>(markdown supported)</span></label>
          <textarea
            id="content"
            name="content"
            required
            rows={20}
            placeholder={"# Hello World\n\nWrite your post in **markdown**..."}
            className="blog-textarea"
          />
        </div>

        <div className="blog-field">
          <label className="blog-label" htmlFor="password">admin password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter admin password"
            className="blog-input"
          />
        </div>

        <div className="blog-write-actions">
          <button type="submit" className="blog-submit-btn" disabled={status === "loading"}>
            {status === "loading"
              ? "Publishing..."
              : status === "success"
              ? "Published! ✓"
              : "Publish Post"}
          </button>

          {feedback && (
            <p className={`contact-feedback ${status === "error" ? "error" : "success"}`}>
              {feedback}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
