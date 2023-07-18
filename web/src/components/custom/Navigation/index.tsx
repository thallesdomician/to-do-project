"use client";
import { LinkButton } from "@/components/custom/Navigation/LinkButton";
import { useAuth } from "@/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaRegUser, FaStaylinked } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { BiNetworkChart, BiUser, BiLineChart } from "react-icons/bi";

interface IMenuLinksProps {
  href: string;
  icon: React.ElementType;
  text: string;
}

const menuLinks: IMenuLinksProps[] = [
  { href: "/admin/profile", icon: BiUser, text: "Perfil" },
  { href: "/admin/social-network", icon: BiNetworkChart, text: "Redes Sociais" },
  { href: "/admin/insights", icon: BiLineChart, text: "Insights" },
];

export default function Navigation() {
  const router = useRouter();

  const { removeAuth } = useAuth();

  const redirectLogout = (e: React.SyntheticEvent) => {
    e.preventDefault();
    removeAuth();
    router.push("/login");
  };
  return (
    <div className="sticky top-0 md:top-2 z-20 bg-white md:rounded-full md:mx-2 md:mt-2 border-b border-sand pb-28 mb-2 md:mb-0 md:pb-16 transition-[background] [&.has-loaded]:bg-transparent [&.has-loaded]:border-b-0 has-loaded">
      <nav className="bg-gray-100 fixed top-0 left-0 w-full h-16  transition-all duration-[250ms] ease-in-out opacity-0 [.branch-banner-is-active_&]:!top-[76px] [.has-loaded_&]:opacity-100">
        <div className="flex w-full md:w-auto md:flex-row fixed md:right-2 md:left-2 md:top-2 bg-white md:rounded-full md:items-center items-stretch border-b border-sand">
          <Link
            href="/admin"
            className="flex content-center items-center w-6 h-6  md:flex md:mx-6 "
          >
            <FaStaylinked
              style={{ display: "block", width: "auto" }}
              width={"1.5em"}
              height={"100%"}
            />
          </Link>

          <div className="flex flex-grow overflow-x-auto bg-white h-16 md:gap-4">
            {menuLinks.map((item, index) => (
              <LinkButton.Root key={index} href={item.href}>
                <LinkButton.Icon icon={item.icon} />
                <LinkButton.Content text={item.text} />
              </LinkButton.Root>
            ))}
          </div>
          <div className="flex items-center justify-between border-b md:border-none border-marble h-14">
            <div className="flex-shrink-0 flex items-center mx-2 gap-x-2 md:mx-3 relative">
              <div className="relative hidden md:flex">
                <span className="text-blue-600 visited:text-purple-600 target:shadow-lg">
                  <button onClick={redirectLogout}>
                    <MdOutlineLogout />
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
