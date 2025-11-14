"use client";

import { 
    ArrowBigLeft, 
    ArrowBigRight, 
    Layers, 
    LayoutDashboard,
    Menu, 
    Package, 
    Users,
    X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";


const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: "dashboard" },
    { name: "Members", href: "/admin/members", icon: "users" },
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
    <main className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* === Desktop Sidebar === */}
        <aside className={`${isSidebarOpen ? "w-[280px]" : "w-[80px]"} md:flex hidden flex-col bg-primary border-r border-border transition-all duration-300 ease-in-out`}>
          {/* Sidebar Header */}
          <div className={`h-16 flex items-center ${isSidebarOpen ? "justify-between px-6" : "justify-center"} border-b border-border bg-background/50`}>
            {isSidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <LayoutDashboard size={18} className="text-white dark:text-black" />
                </div>
                <span className="font-bold text-lg text-text-primary">Admin Panel</span>
              </div>
            )}
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-background transition-colors"
            >
              {isSidebarOpen ? 
                <ArrowBigLeft size={20} className="text-text-primary"/>
                : <ArrowBigRight size={20} className="text-text-primary"/>
              }
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <div className={`
                  flex items-center gap-3 mx-2 mb-1 px-4 py-3 rounded-lg
                  ${isSidebarOpen ? "justify-start" : "justify-center"}
                  ${pathname === item.href 
                    ? "bg-secondary text-white dark:text-black shadow-sm" 
                    : "text-text-primary hover:bg-secondary/10 hover:text-secondary"
                  }
                  transition-all duration-200 cursor-pointer
                `}>
                  {item.icon === "dashboard" && <LayoutDashboard size={20} />}
                  {item.icon === "users" && <Users size={20} />}
                  {item.icon === "categories" && <Layers size={20} />}
                  {item.icon === "products" && <Package size={20} />}
                  {isSidebarOpen && (
                    <span className="font-medium text-sm">
                      {item.name}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer */}
          {isSidebarOpen && (
            <div className="p-4 border-t border-border">
              <div className="text-xs text-text-primary/60 text-center">
                © 2024 Admin Panel
              </div>
            </div>
          )}
        </aside>

        {/* === Mobile Sidebar Overlay === */}
        {isSidebarMobileOpen && (
          <div 
            onClick={toggleSidebarMobile} 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40 md:hidden"
          />
        )}

        {/* === Mobile Sidebar === */}
        <aside className={`
          fixed md:hidden top-0 left-0 w-[280px] h-screen bg-primary border-r border-border
          transition-transform duration-300 ease-in-out z-50
          ${isSidebarMobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          {/* Mobile Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-border bg-background/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                <LayoutDashboard size={18} className="text-white dark:text-black" />
              </div>
              <span className="font-bold text-lg text-text-primary">Admin Panel</span>
            </div>
            <button 
              onClick={toggleSidebarMobile}
              className="p-2 rounded-lg hover:bg-background transition-colors"
            >
              <X size={20} className="text-text-primary" />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <nav className="overflow-y-auto py-4">
            {menuItems.map((item, index) => (
              <Link 
                key={index} 
                href={item.href}
                onClick={toggleSidebarMobile}
              >
                <div className={`
                  flex items-center gap-3 mx-2 mb-1 px-4 py-3 rounded-lg
                  ${pathname === item.href 
                    ? "bg-secondary text-white dark:text-black shadow-sm" 
                    : "text-text-primary hover:bg-secondary/10 hover:text-secondary"
                  }
                  transition-all duration-200 cursor-pointer
                `}>
                  {item.icon === "dashboard" && <LayoutDashboard size={20} />}
                  {item.icon === "users" && <Users size={20} />}
                  {item.icon === "categories" && <Layers size={20} />}
                  {item.icon === "products" && <Package size={20} />}
                  <span className="font-medium text-sm">{item.name}</span>
                </div>
              </Link>
            ))}
          </nav>
        </aside>

        {/* === Main Content Area === */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* === Header === */}
          <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-background/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleSidebarMobile}
                className="md:hidden p-2 rounded-lg hover:bg-primary transition-colors"
              >
                <Menu size={20} className="text-text-primary" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-text-primary">
                  {menuItems.find(item => item.href === pathname)?.name || "Admin Dashboard"}
                </h1>
                <p className="text-xs text-text-primary/60">
                  Manage your application
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              {/* You can add user profile, notifications, etc here */}
            </div>
          </header>

          {/* === Content Area === */}
          <main className="flex-1 overflow-y-auto bg-background p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </main>
  );
}