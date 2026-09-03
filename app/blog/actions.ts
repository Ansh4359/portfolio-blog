"use server";

import { createPost, deletePost } from "@/lib/blog";
import { revalidatePath } from "next/cache";

export async function createBlogPost(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim();
  const tagsRaw = (formData.get("tags") as string)?.trim();
  const password = (formData.get("password") as string)?.trim();

  const adminPassword = process.env.BLOG_ADMIN_PASSWORD || "ansh2026";
  if (password !== adminPassword) {
    return { error: "Invalid password." };
  }

  if (!title || !content) {
    return { error: "Title and content are required." };
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];

  try {
    const post = await createPost(slug, title, excerpt || "", tags, content);
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    return { success: true, slug: post.slug };
  } catch (error: any) {
    if (error.code === 11000) {
      return { error: "A post with this title already exists." };
    }
    return { error: error.message || "Failed to create post." };
  }
}

export async function deleteBlogPost(formData: FormData) {
  const slug = (formData.get("slug") as string)?.trim();
  const password = (formData.get("password") as string)?.trim();

  const adminPassword = process.env.BLOG_ADMIN_PASSWORD || "ansh2026";
  if (password !== adminPassword) {
    return { error: "Invalid password." };
  }

  if (!slug) {
    return { error: "Slug is required." };
  }

  try {
    await deletePost(slug);
    revalidatePath("/blog");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete post." };
  }
}
