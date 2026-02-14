import { getCurrentUserById } from "@/lib/actions";
import { notFound } from "next/navigation";
import EditProfileForm from "@/components/inputs/edit-profile-form";

export const runtime = "edge";

export default async function ProfileEditPage() {
  const user = await getCurrentUserById(true);
  if (!user) {
    notFound();
  }

  console.log("=== CLIENT PAGE user: ", user);

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

        <EditProfileForm user={user} />
      </div>
    </main>
  );
}
