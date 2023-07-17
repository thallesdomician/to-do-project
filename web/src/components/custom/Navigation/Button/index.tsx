import Link, { LinkProps } from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
interface ILinkButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactNode;
}
export default function Button({
  children,
  ...props
}: ILinkButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        `flex
        focus:outline-none
        outline-transparent
        group
        items-center
        justify-center
        relative
        text-center
        py-3
        flex-1
        md:flex-none
        after:absolute
        after:bg-black
        after:h-[1px]
        after:rounded-[4px]
        after:bottom-0
        after:left-0
        after:right-0
        after:md:hidden `,
        props.className
      )}
    >
      {children}
    </button>
  );
}
