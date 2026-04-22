import ProductList from "@/components/ProductList";

export default function ProductsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-emerald-600 text-sm font-semibold uppercase tracking-widest mb-2">
          Our Catalogue
        </p>
        <h1 className="text-5xl font-extrabold text-slate-800 mb-4">
          All Products
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Click on any product to view its full details on a dedicated page —
          powered by Next.js dynamic routing.
        </p>
      </div>

      {/* ProductList Component */}
      <ProductList />
    </div>
  );
}