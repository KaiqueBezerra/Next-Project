import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Project | Sign-in",
};

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid md:grid-cols-[2fr_1fr] grid-cols-1 min-h-[calc(100vh+10rem)]">
      <div className="bg-[url('/assets/wallpaper1.jpg')] bg-cover max-md:hidden"></div>
      <div className="flex flex-col justify-center p-5 sm:p-10 max-md:max-h-screen">
        {children}
      </div>
    </div>
  );
}
