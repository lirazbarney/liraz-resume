import { logoutAction } from "@/lib/actions";
import Link from "next/link";
import { ClientButton } from "../basic-client-components";
import { UserWithoutPassWord } from "@/types/user";
import HomePageParts from "./home-page-parts";

type MainHeaderProps = {
  userName: string | null;
};

export default async function MainHeader({ userName }: MainHeaderProps) {
  return (
    // <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--surface)]/80">
    <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6"> */}
        <Link href="/">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {`Liraz Bar-Nir`}
          </h1>
        </Link>
        <HomePageParts />
        {userName ? (
          <ul className="flex items-center gap-1 sm:gap-2">
            <li>
              <Link
                href="/profile"
                className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
              >
                hello, {userName}
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
        {/* </nav> */}
      </div>
    </header>
  );
}
