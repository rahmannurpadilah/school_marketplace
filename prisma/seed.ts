import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Memulai seed...");

    try {
        // Hapus data existing
        await prisma.category.deleteMany();
        console.log("✅ Data lama dihapus");

        // Buat kategori baru
        const categories = await prisma.category.createMany({
            data: [
                {
                    category_name: "Buku Pelajaran"
                },
                {
                    category_name: "Alat Tulis" 
                },
                {
                    category_name: "Seragam Sekolah"
                },
                {
                    category_name: "Elektronik"
                },
                {
                    category_name: "Olahraga"
                }
            ]
        });

        console.log(`✅ ${categories.count} kategori berhasil dibuat!`);
        
        // Tampilkan kategori yang dibuat
        const allCategories = await prisma.category.findMany();
        console.log("\n📋 Daftar Kategori:");
        allCategories.forEach((category, index) => {
            console.log(`   ${index + 1}. ${category.category_name}`);
        });

    } catch (error) {
        console.error("❌ Error saat seeding:", error);
    } finally {
        await prisma.$disconnect();
    }
}

// Jalankan seeder
main()
    .catch((e) => {
        console.error("❌ Seed gagal:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });