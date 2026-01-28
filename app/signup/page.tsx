"use client";

import UserInfoInputs from "@/components/user-info-inputs";
import { createUserAction } from "@/lib/actions";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function SignupPage() {
  const [result, formAction, isPending] = useActionState(
    createUserAction,
    null,
  );

  useEffect(() => {
    if (result?.ok) {
      redirect("/profile");
    }
  }, [result]);

  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-md flex-col justify-center px-4 py-12 sm:py-16">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl sm:p-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            Create your account
          </h1>
          <p className="mt-2 text-[var(--muted)]">
            Join us to get started. Quick and simple.
          </p>
        </div>

        <form action={formAction} className="space-y-6">
          <UserInfoInputs errors={result?.errors} />

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-[var(--primary)] py-3.5 font-semibold text-white transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_24px_-4px_var(--purple-500)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none"
          >
            {isPending ? "Creating account…" : "Create account"}
          </button>
        </form>
      </div>
    </main>
  );
}
