"use client";

import { createUserAction } from "@/lib/actions";
import { redirect } from "next/navigation";
import { useActionState } from "react";

export default function Home() {
  const [result, formAction] = useActionState(createUserAction, { ok: false });

  if (result.ok) {
    redirect("/profile");
  }
  return (
    <div>
      <form action={formAction}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            required
            className="bg-white border border-black text-black"
          />
          {result?.errors?.email && (
            <p className="text-red-500">{result.errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            required
            className="bg-white border border-black text-black"
          />
          {result?.errors?.name && (
            <p className="text-red-500">{result.errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            required
            className="bg-white border border-black text-black"
          />
          {result?.errors?.password && (
            <p className="text-red-500">{result.errors.password}</p>
          )}
        </div>
        <button>create new user!</button>
      </form>
    </div>
  );
}
