import { SelectHTMLAttributes } from "react";
import { clsx } from "clsx";

export default function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={clsx(
        "w-full h-11 px-3 rounded-md bg-background/60 border border-foreground/10 text-foreground focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-shadow",
        props.className,
      )}
    />
  );
}


