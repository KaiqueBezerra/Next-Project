import { UserContextProvider } from "@/context/userContext";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import userGet from "@/actions/user-get";
import Header from "@/components/header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Project",
  description: "Encontre o projeto ideal para você.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: user } = await userGet();

  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <UserContextProvider user={user}>
          <Header />
          {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
