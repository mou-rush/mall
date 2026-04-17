interface ArrowIconProps {
  size?: number;
  className?: string;
}

/** Inline right-pointing arrow used across CTA buttons and card links. */
export default function ArrowIcon({
  size = 16,
  className,
}: Readonly<ArrowIconProps>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
