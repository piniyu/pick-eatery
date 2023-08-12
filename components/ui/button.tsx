"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonTheme = "primary" | "secontary";

export default function Button({
  theme,
  children,
  ...props
}: {
  theme?: ButtonTheme;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  if (theme === "primary") {
    return (
      <button
        {...props}
        className={`btn-primary ${props.className ? props.className : ""}`}
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        {children}
      </button>
    );
  } else if (theme === "secontary") {
    return (
      <button
        {...props}
        className={`btn-secondary ${props.className ? props.className : ""}`}
        type="button"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        {...props}
        className={`${props.className ? props.className : ""}`}
        type="button"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        {children}
      </button>
    );
  }
}
