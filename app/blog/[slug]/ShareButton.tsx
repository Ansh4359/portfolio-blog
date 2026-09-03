"use client";

import { useState } from "react";

export default function ShareButton({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined"
    ? `${window.location.origin}/blog/${slug}`
    : `/blog/${slug}`;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled
      }
    }
  };

  return (
    <div className="share-section">
      <span className="share-label">share this post</span>
      <div className="share-buttons">
        <button onClick={handleCopy} className="share-btn" title="Copy link">
          {copied ? "✓ copied!" : "🔗 copy link"}
        </button>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn"
          title="Share on X"
        >
          𝕏 post
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn"
          title="Share on LinkedIn"
        >
          ◈ linkedin
        </a>
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn"
          title="Share on WhatsApp"
        >
          ✆ whatsapp
        </a>
        {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
          <button onClick={handleNativeShare} className="share-btn" title="More options">
            ↗ more
          </button>
        )}
      </div>
    </div>
  );
}
