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
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div>{children}</div>
    </div>
  );
}
