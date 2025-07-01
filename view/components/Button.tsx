
import React from "react";

export function PrimaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded bg-amber-400 text-white disabled:opacity-50 cursor-pointer ${
        props.className ?? ""
      }`}
    >
      {children}
    </button>
  );
}

export function TextButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`text-xs text-red-500 hover:underline bg-transparent px-0 py-0 rounded-none cursor-pointer ${
        props.className ?? ""
      }`}
    >
      {children}
    </button>
  );
}
