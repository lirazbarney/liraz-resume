"use client";

import { updateProfileAction } from "@/lib/actions";
import { useActionState, useState } from "react";
import { UserWithoutPassWord } from "@/types/user";
import Link from "next/link";
import Loader from "../loader/loader";
import UserInfoInputs from "./user-info-inputs";

type EditProfileFormProps = {
  user: UserWithoutPassWord;
};

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const [email, setEmail] = useState<string>(user.email);
  const [name, setName] = useState<string>(user.name);
  const [result, formAction, isPending] = useActionState(
    updateProfileAction,
    null,
  );

  return (
    <form action={formAction} className="space-y-6">
      <UserInfoInputs
        type="edit"
        errors={result?.errors}
        oldEmail={{ email: email ?? undefined, setEmail }}
        oldName={{ name: name ?? undefined, setName }}
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 rounded-lg bg-[var(--primary)] py-3.5 font-semibold text-white transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_24px_-4px_var(--purple-500)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none"
        >
          {isPending ? <Loader /> : "Save changes"}
        </button>
        <Link
          href="/profile"
          className="flex-1 rounded-lg border border-[var(--border)] bg-transparent py-3.5 text-center font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-elevated)]"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
