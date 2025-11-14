import { ProductsTable } from "./components/table";

export default function ProductsPage() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary">Products Management</h2>
        <p className="text-sm text-text-primary/60 mt-1">Kelola data produk marketplace</p>
      </div>

      <div className="bg-primary rounded-lg shadow-md border border-border p-6">
        <ProductsTable />
      </div>
    </div>
  );
}