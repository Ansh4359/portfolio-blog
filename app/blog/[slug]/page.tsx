import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import BlogContent from "./BlogContent";
import ShareButton from "./ShareButton";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://anshkushwaha.tech";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt || `${post.content.slice(0, 160)}...`,
    keywords: post.tags,
    authors: [{ name: "Ansh Singh Kushwaha" }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: "Ansh Singh Kushwaha",
      publishedTime: post.date,
      authors: ["Ansh Singh Kushwaha"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@ansh4359",
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // JSON-LD structured data for rich Google results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Ansh Singh Kushwaha",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Ansh Singh Kushwaha",
      url: SITE_URL,
    },
    url: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  return (
    <div className="blog-container">
      {/* JSON-LD for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="blog-post-header">
        <Link href="/blog" className="blog-back-link">← all posts</Link>
        <div className="blog-post-meta" style={{ marginTop: 24 }}>
          <span className="blog-post-date">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
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
        <h1 className="blog-title" style={{ marginTop: 12 }}>{post.title}</h1>
      </header>

      <article className="blog-article">
        <BlogContent content={post.content} />
      </article>

      <footer className="blog-post-footer">
        <ShareButton title={post.title} slug={post.slug} />
        <Link href="/blog" className="blog-back-link" style={{ marginTop: 24, display: "inline-block" }}>← back to all posts</Link>
      </footer>
    </div>
  );
}
