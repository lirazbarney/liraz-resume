"use client";

import InputsBox from "@/components/inputs/inputs-box";
import UserInfoInputs from "@/components/inputs/user-info-inputs";
import Loader from "@/components/loader/loader";
import { createUserAction, getCurrentUserById } from "@/lib/actions";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export const runtime = "edge";

export default function SignupPage() {
  const [result, formAction, isPending] = useActionState(
    createUserAction,
    null,
  );
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (result?.ok) {
      redirect("/profile");
    }
  }, [result]);

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
      title="Create your account"
      description="Join us to get started. Quick and simple."
    >
      <form action={formAction} className="space-y-6">
        <UserInfoInputs
          type="signup"
          errors={result?.errors}
          oldEmail={{ email, setEmail }}
          oldName={{ name, setName }}
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-[var(--primary)] py-3.5 font-semibold text-white transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_24px_-4px_var(--purple-500)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none"
        >
          {isPending ? <Loader /> : "Create account"}
        </button>

        <Link href="/login">
          <button type="button" className="text-sm text-[var(--primary)]">
            Already have an account? login here!
          </button>
        </Link>
      </form>
    </InputsBox>
  );
}
