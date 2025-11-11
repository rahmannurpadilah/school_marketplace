import { PrismaClient } from "@prisma/client";
import { log } from "console";

// Membuat tipe global untuk menyimpan instance PrismaClient
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Mengecek apakah sudah ada instance PrismaClient di global, jika tidak buat baru
export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query', 'error'], //log query buat debugging
    })

// Hanya di development, simpan instance di global agar tidak membuat banyak koneksi
if (process.env.NODE_ENV !== "production")globalForPrisma.prisma = prisma;