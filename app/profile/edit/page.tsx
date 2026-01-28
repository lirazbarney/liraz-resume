"use client";

import UserInfoInputs from "@/components/user-info-inputs";
import { getCurrentUserById, updateProfileAction } from "@/lib/actions";
import { UserWithoutPassWord } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export default function ProfileEditPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserWithoutPassWord | null>(null);

  const [result, formAction, isPending] = useActionState(
    updateProfileAction,
    null,
  );

  useEffect(() => {
    const fetchUser = async () => {
      const u = (await getCurrentUserById()) as UserWithoutPassWord;
      setUser(u);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (result?.ok) {
      router.push("/profile");
    }
  }, [result, router]);

  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-md flex-col justify-center px-4 py-12 sm:py-16">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl sm:p-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            Edit profile
          </h1>
          <p className="mt-2 text-[var(--muted)]">
            Update your email, name, or password.
          </p>
        </div>

        <form action={formAction} className="space-y-6">
          <UserInfoInputs errors={result?.errors} user={user ?? undefined} />

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-lg bg-[var(--primary)] py-3.5 font-semibold text-white transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_24px_-4px_var(--purple-500)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none"
            >
              {isPending ? "Saving…" : "Save changes"}
            </button>
            <Link
              href="/profile"
              className="flex-1 rounded-lg border border-[var(--border)] bg-transparent py-3.5 text-center font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-elevated)]"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
