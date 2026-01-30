"use client";

import { deleteUserAction, logoutAction } from "@/lib/actions";
import Link from "next/link";
import { useTransition } from "react";
import Loader from "./loader/loader";

type ProfileButtonsProps = {
  userId: number;
};

export default function ProfileButtons({ userId }: ProfileButtonsProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Link
        href="/profile/edit"
        className="inline-flex items-center justify-center rounded-lg bg-[var(--primary)] px-5 py-3 font-semibold text-white transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_20px_-4px_var(--purple-500)] active:scale-[0.98]"
      >
        Edit profile
      </Link>
      <button
        type="button"
        onClick={() => startTransition(() => logoutAction())}
        disabled={isPending}
        className="inline-flex items-center justify-center rounded-lg border border-[var(--border)] bg-transparent px-5 py-3 font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-elevated)] disabled:opacity-50"
      >
        {isPending ? <Loader /> : "Log out"}
      </button>
      <button
        type="button"
        onClick={() => {
          if (
            !confirm(
              "Are you sure you want to delete your account? This cannot be undone.",
            )
          )
            return;
          startTransition(() => deleteUserAction(userId, "/"));
        }}
        disabled={isPending}
        className="inline-flex items-center justify-center rounded-lg border border-[var(--danger)]/50 bg-transparent px-5 py-3 font-medium text-[var(--danger)] transition-colors hover:bg-[var(--danger)]/10 disabled:opacity-50"
      >
        {isPending ? <Loader /> : "Delete account"}
      </button>
    </div>
  );
}
