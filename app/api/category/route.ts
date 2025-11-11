import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Mendapatkan semua kategori produk
export async function GET() {
    // Menggunakan try-catch untuk menangani error
    try{
        const category = await prisma.category.findMany()
        // Mengembalikan response sukses dengan data kategori
        return NextResponse.json({ data: category}, { status: 200})
    }catch (error) {
        // Mengembalikan response error
        return NextResponse.json({ error: error}, { status: 500})
    }
}

// Menambahkan kategori produk baru
export async function POST(request: Request) {
    // Menggunakan try-catch untuk menangani error
    try {
        // Mendapatkan data dari body request
        const body = await request.json()
        // Destructuring untuk mendapatkan category_name
        const { category_name } = body

        // Validasi input
        if (!category_name) {
            return NextResponse.json(
                { error: "Nama kategori wajib diisi" },
                { status: 400 }
            )
        }

        // Menambahkan kategori baru ke database
        const newCategory = await prisma.category.create({
            data: {
                category_name: category_name,
            }
        })

        // Mengembalikan response sukses
        return NextResponse.json({ data: newCategory}, { status: 200})
    }catch (error: any) {
    console.error("PRISMA ERROR:", error) // <-- tambahkan log
    return NextResponse.json(
        { 
            error: "Tidak bisa menambahkan kategori baru", 
            message: error.message,
            code: error.code,
            name: error.name
        }, 
        { status: 500 }
    )
}

}