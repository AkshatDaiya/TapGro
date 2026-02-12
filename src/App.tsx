import { useEffect, useState } from "react";
import type { Product } from "./types";
import ProductGrid from "./components/ProductGrid";
import Loader from "./components/Loader";
import Filters from "./components/Filters";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error();

        const data = await res.json();
        setProducts(data);
      } catch {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const categories = [...new Set(products.map((p) => p.category))];

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
      (selectedCategory ? p.category === selectedCategory : true),
  );

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filtered.slice(start, start + itemsPerPage);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>

      <Filters
        search={search}
        setSearch={setSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {loading && <Loader />}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && <ProductGrid products={paginatedProducts} />}

      <div className="flex justify-center mt-8 gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg border transition cursor-pointer ${
              currentPage === i + 1
                ? "bg-indigo-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
