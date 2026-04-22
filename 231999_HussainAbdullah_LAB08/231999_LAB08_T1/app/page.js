import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-28 px-6 text-center">
        <h1 className="text-6xl font-bold mb-6 tracking-tight">
          Welcome to <span className="text-yellow-400">MyApp</span>
        </h1>
        <p className="text-slate-300 text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          A clean, fast, and modern multi-page application built with Next.js
          App Router and Tailwind CSS.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/about"
            className="bg-yellow-400 text-slate-900 font-bold px-8 py-3 rounded-xl hover:bg-yellow-300 transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="border border-slate-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-slate-700 transition-colors"
          >
            Contact
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: "⚡", title: "Fast", desc: "Built on Next.js App Router for lightning-fast page loads." },
            { icon: "🎨", title: "Beautiful", desc: "Styled with Tailwind CSS for a modern, clean look." },
            { icon: "📱", title: "Responsive", desc: "Works perfectly on mobile, tablet, and desktop screens." },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-5xl mb-5 block">{icon}</span>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}