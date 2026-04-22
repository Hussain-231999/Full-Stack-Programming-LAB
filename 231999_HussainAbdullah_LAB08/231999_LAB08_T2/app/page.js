import Link from "next/link";
import products from "@/data/products";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white py-28 px-6 text-center">
        <h1 className="text-6xl font-extrabold mb-5 tracking-tight">
          Shop the Best <span className="text-emerald-400">Tech</span>
        </h1>
        <p className="text-emerald-200 text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          Browse our curated selection of premium tech products. Click any item
          to see full details on its own dynamic page.
        </p>
        <Link
          href="/products"
          className="bg-emerald-400 text-emerald-950 font-bold px-10 py-3.5 rounded-xl hover:bg-emerald-300 transition-colors text-lg"
        >
          Browse All Products →
        </Link>
      </section>

      {/* Quick Preview — 3 products */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-slate-800 mb-10 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all"
            >
              <span className="text-5xl mb-4 block">{product.icon}</span>
              <h3 className="text-slate-800 font-bold mb-1">{product.title}</h3>
              <p className="text-emerald-600 font-extrabold text-xl">
                ${product.price}
              </p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/products"
            className="text-emerald-600 hover:text-emerald-500 font-semibold underline underline-offset-4"
          >
            View all {products.length} products →
          </Link>
        </div>
      </section>
    </div>
  );
}