import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#1e293b" }} className="text-slate-300 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-xl font-bold tracking-widest uppercase mb-3">
              MyApp
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              A simple, beautiful multi-page Next.js application built with
              the App Router and Tailwind CSS.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-white font-semibold mb-3 uppercase text-xs tracking-widest">
              Pages
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold mb-3 uppercase text-xs tracking-widest">
              Info
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>📧 hello@myapp.com</li>
              <li>📞 +92 300 0000000</li>
              <li>📍 Islamabad, Pakistan</li>
            </ul>
          </div>
        </div>

        <div
          className="border-t border-slate-700 pt-6 text-center text-slate-500 text-sm"
        >
          © {new Date().getFullYear()} MyApp. Built with Next.js & Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}