import ProductCard from "./ProductCard";
import type { Product } from "../types";

export default function ProductGrid({ products }: { products: Product[] }) {
  // Empty state
  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <svg
          className="w-20 h-20 text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h18M9 3v18m6-18v18M4 7h16M4 17h16"
          />
        </svg>

        <h2 className="text-xl font-semibold text-gray-600">
          No products found
        </h2>

        <p className="text-gray-400 text-sm mt-2">
          Try adjusting your search or category filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
        />
      ))}
    </div>
  );
}
