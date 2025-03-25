import { UserProjects } from "@/components/profile/user-projects";
import { UserProfile } from "@/components/profile/user-profile";

import { list } from "@vercel/blob";
import userByIdGet from "@/actions/users/user-by-Id-get";
import styles from "./page.module.css";

import { notFound } from "next/navigation";

interface ProfileParams {
  params: Promise<{ id: string }>;
}

export default async function Profile({ params }: ProfileParams) {
  const { id } = await params;
  const { data: user } = await userByIdGet(id);

  const userPhoto = await list({
    prefix: user?.id,
  });

  if (!user) notFound();

  return (
    <div className={styles.profile}>
      <div className={styles.container}>
        <UserProfile user={user} userPhoto={userPhoto} />
        <UserProjects userId={user.id} />
      </div>
    </div>
  );
}
