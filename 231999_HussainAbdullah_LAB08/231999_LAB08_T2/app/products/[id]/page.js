
import Link from "next/link";
import products from "@/data/products";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const product = products.find((p) => p.id === params.id);
  return { title: product ? `${product.title} — ShopNext` : "Not Found" };
}

export default function ProductPage({ params }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) notFound();

  // Related products (exclude current)
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Back link */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-500 font-medium text-sm mb-10 transition-colors"
      >
        ← Back to All Products
      </Link>

      {/* Product Detail Card */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Icon/Image */}
          <div className="bg-emerald-50 flex items-center justify-center p-16">
            <span className="text-9xl">{product.icon}</span>
          </div>

          {/* Right: Info */}
          <div className="p-10 flex flex-col justify-center">
            <span className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-3">
              {product.category}
            </span>
            <h1 className="text-4xl font-extrabold text-slate-800 mb-4 leading-tight">
              {product.title}
            </h1>
            <p className="text-slate-500 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex text-yellow-400 text-lg">
                {"★".repeat(Math.floor(product.rating))}
              </div>
              <span className="text-slate-600 font-semibold">
                {product.rating}
              </span>
              <span className="text-slate-400 text-sm">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-5xl font-extrabold text-emerald-600 mb-8">
              ${product.price}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-colors"
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="px-5 py-3.5 border border-slate-300 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors text-xl"
              >
                ♡
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-16 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Key Features
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-slate-600">
              <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                ✓
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          You Might Also Like
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {related.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 hover:border-emerald-400 hover:shadow-md transition-all"
            >
              <span className="text-4xl">{p.icon}</span>
              <div>
                <h3 className="text-slate-800 font-semibold text-sm">
                  {p.title}
                </h3>
                <p className="text-emerald-600 font-bold">${p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}