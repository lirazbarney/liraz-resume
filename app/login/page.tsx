"use client";

import UserInfoInputs from "@/components/user-info-inputs";
import { loginAction } from "@/lib/actions";
import { useActionState } from "react";

export default function LoginPage() {
  const [result, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div>
      <form action={formAction}>
        <UserInfoInputs errors={result?.errors} isLogin={true} />

        <button disabled={isPending}>
          {isPending ? "Creating..." : "create new user!"}
        </button>
      </form>
    </div>
  );
}
