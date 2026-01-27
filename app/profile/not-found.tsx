import Link from "next/link";

export default function ProfileNotFound() {
  return (
    <div>
      <h1>Profile not found</h1>
      <p>The profile you are looking for does not exist.</p>
      <Link href="/">Go back to the home page</Link>
    </div>
  );
}
