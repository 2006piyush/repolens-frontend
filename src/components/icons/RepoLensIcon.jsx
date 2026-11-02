import { cn } from "../../lib/utils.js";

export function RepoLensIcon({ className, variant = "color", ...props }) {
  const mono = variant === "mono";
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <rect width="64" height="64" rx="15" fill={mono ? "currentColor" : "#287A62"} />
      <path
        d="M18 23.5A4.5 4.5 0 0 1 22.5 19h19a4.5 4.5 0 0 1 4.5 4.5v21a4.5 4.5 0 0 1-4.5 4.5h-19a4.5 4.5 0 0 1-4.5-4.5v-21Z"
        stroke={mono ? "var(--background)" : "#FFFFFF"}
        strokeWidth="2.75"
      />
      <path
        d="M25 19v30M25 27h11.5a4.5 4.5 0 0 1 4.5 4.5V34M36.5 34h4.5"
        stroke={mono ? "var(--background)" : "#FFFFFF"}
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="25" cy="27" r="3.25" fill={mono ? "var(--background)" : "#F5C76B"} />
      <circle cx="41" cy="34" r="3.25" fill={mono ? "var(--background)" : "#F5C76B"} />
      <path
        d="M32 41h10"
        stroke={mono ? "var(--background)" : "#FFFFFF"}
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <circle cx="32" cy="41" r="2.5" fill={mono ? "var(--background)" : "#F5C76B"} />
    </svg>
  );
}
