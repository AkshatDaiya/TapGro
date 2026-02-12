import type { Product } from "../types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 transition-transform duration-300 hover:scale-105 cursor-pointer">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 mx-auto object-contain mb-4"
      />

      <h2 className="font-semibold text-sm line-clamp-2 mb-2">
        {product.title}
      </h2>

      <p className="text-gray-500 text-xs mb-2">{product.category}</p>

      <p className="text-lg font-bold text-indigo-600">${product.price}</p>
    </div>
  );
}
