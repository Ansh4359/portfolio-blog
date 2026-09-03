import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://anshkushwaha.tech";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, learnings & things I build — by Ansh Singh Kushwaha",
  openGraph: {
    title: "Blog — Ansh Singh Kushwaha",
    description: "Thoughts, learnings & things I build",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Blog — Ansh Singh Kushwaha",
    description: "Thoughts, learnings & things I build",
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1 className="blog-title">notebook</h1>
        <p className="blog-subtitle">thoughts, learnings & things i build</p>
        <div className="blog-nav-links">
          <Link href="/" className="blog-back-link">← back to portfolio</Link>
          <Link href="/blog/write" className="blog-write-link">+ write a post</Link>
        </div>
      </header>

      {posts.length === 0 ? (
        <div className="blog-empty">
          <p style={{ color: "var(--pencil)", fontSize: "1.1rem" }}>
            no posts yet — go write your first one!
          </p>
        </div>
      ) : (
        <div className="blog-list">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-post-card">
              <div className="blog-post-card-inner">
                <div className="blog-post-meta">
                  <span className="blog-post-date">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  {post.tags.length > 0 && (
                    <div className="blog-post-tags">
                      {post.tags.map((tag) => (
                        <span key={tag} className="blog-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <h2 className="blog-post-title">{post.title}</h2>
                {post.excerpt && <p className="blog-post-excerpt">{post.excerpt}</p>}
                <span className="blog-read-more">read more →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
