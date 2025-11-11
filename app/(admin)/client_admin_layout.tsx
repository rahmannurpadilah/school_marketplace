"use client";

import { 
    ArrowBigLeft, 
    ArrowBigRight, 
    Layers, 
    LayoutDashboard,
    Menu, 
    Package, 
    Users 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: "dashboard" },
    { name: "Users", href: "/admin/users", icon: "users" },
    { name: "Product Categories", href: "/admin/categories", icon: "categories" },
    { name: "Products", href: "/admin/products", icon: "products" },
];

export function AdminLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isSidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebarMobile = (): void => {
    setSidebarMobileOpen(!isSidebarMobileOpen);
  };

  const toggleSidebar = (): void => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <main>
      <div className="flex">
        {/* === Desktop Sidebar === */}
        <aside className={`w-[300px] ${isSidebarOpen ? "md:w-[300px]" : "md:w-[80px]"} h-screen md:block hidden shadow-xl shadow-text-primary rounded-tr-lg transition-all duration-300 ease-in-out`}>
          <div className={`pt-3 md:flex ${isSidebarOpen ? "justify-end" : "justify-center"} items-center px-2 pb-4 hidden`}>
            {isSidebarOpen && <span className="font-bold text-lg w-full text-center">Admin Menu</span>}
            {isSidebarOpen ? 
              <ArrowBigLeft onClick={toggleSidebar} className="cursor-pointer"/>
              : <ArrowBigRight onClick={toggleSidebar} className="cursor-pointer"/>
            }
          </div>
          <div className="bg-primary h-screen rounded-tr-lg border-t-3 border-border overflow-y-auto">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <div className={`flex gap-3 px-4 py-3 border-b border-border ${isSidebarOpen ? "justify-start" : "justify-center"} items-center 
                  ${pathname === item.href ? "bg-secondary cursor-auto text-white dark:text-black" : "hover:bg-secondary/50 hover:text-text-secondary delay-50 transition-all ease-in-out duration-200 cursor-pointer"}
                `}>
                  {item.icon === "dashboard" && <LayoutDashboard size={20} />}
                  {item.icon === "users" && <Users size={20} />}
                  {item.icon === "categories" && <Layers size={20} />}
                  {item.icon === "products" && <Package size={20} />}
                  <span className={`${isSidebarOpen ? "md:block" : "md:hidden"} block`}>
                    {item.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </aside>

        {/* === Mobile Sidebar === */}
        <div className="">
          {isSidebarMobileOpen && (
            <div 
              onClick={toggleSidebarMobile} 
              className="fixed inset-0 bg-text-primary/40 transition-opacity duration-300 z-40"
            ></div>
          )}
          <aside className={`fixed bg-background md:hidden top-0 left-0 w-[300px] h-screen rounded-tr-lg border-t-3 border-border 
            transition-transform duration-300 ease-in ${isSidebarMobileOpen ? "translate-x-0 shadow-xl shadow-text-primary" : "-translate-x-full"} z-50
          `}>
            <div className="pt-3 items-center px-2 pb-4 flex">
              <span className="font-bold text-lg w-full text-center">Admin Menu</span>
              <ArrowBigLeft onClick={toggleSidebarMobile} className="cursor-pointer" />
            </div>
            <div className="bg-primary h-screen rounded-tr-lg border-t-3 border-border overflow-y-auto">
              {menuItems.map((item, index) => (
                <Link 
                  key={index} 
                  href={item.href}
                  onClick={toggleSidebarMobile}
                >
                  <div className={`flex gap-3 px-4 py-3 border-b border-border items-center
                    ${pathname === item.href ? "bg-secondary cursor-auto text-white dark:text-black" : "hover:bg-secondary/50 hover:text-text-secondary delay-100 transition-all ease-in-out duration-200 cursor-pointer"} 
                  `}>
                    {item.icon === "dashboard" && <LayoutDashboard size={20} />}
                    {item.icon === "users" && <Users size={20} />}
                    {item.icon === "categories" && <Layers size={20} />}
                    {item.icon === "products" && <Package size={20} />}
                    <span>{item.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>

        <div className="w-full">
          {/* === Header === */}
          <header className="flex h-14 border-b border-border md:ml-4 items-center">
            <div className="block md:hidden ml-4">
              <Menu 
                onClick={toggleSidebarMobile} 
                className={`mt-2 cursor-pointer ${isSidebarMobileOpen ? "hidden" : "block"}`} 
              />
            </div>
            <div className="ml-4 md:ml-0">
              <h1 className="text-lg font-semibold">Admin Dashboard</h1>
            </div>
          </header>

          {/* === Content === */}
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}