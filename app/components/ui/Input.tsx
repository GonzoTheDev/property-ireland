import { InputHTMLAttributes } from "react";
import { clsx } from "clsx";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={clsx(
        "w-full h-11 px-3 rounded-md bg-background/60 border border-foreground/10 text-foreground placeholder:text-[var(--muted)] focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-shadow",
        props.className,
      )}
    />
  );
}


