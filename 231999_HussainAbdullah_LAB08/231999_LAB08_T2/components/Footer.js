import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-emerald-950 border-t border-emerald-900 mt-auto text-emerald-300">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-extrabold text-xl mb-2">🛒 ShopNext</h3>
            <p className="text-emerald-500 text-sm leading-relaxed">
              Discover the best tech products with dynamic pages powered by Next.js App Router.
            </p>
          </div>
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-3">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[{ href: "/", label: "Home" }, { href: "/products", label: "All Products" }].map(
                ({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-emerald-500 hover:text-white text-sm transition-colors">
                      {label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-3">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-emerald-500">
              <li>📧 support@shopnext.com</li>
              <li>📞 +92 300 1234567</li>
              <li>📍 Islamabad, Pakistan</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-emerald-900 pt-6 text-center text-emerald-700 text-sm">
          © {new Date().getFullYear()} ShopNext. Built with Next.js Dynamic Routing.
        </div>
      </div>
    </footer>
  );
}