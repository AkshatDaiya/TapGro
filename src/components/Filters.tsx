type Props = {
  search: string;
  setSearch: (v: string) => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
};

export default function Filters({
  search,
  setSearch,
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-xl px-4 py-2 w-full"
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border rounded-xl px-4 py-2"
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
