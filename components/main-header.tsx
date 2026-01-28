import { getCurrentUserById, logoutAction } from "@/lib/actions";
import Link from "next/link";
import { ClientButton } from "./basic-client-components";

export default async function MainHeader() {
  const user = await getCurrentUserById();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--surface)]/80">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
        >
          Home
        </Link>
        {user ? (
          <ul className="flex items-center gap-1 sm:gap-2">
            <li>
              <Link
                href="/profile"
                className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
              >
                hello, {user.name}
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_20px_-4px_var(--purple-500)] active:scale-[0.98]"
              >
                <ClientButton handleClick={logoutAction}>Logout</ClientButton>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center gap-1 sm:gap-2">
            <li>
              <Link
                href="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_20px_-4px_var(--purple-500)] active:scale-[0.98]"
              >
                Sign up
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
