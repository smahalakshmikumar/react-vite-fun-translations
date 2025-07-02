import React from "react";
import clsx from "clsx";

export function PrimaryButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx(
        "px-4 py-2 rounded bg-amber-400 text-white disabled:opacity-50 cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TextButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={clsx(className)}>
      {children}
    </button>
  );
}
