import { Profile } from "@/components/me/profile";
import { list } from "@vercel/blob";

import { Metadata } from "next";

import styles from "./layout.module.css";
import userGet from "@/actions/users/user-get";

export async function generateMetadata(): Promise<Metadata> {
  const { data: user } = await userGet();

  return {
    title: `Next Project | ${user?.name}`,
  };
}

export default async function MeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: user } = await userGet();

  const userPhoto = await list({
    prefix: user?.id,
  });

  return (
    <section className={styles.me}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <Profile userPhoto={userPhoto} />
          {children}
        </div>
      </div>
    </section>
  );
}
