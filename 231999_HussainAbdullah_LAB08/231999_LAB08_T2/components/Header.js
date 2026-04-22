"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-emerald-950 border-b border-emerald-900 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-white text-2xl font-extrabold tracking-tight">
          🛒 ShopNext
        </Link>
        <nav className="flex gap-2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === href || (href === "/products" && pathname.startsWith("/products"))
                  ? "bg-emerald-500 text-white"
                  : "text-emerald-300 hover:bg-emerald-800 hover:text-white"
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