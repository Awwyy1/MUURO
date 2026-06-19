import { formatPublishedAt, categoryLabel, type BlogPost } from "@/lib/blog";

export default function ArticleHero({ post }: { post: BlogPost }) {
  return (
    <header className="mx-auto max-w-[760px] px-6 pt-10 md:pt-14">
      <div className="label">
        {categoryLabel(post.category)} · {post.readingTime} min read
      </div>
      <h1 className="mt-6 text-[34px] font-medium leading-[1.1] tracking-[-0.01em] md:text-[48px]">
        {post.title}
      </h1>
      <p className="mt-6 max-w-[640px] text-[18px] leading-[1.55] text-[#333] md:text-[20px]">
        {post.excerpt}
      </p>
      <div className="label mt-8">
        {formatPublishedAt(post.publishedAt)} · {post.author}
      </div>
    </header>
  );
}
