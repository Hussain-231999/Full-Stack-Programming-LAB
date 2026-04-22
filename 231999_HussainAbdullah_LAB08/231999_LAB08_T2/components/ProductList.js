import Link from "next/link";
import products from "@/data/products";

export default function ProductList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
        >
          {/* Card Top */}
          <div className="bg-emerald-50 p-8 text-center">
            <span className="text-6xl">{product.icon}</span>
          </div>

          {/* Card Body */}
          <div className="p-6 flex flex-col flex-1">
            <span className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-2">
              {product.category}
            </span>
            <h3 className="text-slate-800 font-bold text-lg mb-2">{product.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
              {product.description}
            </p>

            {/* Price + Rating */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-emerald-600 font-extrabold text-2xl">
                ${product.price}
              </span>
              <span className="text-yellow-500 text-sm font-medium">
                ★ {product.rating}{" "}
                <span className="text-slate-400">({product.reviews})</span>
              </span>
            </div>

            {/* View Details Button */}
            <Link
              href={`/products/${product.id}`}
              className="block text-center bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-xl transition-colors duration-200"
            >
              View Details →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}