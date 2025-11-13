import { GetCategory } from "@/app/queries/category";
import { CategoryTable } from "./components/table";

export default async function CategoryPage(){
    // jangan di await kalau mau dipakai di client server
    const category = GetCategory();
    
    return(
        <main className="py-4 px-8">
            {/* <CategoryTable categoryPromise={category}/> */}
            <CategoryTable categoryPromise={category}/>
        </main>
    )
}