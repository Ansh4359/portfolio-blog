import { connectDB } from "./mongodb";
import { BlogPost, IBlogPost } from "./models/BlogPost";

export interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
}

function toPlain(doc: IBlogPost): BlogPostData {
  return {
    slug: doc.slug,
    title: doc.title,
    date: doc.date.toISOString(),
    excerpt: doc.excerpt,
    tags: doc.tags,
    content: doc.content,
  };
}

export async function getAllPosts(): Promise<BlogPostData[]> {
  await connectDB();
  const posts = await BlogPost.find().sort({ date: -1 }).lean();
  return posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date.toISOString(),
    excerpt: p.excerpt,
    tags: p.tags,
    content: p.content,
  }));
}

export async function getPostBySlug(slug: string): Promise<BlogPostData | null> {
  await connectDB();
  const doc = await BlogPost.findOne({ slug }).lean();
  if (!doc) return null;
  return {
    slug: doc.slug,
    title: doc.title,
    date: doc.date.toISOString(),
    excerpt: doc.excerpt,
    tags: doc.tags,
    content: doc.content,
  };
}

export async function createPost(
  slug: string,
  title: string,
  excerpt: string,
  tags: string[],
  content: string
): Promise<BlogPostData> {
  await connectDB();
  const doc = await BlogPost.create({ slug, title, excerpt, tags, content, date: new Date() });
  return toPlain(doc);
}

export async function deletePost(slug: string): Promise<boolean> {
  await connectDB();
  const result = await BlogPost.deleteOne({ slug });
  return result.deletedCount > 0;
}
