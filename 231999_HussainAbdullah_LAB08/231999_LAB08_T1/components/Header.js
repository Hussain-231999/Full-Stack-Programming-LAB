"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header style={{ background: "#1e293b" }} className="shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-white text-2xl font-bold tracking-widest uppercase">
          MyApp
        </Link>
        <nav className="flex gap-2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                pathname === href
                  ? "bg-white text-slate-900"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}