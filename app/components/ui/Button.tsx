import React, { ButtonHTMLAttributes, isValidElement, cloneElement } from "react";
import { clsx } from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
  asChild?: boolean;
};

export default function Button({ className, variant = "primary", asChild, children, ...props }: Props) {
  const classes = clsx(
    "inline-flex items-center justify-center rounded-md h-10 px-4 text-sm font-medium transition glow",
    variant === "primary" && "bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white",
    variant === "ghost" && "bg-foreground/5 hover:bg-foreground/10 text-foreground",
    variant === "outline" && "border border-foreground/20 hover:border-foreground/40 text-foreground bg-background/60",
    className,
  );

  if (asChild && isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return cloneElement(child, {
      className: clsx(child.props.className, classes),
    });
  }

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}


