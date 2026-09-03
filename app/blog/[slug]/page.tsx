import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import BlogContent from "./BlogContent";
import ShareButton from "./ShareButton";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://anshkushwaha.tech";

// This tells Next.js to pre-build all these blog routes at build time
// so that clicking on a blog post is instantaneous!
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  
  // Extract the first image from markdown content to use as link preview thumbnail
  const imgMatch = post.content.match(/!\[.*?\]\((.*?)\)/);
  const imageUrl = imgMatch ? imgMatch[1] : null;

  return {
    title: post.title,
    description: post.excerpt || `${post.content.slice(0, 160)}...`,
    keywords: post.tags,
    authors: [{ name: "Ansh Singh Kushwaha" }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt || `${post.content.slice(0, 160)}...`,
      url: postUrl,
      siteName: "Ansh Singh Kushwaha",
      publishedTime: post.date,
      authors: ["Ansh Singh Kushwaha"],
      tags: post.tags,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || `${post.content.slice(0, 160)}...`,
      creator: "@ansh4359",
      images: imageUrl ? [imageUrl] : [],
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

  // Get suggested posts
  const allPosts = await getAllPosts();
  const suggestions = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 2); // Show top 2 most recent other posts

  // Extract the first image from markdown content, if any
  const imgMatch = post.content.match(/!\[.*?\]\((.*?)\)/);
  const imageUrl = imgMatch ? imgMatch[1] : null;

  // JSON-LD structured data for rich Google results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    ...(imageUrl && { image: [imageUrl] }),
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
        
        {suggestions.length > 0 && (
          <div style={{ marginTop: 60 }}>
            <h3 className="blog-title" style={{ fontSize: "1.8rem", marginBottom: 20 }}>read more</h3>
            <div className="blog-list" style={{ marginTop: 0 }}>
              {suggestions.map((sPost) => (
                <Link key={sPost.slug} href={`/blog/${sPost.slug}`} className="blog-post-card">
                  <div className="blog-post-card-inner">
                    <div className="blog-post-meta">
                      <span className="blog-post-date">
                        {new Date(sPost.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="blog-post-title" style={{ fontSize: "1.4rem" }}>{sPost.title}</h2>
                    {sPost.excerpt && <p className="blog-post-excerpt" style={{ fontSize: "0.95rem" }}>{sPost.excerpt}</p>}
                    <span className="blog-read-more" style={{ fontSize: "0.9rem" }}>read post →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        <Link href="/blog" className="blog-back-link" style={{ marginTop: 40, display: "inline-block" }}>← back to all posts</Link>
      </footer>
    </div>
  );
}
