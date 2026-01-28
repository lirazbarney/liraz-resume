import ProfileButtons from "@/components/profile-buttons";
import { getCurrentUserById } from "@/lib/actions";
import { UserWithoutPassWord } from "@/types/user";
import { notFound } from "next/navigation";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ProfilePage() {
  const user = (await getCurrentUserById()) as UserWithoutPassWord;
  if (!user) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-3.5rem)] max-w-2xl px-4 py-12 sm:py-16">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl sm:p-8">
        <h1 className="font-display text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
          Profile
        </h1>
        <p className="mt-1 text-[var(--muted)]">
          Your account details and options.
        </p>

        <dl className="mt-8 space-y-5 border-t border-[var(--border)] pt-8">
          {user.email && (
            <div>
              <dt className="text-sm font-medium text-[var(--muted)]">Email</dt>
              <dd className="mt-1 text-[var(--foreground)]">{user.email}</dd>
            </div>
          )}
          {user.name && (
            <div>
              <dt className="text-sm font-medium text-[var(--muted)]">Name</dt>
              <dd className="mt-1 text-[var(--foreground)]">{user.name}</dd>
            </div>
          )}
          {user.created_at && (
            <div>
              <dt className="text-sm font-medium text-[var(--muted)]">
                Member since
              </dt>
              <dd className="mt-1 text-[var(--foreground)]">
                {formatDate(user.created_at)}
              </dd>
            </div>
          )}
        </dl>

        <ProfileButtons userId={user.id} />
      </div>
    </main>
  );
}
