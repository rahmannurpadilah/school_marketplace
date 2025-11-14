import { GetCategory } from "@/app/queries/category";
import { CategoryTable } from "./components/table";

export default async function CategoryPage() {
  const category = GetCategory();

  return (
    <main className="w-full">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary">Kategori Produk</h2>
        <p className="text-sm text-text-primary/60 mt-1">
          Kelola kategori produk untuk toko Anda
        </p>
      </div>

      {/* Content Section */}
      <div className="bg-primary rounded-lg shadow-md border border-border p-6">
        <CategoryTable categoryPromise={category} />
      </div>
    </main>
  );
}