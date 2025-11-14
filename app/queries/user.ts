import { USER } from "../types/user";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!baseUrl) {
    throw new Error('Url tidak ditemukan');
}

export async function GetUser(): Promise<{ success: boolean; data?: USER[]; error?: string }>{
    try {
        const response = await fetch(`${baseUrl}/api/user`, {
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
        console.error('Error in Getuser: ', error);
        return {
            success: true,
            error: 'Gagal mendapatkan user'
        }
    }
}