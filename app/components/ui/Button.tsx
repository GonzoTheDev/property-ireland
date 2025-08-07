import { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" };

export default function Button({ className, variant = "primary", ...props }: Props) {
  return (
    <button
      {...props}
      className={clsx(
        "inline-flex items-center justify-center rounded-md h-10 px-4 text-sm font-medium transition glow",
        variant === "primary" && "bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white",
        variant === "ghost" && "bg-white/10 hover:bg-white/20 text-white",
        className,
      )}
    />
  );
}


