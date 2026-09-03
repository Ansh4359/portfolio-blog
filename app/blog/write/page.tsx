"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBlogPost, uploadImageAction } from "../actions";

export default function WriteBlogPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const passwordInput = document.getElementById("password") as HTMLInputElement;
    if (!passwordInput?.value) {
      alert("Please enter the admin password before uploading images.");
      e.target.value = "";
      return;
    }

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", passwordInput.value);

    const result = await uploadImageAction(formData);

    if (result.error) {
      alert(result.error);
    } else if (result.url) {
      const textarea = contentRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const imgMarkdown = `\n![Image](${result.url})\n`;
        textarea.value = text.substring(0, start) + imgMarkdown + text.substring(end);
        
        // Trigger a change event so React hook forms (if any) catch it
        const event = new Event("input", { bubbles: true });
        textarea.dispatchEvent(event);
      }
    }
    
    e.target.value = ""; // Reset file input
    setUploadingImage(false);
  }

  function handleInsertUrl() {
    const url = prompt("Enter the image URL:");
    if (!url) return;
    
    const textarea = contentRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const imgMarkdown = `\n![Image](${url})\n`;
      textarea.value = text.substring(0, start) + imgMarkdown + text.substring(end);
      
      const event = new Event("input", { bubbles: true });
      textarea.dispatchEvent(event);
      textarea.focus();
    }
  }

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
          <label className="blog-label" htmlFor="content">
            content <span style={{ color: "var(--pencil)" }}>(markdown supported)</span>
          </label>
          <div style={{ display: "flex", gap: "10px", marginBottom: "8px", alignItems: "center" }}>
            <label className="share-btn" style={{ fontSize: "0.85rem", padding: "4px 10px", cursor: "pointer" }}>
              {uploadingImage ? "Uploading..." : "🖼 Upload Image"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                style={{ display: "none" }}
              />
            </label>
            <button 
              type="button" 
              onClick={handleInsertUrl}
              className="share-btn" 
              style={{ fontSize: "0.85rem", padding: "4px 10px" }}
            >
              🔗 Insert URL
            </button>
            <span style={{ fontSize: "0.8rem", color: "var(--pencil)", marginLeft: "auto" }}>
              *Enter admin password below for uploads
            </span>
          </div>
          <textarea
            id="content"
            name="content"
            ref={contentRef}
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
