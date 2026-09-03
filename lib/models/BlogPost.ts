import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlogPost extends Document {
  slug: string;
  title: string;
  date: Date;
  excerpt: string;
  tags: string[];
  content: string;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },
    excerpt: { type: String, default: "" },
    tags: { type: [String], default: [] },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

// Prevent model recompilation during hot reloads
export const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
