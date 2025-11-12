import { GET } from "@/app/api/category/route";
import { CategoryTable } from "./table";
import { Category } from '@prisma/client';

type GET = {
    id: string;
    category_name: string;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

async function GetPost(): Promise<GET[]>{
    const res = await fetch(`${baseUrl}/api/category`);
    const pos = await res.json();

    return pos;
}
export default async function CategoryPage(){
    const get = await GetPost();
    return(
        <main className="py-4 px-8">
            {get.map((item) => (
                <ul key={item.id}>
                    <li>{item.category_name}</li>
                </ul>
            ))}
        </main>
    )
}