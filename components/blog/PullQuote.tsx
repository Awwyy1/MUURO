export default function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <figure className="my-12 border-y border-hairline py-10">
      <blockquote className="text-center text-[22px] font-medium leading-[1.4] text-ink md:text-[26px]">
        {children}
      </blockquote>
    </figure>
  );
}
