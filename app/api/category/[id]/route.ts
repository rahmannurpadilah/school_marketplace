import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"


// Untuk mendapatkan category berdasarkan id
export async function GET(
    request: Request,
    { params }: {params: Promise<{id: string}>}
){
    try{
        const id = parseInt((await params).id)
        
        const category = await prisma.category.findUnique({
            where: { id }
        })

        if (!category) {
            return NextResponse.json({error: "Kategori tidak ditemukan"}, {status: 404})
        }

        return NextResponse.json({data: category}, {status: 200})

    }catch (error) {
        return NextResponse.json({error: "Gagal Mengambil kategori"}, {status: 500})
    }
}

export async function POST(
    request: Request,
    { params }: {params: Promise<{id: string}>}
) {
    try{
        const body = await request.json()
        const id = parseInt((await params).id)

        const category = await prisma.category.update({
            where: {id},
            data: body
        })

        return NextResponse.json({data: category}, {status: 200})
    }catch (error) {
        return NextResponse.json({error: "Gagal memperbarui kategori"}, {status: 500})
    }
    
}

export async function DELETE(
    request: Request,
    { params }: {params: Promise<{id: string}>}
) {
    try{
        const id = parseInt((await params).id)

        await prisma.category.delete({
            where: { id }
        })

        return NextResponse.json({message: "Kategori berhasil dihapus"}, {status: 200})
    }catch (error) {
        return NextResponse.json({error: "Kategori gagal dihapus"}, {status: 500})
    }
}