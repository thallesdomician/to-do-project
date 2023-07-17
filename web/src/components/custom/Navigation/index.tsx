"use client";
import Button from "@/components/custom/Navigation/Button";
import { LinkButton } from "@/components/custom/Navigation/LinkButton";
import { useAuth } from "@/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaRegUser, FaStaylinked } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { BiNetworkChart } from "react-icons/bi";

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
      <nav className="bg-marble fixed top-0 left-0 w-full h-16  transition-all duration-[250ms] ease-in-out opacity-0 [.branch-banner-is-active_&]:!top-[76px] [.has-loaded_&]:opacity-100">
        <div className="flex flex-col-reverse w-full md:w-auto md:flex-row fixed md:right-2 md:left-2 md:top-2 bg-white md:rounded-full md:items-center items-stretch border-b border-sand">
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
            {/* <LinkButton
              href={"admin"}
            >
              <span className="flex-col md:flex-row text-xs md:text-sm duration-75 ease-out font-semibold md:px-2 md:group-hover:bg-slate-300  md:px-xs rounded-sm transition-background-color group-focus-visible:ring-2 group-focus-visible:ring-black -tracking-[0.35px] xl:tracking-[0px] flex items-center h-auto md:h-full text-black">
                <span className="p-1 md:pr-2 md:pl-0">span</span>
              </span>
            </LinkButton> */}
            <LinkButton.Root href={"admin"}>
              <LinkButton.Icon icon={FaRegUser} />
              <LinkButton.Content text={"Perfil"} />
            </LinkButton.Root>
            <LinkButton.Root href={"admin"}>
              <LinkButton.Icon icon={BiNetworkChart} />
              <LinkButton.Content text={"Redes Sociais"} />
            </LinkButton.Root>
          </div>
          <div className="flex items-center justify-between border-b md:border-none border-marble h-14">
            <div className="flex-shrink-0 flex items-center mx-2 gap-x-2 md:mx-3 relative">
              <div className="relative hidden md:flex">
                <span className="text-blue-600 visited:text-purple-600 target:shadow-lg">
                  <Button onClick={redirectLogout}>
                    <MdOutlineLogout />
                  </Button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
