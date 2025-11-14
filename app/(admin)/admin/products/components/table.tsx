"use client";

import { useState } from "react";
import { Search, Plus, Edit2, Trash2, X, Check, Package, DollarSign, Hash, Store, Folder } from "lucide-react";

interface Product {
  id: number;
  product_name: string;
  price: number;
  stock: number;
  description: string;
  category_id: number;
  shop_id: number;
  category_name?: string;
  shop_name?: string;
  created_at: string;
}

interface ProductsTableProps {
  products?: Product[];
}

export function ProductsTable({ products: initialProducts }: ProductsTableProps = {}) {
  // Dummy data products
  const [products, setProducts] = useState<Product[]>([
    { 
      id: 1, 
      product_name: "Laptop Gaming", 
      price: 15000000, 
      stock: 10, 
      description: "Laptop gaming dengan spesifikasi tinggi", 
      category_id: 1, 
      shop_id: 1, 
      category_name: "Elektronik",
      shop_name: "Tech Store",
      created_at: "2024-01-15" 
    },
    { 
      id: 2, 
      product_name: "Buku Programming", 
      price: 150000, 
      stock: 50, 
      description: "Buku belajar programming untuk pemula", 
      category_id: 2, 
      shop_id: 2, 
      category_name: "Buku",
      shop_name: "Book Shop",
      created_at: "2024-01-16" 
    },
    { 
      id: 3, 
      product_name: "Mouse Wireless", 
      price: 250000, 
      stock: 30, 
      description: "Mouse wireless dengan ergonomic design", 
      category_id: 1, 
      shop_id: 1, 
      category_name: "Elektronik",
      shop_name: "Tech Store",
      created_at: "2024-01-17" 
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    product_name: '',
    price: '',
    stock: '',
    description: '',
    category_id: 1,
    shop_id: 1
  });

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        product_name: product.product_name,
        price: product.price.toString(),
        stock: product.stock.toString(),
        description: product.description,
        category_id: product.category_id,
        shop_id: product.shop_id
      });
    } else {
      setEditingProduct(null);
      setFormData({
        product_name: '',
        price: '',
        stock: '',
        description: '',
        category_id: 1,
        shop_id: 1
      });
    }
    setIsModalOpen(true);
    setMessage('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({
      product_name: '',
      price: '',
      stock: '',
      description: '',
      category_id: 1,
      shop_id: 1
    });
    setMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (editingProduct) {
      // Update product
      setProducts(products.map(product => 
        product.id === editingProduct.id 
          ? { 
              ...product, 
              ...formData, 
              price: parseInt(formData.price),
              stock: parseInt(formData.stock)
            }
          : product
      ));
      setMessage('Berhasil mengupdate produk');
    } else {
      // Add new product
      const newProduct: Product = {
        id: Math.max(...products.map(p => p.id)) + 1,
        product_name: formData.product_name,
        price: parseInt(formData.price),
        stock: parseInt(formData.stock),
        description: formData.description,
        category_id: formData.category_id,
        shop_id: formData.shop_id,
        category_name: "Kategori",
        shop_name: "Toko",
        created_at: new Date().toISOString()
      };
      setProducts([...products, newProduct]);
      setMessage('Berhasil menambah produk');
    }
    
    setTimeout(() => {
      closeModal();
      setMessage('');
      setLoading(false);
    }, 1500);
  };

  const handleDelete = (id: number) => {
    if (!confirm('Apakah anda yakin menghapus produk ini?')) return;
    
    setProducts(products.filter(product => product.id !== id));
    setMessage('Berhasil menghapus produk');
    setTimeout(() => setMessage(''), 3000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.shop_name?.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Cari produk (nama, kategori, toko)..."
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-text-primary focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
          />
        </div>

        {/* Add Button */}
        <button 
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-white dark:text-black px-6 py-2 rounded-lg transition-all"
        >
          <Plus size={18} />
          Tambah Produk
        </button>
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
                  Produk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                  Stok
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                  Toko
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-text-primary uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="bg-background divide-y divide-border">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-text-primary/60">
                    {searchTerm ? "Tidak ada produk yang ditemukan" : "Belum ada produk"}
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product, index) => (
                  <tr 
                    key={product.id}
                    className="hover:bg-secondary/10 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-text-primary">{index + 1}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                          <Package size={16} className="text-secondary" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-text-primary block">
                            {product.product_name}
                          </span>
                          <span className="text-xs text-text-primary/60 line-clamp-1">
                            {product.description}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-text-primary">
                        {formatPrice(product.price)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        product.stock > 10 
                          ? 'bg-green-500/20 text-green-600 dark:text-green-400' 
                          : product.stock > 0
                          ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                          : 'bg-red-500/20 text-red-600 dark:text-red-400'
                      }`}>
                        {product.stock} pcs
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Folder size={14} className="text-text-primary/60" />
                        <span className="text-sm text-text-primary">{product.category_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Store size={14} className="text-text-primary/60" />
                        <span className="text-sm text-text-primary">{product.shop_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => openModal(product)}
                          className="inline-flex items-center gap-1 text-secondary hover:text-secondary/80 transition-colors"
                          title="Edit produk"
                        >
                          <Edit2 size={16} />
                          <span className="text-sm font-medium">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                          title="Hapus produk"
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
          Menampilkan {filteredProducts.length} dari {products.length} produk
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-xl font-bold text-text-primary">
                {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-primary rounded-lg transition-colors"
              >
                <X size={20} className="text-text-primary" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Product Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-text-primary mb-2">
                  <Package size={16} />
                  Nama Produk
                </label>
                <input
                  type="text"
                  value={formData.product_name}
                  onChange={(e) => setFormData({...formData, product_name: e.target.value})}
                  maxLength={100}
                  required
                  placeholder="Masukkan nama produk"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-primary text-text-primary focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                />
                <p className="text-xs text-text-primary/60 mt-1">Maksimal 100 karakter</p>
              </div>

              {/* Price */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-text-primary mb-2">
                  <DollarSign size={16} />
                  Harga
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                  min="0"
                  placeholder="0"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-primary text-text-primary focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-text-primary mb-2">
                  <Hash size={16} />
                  Stok
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  required
                  min="0"
                  placeholder="0"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-primary text-text-primary focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-text-primary mb-2">
                  <Package size={16} />
                  Deskripsi
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  rows={3}
                  placeholder="Masukkan deskripsi produk"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-primary text-text-primary focus:ring-2 focus:ring-secondary focus:border-secondary transition-all resize-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-text-primary mb-2">
                  <Folder size={16} />
                  Kategori
                </label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({...formData, category_id: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-primary text-text-primary focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                >
                  <option value={1}>Elektronik</option>
                  <option value={2}>Buku</option>
                  <option value={3}>Pakaian</option>
                  <option value={4}>Makanan</option>
                </select>
              </div>

              {/* Shop */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-text-primary mb-2">
                  <Store size={16} />
                  Toko
                </label>
                <select
                  value={formData.shop_id}
                  onChange={(e) => setFormData({...formData, shop_id: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-primary text-text-primary focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                >
                  <option value={1}>Tech Store</option>
                  <option value={2}>Book Shop</option>
                  <option value={3}>Fashion Store</option>
                </select>
              </div>

              {/* Message in Modal */}
              {message && (
                <div className={`p-3 rounded-lg text-sm ${message.includes('Error') ? 'bg-red-500/10 text-red-600 dark:text-red-400' : 'bg-green-500/10 text-green-600 dark:text-green-400'}`}>
                  {message}
                </div>
              )}

              {/* Modal Footer */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-text-primary hover:bg-primary transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-secondary hover:bg-secondary/80 text-white dark:text-black rounded-lg transition-colors font-medium disabled:opacity-50"
                >
                  {loading ? "Menyimpan..." : editingProduct ? 'Update' : 'Tambah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}