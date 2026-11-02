import { cn } from "../../lib/utils.js";

export function Avatar({ className, children, ...props }) {
  return (
    <span
      className={cn("relative flex shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    >
      {children}
    </span>
  );
}

export function AvatarImage({ src, alt, className, ...props }) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  );
}

export function AvatarFallback({ className, children, ...props }) {
  return (
    <span
      className={cn(
        "flex h-full w-full items-center justify-center bg-muted text-xs font-medium",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
