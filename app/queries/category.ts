import { CATEGORY } from "../types/category";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!baseUrl) {
    throw new Error("base url tidak ditemukan");
}

export async function GetCategory(): Promise<CATEGORY[]>{
    try {
        const response = await fetch(`${baseUrl}/api/category`,{
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP status error: ${response.status}`);
        }

        const result = await response.json();

        if (!result.data || !Array.isArray(result.data)) {
            throw new Error(`Struktur response tidak valid`);
        }

        return result.data;
         
    } catch (error) {
        console.error(`Error in GetCategory: `, error);
        return[];
    }
}

export async function CategoryDetail(id: string): Promise<CATEGORY | null>{
    try {
        const response = await fetch(`${baseUrl}/api/category/${id}`,{
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP status error: ${response.status}`)
        }

        const result = await response.json();

        if (!result.data || !Array.isArray(result.data)) {
            throw new Error(`Status respon tidak valid`)
        }

        return result.data;
    } catch (error) {
        console.error(`Error in CategoryDetail: `, error);
        return null;
    }
}

export async function CreateCategory(categoryData: {
    category_name: string;
}): Promise<{ success: boolean, data?: CATEGORY, error?: string }> {
    try {
        const response = await fetch(`${baseUrl}/api/category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryData)
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: result.error || `HTTP status error: ${response.status}`
            }
        }

        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.error(`Error in CreateCategory`, error);
        return {
            success: false,
            error: 'Gagal menambah kategori'
        }
    }
}