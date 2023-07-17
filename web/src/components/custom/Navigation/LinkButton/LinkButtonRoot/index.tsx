import Link, { LinkProps } from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
interface ILinkButtonProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}
export default function LinkButtonRoot({
  children,
  ...props
}: ILinkButtonProps) {
  return (
    <Link
      {...props}
      className={twMerge(
        `inline-block flex focus:outline-none outline-transparent group items-center justify-center relative text-center py-3 flex-1 md:flex-none after:absoluteafter:bg-black  after:h-[1px]  after:rounded-[4px]  after:bottom-0  after:left-0  after:right-0  after:md:hidden`,
        props.className
      )}
    >
      <span className="flex-col md:flex-row text-xs md:text-sm duration-75 ease-out font-semibold md:group-hover:bg-slate-100 md:px-2 rounded-sm transition-background-color group-focus-visible:ring-2 group-focus-visible:ring-black -tracking-[0.35px] xl:tracking-[0px] flex items-center h-auto md:h-full text-concrete">
        {children}
      </span>
    </Link>
  );
}
