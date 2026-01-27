import EditProfileButtons from "@/components/edit-profile-buttons";
import { getCurrentUserById } from "@/lib/actions";

export default async function ProfileEditPage() {
  const user = await getCurrentUserById(); // ensure authenticated

  return (
    <form>
      <EditProfileButtons />
    </form>
  );
}
