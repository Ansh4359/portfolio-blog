import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://anshkushwaha.tech";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/blog/write", "/test"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
