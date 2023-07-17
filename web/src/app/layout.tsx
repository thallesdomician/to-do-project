import AuthContextProvider, { AuthContext } from "@/context/auth";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "eProfile",
  description:
    "A empresa eConnect oferece um serviço inovador de cartões de visita eletrônicos. Nossos cartões são uma alternativa moderna e sustentável aos tradicionais cartões de visita em papel. Através do eConnect, você pode compartilhar seus dados de contato diretamente no celular do seu cliente, de forma rápida e conveniente.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={roboto.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
