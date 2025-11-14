import { prisma } from "@/lib/prisma";
import { CATEGORY } from "../types/category";
import { error } from 'console';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!baseUrl) {
    throw new Error("base url tidak ditemukan");
}

export async function GetCategory(): Promise<{ success: boolean; data?: CATEGORY[]; error?: string }>{
    try {
        const response = await fetch(`${baseUrl}/api/category`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: result.error || `HTTP status error: ${response.status}`
            }
        };

        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.error('Error in category', error);
        return {
            success: false,
            error: 'Gagal mendapatkan kategori'
        }
    }
}

export async function CategoryDetail(id: string): Promise<{ success: boolean; data?: CATEGORY; error?: string }> {
    try {
        const response = await fetch(`${baseUrl}/api/category/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (!response.ok) {
            return{
                success: false,
                error: result.error || `HTTP status error: ${response.status}`
            }
        }

        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.error('Error in category id', error);
        return {
            success: false,
            error: 'Gagal melihat detail kategori'
        }
    }
}

export async function CreateCategory(
    categoryData: { category_name: string; }
): Promise<{ success: boolean, data?: CATEGORY, error?: string }> {
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

export async function UpdateCategory(
    id: number,
    categoryData: { category_name: string }
): Promise<{ success: boolean; data?: CATEGORY; error?: string }> {
    try {
        const response = await fetch(`${baseUrl}/api/category/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryData)
        });
        
        const responsetext = await response.text();
        let result;

        try {
            result = responsetext ? JSON.parse(responsetext) : {};
        } catch (parseError) {
            console.error('JSON parse error:', parseError);
            return {
                success: false,
                error: 'Invalid response from server'
            };
        }

        if (!response.ok) {
            return {
                success: false,
                error: result.error || `HTTP status error: ${response.status}`
            };
        }

        return {
            success: true,
            data: result.data
        };

    } catch (error) {
        console.error(`Error in UpdateCategory fir id ${id} : `, error);
        return {
            success: false,
            error: 'Gagal mengupdate category'
        }
    }
}

export async function DeleteCategory( id: number ): Promise<{ success: boolean; error?: string }> {
    try {
        const response = await fetch(`${baseUrl}/api/category/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const resposetext = await response.text();
        let result;
    
        try {
            result = resposetext ? JSON.parse(resposetext.trim()) : {};
        } catch (parseError) {
            console.error('JSON parse error : ', parseError);
            return {
                success: false,
                error: 'Invalid response from server'
            }
        }

        if (!response.ok) {
            return {
                success: false,
                error: result.error || `HTTP status error : ${response.status}`
            }
        }

        return {
            success: true
        }
    } catch (error) {
        console.error('Error in DeleteCategory : ', error);
        return {
            success: false,
            error: 'Gagal menghapus kategori'
        }
    }
}