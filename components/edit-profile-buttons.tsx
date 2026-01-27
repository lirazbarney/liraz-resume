"use Client";

import { redirect } from "next/navigation";
import { useActionState } from "react";
import { updateProfileAction } from "@/lib/actions";

export default function EditProfileButtons() {
  const [result, formAction] = useActionState(updateProfileAction, { ok: false });
  if (result.ok) {
    redirect("/profile");
  }
  return (
    <form action={formAction}>
      <button type="submit">save</button>
      <button
        type="button"
        onClick={() => {
          redirect("/profile");
        }}
      >
        cancel
      </button>
    </form>
  );
}
