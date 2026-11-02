import { cn } from "../../lib/utils.js";

export function Empty({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl p-8 text-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function EmptyHeader({ className, children, ...props }) {
  return (
    <div className={cn("flex flex-col items-center gap-3", className)} {...props}>
      {children}
    </div>
  );
}

export function EmptyMedia({ className, variant, children, ...props }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        variant === "icon" && "size-12 rounded-2xl bg-muted text-muted-foreground [&>svg]:size-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function EmptyTitle({ className, children, ...props }) {
  return (
    <h3 className={cn("font-semibold", className)} {...props}>
      {children}
    </h3>
  );
}

export function EmptyDescription({ className, children, ...props }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}
