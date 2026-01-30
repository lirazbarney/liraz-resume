"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HomePageParts() {
  const pathName = usePathname();
  const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#militaryService", label: "Military Service" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    pathName === "/" && (
      <nav className="flex gap-6">
        {links.map((link) => (
          <Link
            href={link.href}
            className="hover:text-blue-400 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    )
  );
}
