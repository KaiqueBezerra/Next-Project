import { Metadata } from "next";

import { MeProjects } from "@/components/me/me-projects";
import { Profile } from "@/components/me/profile";

import { list } from "@vercel/blob";

import userGet from "@/actions/users/user-get";

export async function generateMetadata(): Promise<Metadata> {
  const { data: user } = await userGet();

  return {
    title: `Next Project | ${user?.name}`,
  };
}

export default async function Me() {
  const { data: user } = await userGet();

  const userPhoto = await list({
    prefix: user?.id,
  });

  return (
    <section className="container place-self-center">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] min-h-[93vh]">
        <Profile userPhoto={userPhoto} />
        <MeProjects />
      </div>
    </section>
  );
}
