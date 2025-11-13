"use client";

import Link from "next/link";
import { use, useState } from "react";
import { CATEGORY } from "@/app/types/category";
import { CreateCategory, GetCategory } from "@/app/queries/category";

export function CategoryTable({
  categoryPromise
}: {
  categoryPromise: Promise<CATEGORY[]>;
}) {
  const category = use(categoryPromise);
  const [ categories, setCategories ] = useState<CATEGORY[]>(category);
  const [ category_name, setCategory_name ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ message, setMessage ] = useState('');
  const [ editingId, setEditingId ] = useState<string | null>(null)
  const [ editcategory_name, setCategory_Name ] = useState('');

  const startEdit = (category: CATEGORY) => {
    setEditingId(category.id);
    setEditName
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const result = await CreateCategory({
      category_name
    });

    if (result.success) {
      setMessage('Berhasil menambah kategori');
      setCategory_name('');

      const newCategories = await GetCategory();
      setCategories(newCategories);
    }else {
      setMessage(`Error: ${result.error}`);
    }

    setLoading(false);
  }
  
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* Search bar */}
      <div className="flex justify-between">  
        <div className="pb-4 bg-white dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
        </div>

        {/* Tambah */}
        <form onSubmit={handleSubmit}>
            <div className="bg-primary flex">
                <input 
                    type="text" 
                    id="category_name" 
                    value={category_name}  
                    onChange={(e) => setCategory_name(e.target.value)}
                    required
                    className="block py-1 px-1 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button 
                    type="submit"
                    disabled={loading}
                >
                </button>   

                {/* { message && (
                    <p className={`${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                        {message}
                    </p>
                )} */}
            </div>
        </form>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Nama Kategori
            </th>
            <th scope="col" className="px-6 py-3">
              Aksi
            </th>
          </tr>
        </thead>

        <tbody>
          {categories.map((item) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              key={item.id}
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.category_name}
              </th>
              <td className="px-6 py-4 flex gap-3">
                <Link
                  href="/products/edit/1"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <Link
                  href="/products/edit/1"
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Hapus
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
