import Navigation from "@/components/custom/Navigation";
import AuthContextProvider, { AuthContext } from "@/context/auth";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "eProfile - Usuário Autenticado",
  description:
    "A empresa eConnect oferece um serviço inovador de cartões de visita eletrônicos. Nossos cartões são uma alternativa moderna e sustentável aos tradicionais cartões de visita em papel. Através do eConnect, você pode compartilhar seus dados de contato diretamente no celular do seu cliente, de forma rápida e conveniente.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <body
      suppressHydrationWarning={true}
      className={twMerge(inter.className, "bg-gray-100 p-3")}
    >
      <Navigation />
      <main className="flex min-h-screen flex-col items-center justify-between py-2 ">
        <div className=" w-min-96 w-full">{children}</div>
      </main>
    </body>
  );
}
