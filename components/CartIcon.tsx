export default function CartIcon({ count }: { count: number }) {
  return (
    <span className="relative inline-flex items-center justify-center" aria-hidden="true">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 8h12l-1 12H7L6 8z" />
        <path d="M9 8V5.5a3 3 0 116 0V8" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-2 -top-1.5 min-w-[16px] rounded-full bg-ink px-1 text-center text-[9px] font-semibold leading-[14px] text-paper">
          {count}
        </span>
      )}
    </span>
  );
}
