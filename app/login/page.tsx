"use client";

import InputsBox from "@/components/inputs/inputs-box";
import UserInfoInputs from "@/components/inputs/user-info-inputs";
import Loader from "@/components/loader/loader";
import { getCurrentUserById, loginAction } from "@/lib/actions";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export const runtime = "edge";

export default function LoginPage() {
  const [result, formAction, isPending] = useActionState(loginAction, null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUserById(true);
      if (user) {
        redirect("/profile");
      }
    };

    fetchUser();
  }, []);

  return (
    <InputsBox
      title="Login to your account"
      description="Welcome back! Please enter your details."
    >
      <form action={formAction} className="space-y-6">
        <UserInfoInputs
          errors={result?.errors}
          type="login"
          oldEmail={{ email, setEmail }}
        />

        <button
          disabled={isPending}
          className="w-full rounded-lg bg-[var(--primary)] py-3.5 font-semibold text-white transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_24px_-4px_var(--purple-500)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none"
        >
          {isPending ? <Loader /> : "Login"}
        </button>

        <Link href="/signup">
          <button type="button" className="text-sm text-[var(--primary)]">
            First time here? create new account for free!
          </button>
        </Link>
      </form>
    </InputsBox>
  );
}
