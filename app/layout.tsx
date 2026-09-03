import type { Metadata } from "next";
import "drawably/style.css";
import "drawably/font.css";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://anshkushwaha.tech";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ansh Singh Kushwaha — Portfolio",
    template: "%s | Ansh Singh Kushwaha",
  },
  description: "Product-focused Full Stack Developer. Building real-time apps, AI-powered tools, and clean user experiences.",
  keywords: ["Ansh Singh Kushwaha", "full stack developer", "portfolio", "react", "nextjs", "web developer", "blog"],
  authors: [{ name: "Ansh Singh Kushwaha", url: SITE_URL }],
  creator: "Ansh Singh Kushwaha",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Ansh Singh Kushwaha",
    title: "Ansh Singh Kushwaha — Portfolio",
    description: "Product-focused Full Stack Developer. Building real-time apps, AI-powered tools, and clean user experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ansh Singh Kushwaha — Portfolio",
    description: "Product-focused Full Stack Developer",
    creator: "@ansh4359",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import ThemeToggle from "./components/ThemeToggle";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className="min-h-screen flex items-start justify-center px-5 py-20 font-sans antialiased">
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
