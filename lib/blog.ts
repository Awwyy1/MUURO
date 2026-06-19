import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogCategory = "editions" | "materials" | "walls";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  publishedAt: string;
  author: string;
  hero: string;
  readingTime: number;
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function readPostFile(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? ""),
    excerpt: String(data.excerpt ?? ""),
    category: (data.category ?? "editions") as BlogCategory,
    publishedAt: String(data.publishedAt ?? ""),
    author: String(data.author ?? "MUURO"),
    hero: String(data.hero ?? ""),
    readingTime: calculateReadingTime(content),
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const slugs = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
  const posts = slugs
    .map(readPostFile)
    .filter((p): p is BlogPost => p !== null);
  return posts.sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );
}

export function getPost(slug: string): BlogPost | null {
  return readPostFile(slug);
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function formatPublishedAt(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
}

export function categoryLabel(category: BlogCategory): string {
  switch (category) {
    case "editions":
      return "Editions";
    case "materials":
      return "Materials";
    case "walls":
      return "Walls";
  }
}
