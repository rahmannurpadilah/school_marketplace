import { GetUser } from "@/app/queries/user";
import { UserTable } from "./components/table";


export default async function UsersPage() {
    const user = GetUser();
    
    return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary">Users Management</h2>
        <p className="text-sm text-text-primary/60 mt-1">Kelola data pengguna dan member</p>
      </div>

      <div className="bg-primary rounded-lg shadow-md border border-border p-6">
        <UserTable userPromise={user}/>
      </div>
    </div>
  );
}