import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
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
  const pathName = usePathname()
  const activeClass = props.href === pathName && 'text-gray-900'

  return (
    <Link
      {...props}
      className={twMerge(
        `flex focus:outline-none outline-transparent group items-center justify-center relative text-center py-3 flex-1 md:flex-none`,
        props.className
      )}
    >
      <span className={twMerge("flex-col md:flex-row text-xs md:text-sm duration-75 ease-out font-semibold md:group-hover:bg-gray-100 md:px-4 rounded-sm transition-background-color group-focus-visible:ring-2 group-focus-visible:ring-black -tracking-[0.35px] xl:tracking-[0px] flex items-center h-auto md:h-full text-gray-500",activeClass)}>
        {children}
      </span>
    </Link>
  );
}
