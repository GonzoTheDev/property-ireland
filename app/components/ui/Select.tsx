import { SelectHTMLAttributes } from "react";
import { clsx } from "clsx";

export default function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={clsx(
        "w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]",
        props.className,
      )}
    />
  );
}


