import type { Metadata } from "next";

import { UserContextProvider } from "@/context/userContext";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import userGet from "@/actions/users/user-get";

import "./globals.css";

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
      <body className="bg-zinc-900 bg-[url('/assets/wallpaper.png')] bg-cover">
        <UserContextProvider user={user}>
          <div className="flex flex-col min-h-[calc(100vh+10rem)]">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </UserContextProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
