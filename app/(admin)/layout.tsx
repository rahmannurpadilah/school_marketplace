"use client";

import { ArrowBigLeft, ArrowBigRight, Layers, LayoutDashboard, Menu, Package, User, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  const [IsSidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [IsSidebarOpen, setSidebarOpen] = useState(true);

  const SidebarOpen = (): void=> {
    setSidebarOpen(!IsSidebarOpen);
  }

  const SidebarMobileOpen = (): void=> {
    setSidebarMobileOpen(!IsSidebarMobileOpen);
  }

  const pathname = usePathname();

  const MenuItem = [
    {name: "Dashboard", href: "/admin/dashboard", icon: "dashboard"},
    {name: "Users", href: "/admin/users", icon: "users"},
    {name: "Product Categories", href: "/admin/product-categories", icon: "categories"},
    {name: "Products", href: "/admin/products", icon: "products"},
  ];

  return (
    <main>
      <div className="flex">
        {/* === Dekstop Sidebar === */}
        <aside className={`w-[300px] ${IsSidebarOpen ? "md:w-[300px]" : "md:w-[80]"} h-screen md:block hidden shadow-xl shadow-text-primary rounded-tr-lg transition-all duration-300 ease-in-out`}>
          <div className={`pt-3 md:flex ${IsSidebarOpen ? "justify-end" : "justify-center"} items-center px-2 pb-4 hidden`}>
            {IsSidebarOpen && <span className="font-bold text-lg w-full text-center">Admin Menu</span>}
            {IsSidebarOpen ? 
              <ArrowBigLeft onClick={SidebarOpen} className="cursor-pointer"/>
              : <ArrowBigRight onClick={SidebarOpen} className="cursor-pointer"/>
            }
          </div>
          <div className={`bg-primary h-screen rounded-tr-lg border-t-3 border-border overflow-y-auto`}>
            {MenuItem.map((item, index) => (
              <Link key={index} href={item.href}>
                <div className={`flex gap-3 px-4 py-3 border-b border-border ${IsSidebarOpen ? "justify-start" : "justify-center"} items-center 
                    ${pathname === item.href ? "bg-secondary cursor-auto" : "hover:bg-secondary/50 hover:text-text-secondary delay-50 transition-all ease-in-out duration-200 cursor-pointer"}
                  `}>
                  {item.icon === "dashboard" && <LayoutDashboard />}
                  {item.icon === "users" && <Users />}
                  {item.icon === "categories" && <Layers />}
                  {item.icon === "products" && <Package />}
                  <span className={`${IsSidebarOpen ? "md:block" : "md:hidden"} block`}>
                    {item.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </aside>

        {/* === Mobile Sidebar === */}
        {IsSidebarMobileOpen && (
          <div onClick={SidebarMobileOpen} className="fixed inset-0 bg-text-primary/40 transition-opacity duration-300 z-40"></div>
        )}

        <aside className={`fixed bg-background md:hidden top-0 left-0 w-[300px] h-screen rounded-tr-lg border-t-3 border-border 
            transition-transform duration-300 ease-in ${IsSidebarMobileOpen ? "translate-x-0 shadow-xl shadow-text-primary" : "-translate-x-full"} z-50
          `}>
            <div className={`pt-3 items-center px-2 pb-4 flex`}>
              <span className="font-bold text-lg w-full text-center">Admin Menu</span>
              <ArrowBigLeft onClick={SidebarMobileOpen} className="cursor-pointer" />
          </div>
          <div className={`bg-primary h-screen rounded-tr-lg border-t-3 border-border overflow-y-auto`}>
            {MenuItem.map((item, index) => (
              <Link key={index} href={item.href} className={`flex gap-3 px-4 py-3 border-b border-border items-center
                ${pathname === item.href ? "bg-secondary cursor-auto" : "hover:bg-secondary/50 hover:text-text-secondary delay-100 transition-all ease-in-out duration-200 cursor-pointer"} 
              `}>
                {item.icon === "dashboard" && <LayoutDashboard />}
                {item.icon === "users" && <Users />}
                {item.icon === "categories" && <Layers />}
                {item.icon === "products" && <Package />}
                <aside>
                  {item.name}
                </aside>
              </Link>
            ))}
          </div>
        </aside>
        <div className="w-full">
          <header className="flex h-14 border-b border-border md:ml-4 items-center">
            <div className="block md:hidden ml-4">
              <Menu onClick={SidebarMobileOpen} className={`mt-2 cursor-pointer ${IsSidebarMobileOpen ? "hidden" : "block"}`} />
            </div>
            
          </header>
          {children}
        </div>
      </div>
    </main>
  );
}