import type { MetadataRoute } from "next";
import { EDITIONS } from "@/lib/editions";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://muuro.co";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/editions`, changeFrequency: "weekly", priority: 0.9 },
    ...EDITIONS.map((e) => ({
      url: `${base}/editions/${e.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { url: `${base}/manifesto`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/shipping`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/returns`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.3 },
  ];
}
