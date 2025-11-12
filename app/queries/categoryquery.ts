import { Category } from "../types/category";

export async function GetCategory(): Promise<Category[]>{
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const res = await fetch(`${baseUrl}/api/category`, {
        cache: 'no-store'
    });
    const pos = await res.json();

    return pos.data;
}