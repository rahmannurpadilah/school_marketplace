"use client";

import { USER } from "@/app/types/user";
import { Edit2, Plus, Search, Trash2, User } from "lucide-react";
import { use } from "react";

export function UserTable({
    userPromise
}: {
    userPromise: Promise<{ success: boolean; data?: USER[]; error?: string }>
}) {
    const userResult = use(userPromise);
    
    return(
        <div className="space-y-4">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-primary/60" size={18} />
            <input
                type="text"
                placeholder="Cari user (nama, username, kontak)..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-text-primary focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
            />
            </div>

            {/* Add Button */}
            <button className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-white dark:text-black px-6 py-2 rounded-lg transition-all">
            <Plus size={18} />
            Tambah User
            </button>
        </div>

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
                    Nama
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                    Kontak
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                    Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                    Role
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-text-primary uppercase tracking-wider">
                    Aksi
                    </th>
                </tr>
                </thead>

                <tbody className="bg-background divide-y divide-border">
                <tr className="hover:bg-secondary/10 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-primary">1</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                        <User size={16} className="text-secondary" />
                        </div>
                        <span className="text-sm font-medium text-text-primary">
                        John Doe
                        </span>
                    </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-primary">081234567890</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-primary">johndoe</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary/20 text-text-secondary">
                        member
                    </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center gap-3">
                        <button className="inline-flex items-center gap-1 text-secondary hover:text-secondary/80 transition-colors">
                        <Edit2 size={16} />
                        <span className="text-sm font-medium">Edit</span>
                        </button>
                        <button className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors">
                        <Trash2 size={16} />
                        <span className="text-sm font-medium">Hapus</span>
                        </button>
                    </div>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>

        {/* Footer Info */}
        <div className="flex justify-between items-center text-sm text-text-primary/70">
            <div>Menampilkan 1 dari 1 user</div>
        </div>
        </div>
    )
}