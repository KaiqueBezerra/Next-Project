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
    <div className="grid md:grid-cols-[2fr_1fr] grid-cols-1 min-h-screen">
      <div className="bg-[url('/assets/wallpaper.jpg')] bg-cover max-md:hidden"></div>
      <div className="flex flex-col justify-center p-10 max-md:max-h-screen">
        {children}
      </div>
    </div>
  );
}
