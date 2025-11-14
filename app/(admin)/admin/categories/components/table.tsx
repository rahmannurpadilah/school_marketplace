"use client";

import { use, useState } from "react";
import { Search, Plus, Edit2, Trash2, X, Check } from "lucide-react";
import { CATEGORY } from "@/app/types/category";
import { CreateCategory, DeleteCategory, GetCategory, UpdateCategory } from "@/app/queries/category";

export function CategoryTable({
  categoryPromise
}: {
  categoryPromise: Promise<{ success: boolean; data?: CATEGORY[]; error?: string }>;
}) {
  const categoryResult = use(categoryPromise);
  const [ categories, setCategories ] = useState<CATEGORY[]>(
    categoryResult.success && categoryResult.data ? categoryResult.data : []
  )
  const [category_name, setCategory_name] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingHapus, setLoadingHapus] = useState(false);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editcategory_name, setEditCategory_Name] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const startEdit = (category: CATEGORY) => {
    setEditingId(category.id);
    setEditCategory_Name(category.category_name);
    setMessage('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditCategory_Name('');
    setCategory_name('');
    setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    if (editingId) {
      const result = await UpdateCategory(editingId, { category_name: editcategory_name.trim() });

      if (result.success) {
        setMessage('Berhasil mengupdate kategori');
        const result = await GetCategory();
        if (result.success && result.data) {
          setCategories(result.data);
        }
        setEditingId(null);
        setEditCategory_Name('');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } else {
      const result = await CreateCategory({
        category_name
      });
  
      if (result.success) {
        setMessage('Berhasil menambah kategori');
        setCategory_name('');
        
        const result = await GetCategory();
        if (result.success && result.data) {
          setCategories(result.data);
        }
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(`Error: ${result.error}`);
      }
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah anda yakin menghapus kategori ini?')) return;

    setLoadingHapus(true);
    const result = await DeleteCategory(id);

    if (result.success) {
      setMessage('Berhasil menghapus kategori');
      const result = await GetCategory();
      if (result.success && result.data) {
        setCategories(result.data)
      }
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage(`Error: ${result.error}`);
    }

    setLoadingHapus(false);
  };

  const filteredCategories = categories.filter(item =>
    item.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-primary/60" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari kategori..."
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-text-primary focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
          />
        </div>

        {/* Add/Edit Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input 
            type="text" 
            value={editingId ? editcategory_name : category_name}  
            onChange={(e) => {
              if (editingId) {
                setEditCategory_Name(e.target.value);
              } else {
                setCategory_name(e.target.value);
              }
            }}
            placeholder={editingId ? "Edit kategori..." : "Tambah kategori baru"}
            required
            className={`px-4 py-2 border border-border rounded-lg bg-primary text-text-primary focus:ring-2 focus:ring-secondary focus:border-secondary transition-all ${editingId ? "w-45 lg:w-70 md:w-50 w-70" : "lg:w-70 md:w-50 w-70"}`}
          />
          
          {editingId ? (
            <>
              <button 
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-white dark:text-black px-4 py-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <Check size={18} />
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <X size={18} />
                Batal
              </button>
            </>
          ) : (
            <button 
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-white dark:text-black px-4 py-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <Plus size={18} />
              {loading ? "Menambah..." : "Tambah"}
            </button>
          )}
        </form>
      </div>

      {/* Message Alert */}
      {message && (
        <div className={`p-4 rounded-lg border ${message.includes('Error') ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30' : 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30'}`}>
          {message}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-primary border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                  Nama Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                  Jumlah Produk
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-text-primary uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="bg-background divide-y divide-border">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-text-primary/60">
                    {searchTerm ? "Tidak ada kategori yang ditemukan" : "Belum ada kategori"}
                  </td>
                </tr>
              ) : (
                filteredCategories.map((item) => (
                  <tr 
                    key={item.id}
                    className="hover:bg-secondary/10 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-text-primary">
                        {categories.indexOf(item) + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-text-primary">
                        {item.category_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-secondary/20 text-text-secondary">
                        0 produk
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => startEdit(item)}
                          className="inline-flex items-center gap-1 text-secondary hover:text-secondary/80 transition-colors"
                          title="Edit kategori"
                        >
                          <Edit2 size={16} />
                          <span className="text-sm font-medium">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={loadingHapus}
                          className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          title="Hapus kategori"
                        >
                          <Trash2 size={16} />
                          <span className="text-sm font-medium">Hapus</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-center text-sm text-text-primary/70">
        <div>
          Menampilkan {filteredCategories.length} dari {categories.length} kategori
        </div>
        {selectedItems.length > 0 && (
          <div className="text-secondary font-medium">
            {selectedItems.length} item dipilih
          </div>
        )}
      </div>
    </div>
  );
} 