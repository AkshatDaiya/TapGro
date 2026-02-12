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

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
      (selectedCategory ? p.category === selectedCategory : true),
  );

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

      {!loading && !error && <ProductGrid products={filtered} />}
    </div>
  );
}
