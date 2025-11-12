import { GetCategory } from "@/app/queries/categoryquery";
import { CategoryTable } from "./table";
import { Suspense } from "react";

export default async function CategoryPage(){
    // jangan di await kalau mau dipakai di client server
    const category = GetCategory();
    return(
        <main className="py-4 px-8">
            <Suspense fallback="Loading ...">
                <CategoryTable categoryPromise={category}/>
            </Suspense>
        </main>
    )
}