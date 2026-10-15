import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.enum(["news", "insights", "press"]),
    summary: z.string(),
    author: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { news };