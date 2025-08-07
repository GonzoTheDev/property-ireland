import { InputHTMLAttributes } from "react";
import { clsx } from "clsx";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={clsx(
        "w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]",
        props.className,
      )}
    />
  );
}


