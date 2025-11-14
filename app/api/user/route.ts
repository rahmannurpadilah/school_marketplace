import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                id: 'desc'
            }
        });

        return NextResponse.json({
            success: true,
            data: users
        }, {
            status: 200
        });
    } catch (error) {
        console.error('Error fetching users: ', error);
        return NextResponse.json({
            status: false,
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}