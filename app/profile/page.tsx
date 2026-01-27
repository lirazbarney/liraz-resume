import {} from "@/components/basic-client-components";
import { getCurrentUserById } from "@/lib/actions";
import { UserWithoutPassWord } from "@/types/user";
import ProfileButtons from "@/components/profile-buttons";

export default async function ProfilePage() {
  const user = (await getCurrentUserById()) as UserWithoutPassWord;
  return (
    <div>
      <h1>profile page</h1>
      {user.email && <p>this is your email {user.email}</p>}
      {user.name && <p>this is your name {user.name}</p>}
      {user.created_at && <p>this user was created at {user.created_at}</p>}
      <ProfileButtons userId={user.id} />
    </div>
  );
}
