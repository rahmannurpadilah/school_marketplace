import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";

// Mendapatkan semua kategori produk
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                id: 'desc'
            }
        });

        return NextResponse.json({
            success: true,
            data: categories
        });
    } catch (error) {
        console.error(`Error fetching categories:`, error);
        return NextResponse.json({
            success: false,
            error: 'Internal server error'
        },{ status: 500 });
    }
}

// Menambahkan kategori produk baru
export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.category_name || body.category_name.trim() === '') {
            return NextResponse.json({
                success: false,
                error: 'Form harus diisi'
            }, { status: 400 })
        };
        
        const category = await prisma.category.create({
            data: {
                category_name: body.category_name.trim()
            }
        });

        return NextResponse.json({
            success: true,
            data: category
        })
    } catch (error) {
        console.error(`Error creating category: `, error);
        return NextResponse.json({
            success: false,
            error: 'Internal server error'
        }, { status: 500 })
    }
}