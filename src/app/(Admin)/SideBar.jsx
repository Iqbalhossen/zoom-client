"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Box, ShoppingCart, X } from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: <Home size={18} /> },
  { name: "Category", href: "/admin/category/view", icon: <Home size={18} /> },
  { name: "Users", href: "/admin/users", icon: <Users size={18} /> },
  { name: "Products", href: "/admin/products", icon: <Box size={18} /> },
  { name: "Orders", href: "/admin/orders", icon: <ShoppingCart size={18} /> },
];

export default function SideBar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef();

  // Outside click for mobile sidebar
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    }

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 768) && (
          <motion.div
            ref={sidebarRef}
            className="fixed md:relative z-50 w-64 bg-white shadow-lg flex flex-col h-full"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-16 flex items-center justify-between border-b px-4">
              <h1 className="text-xl font-bold">MyAdmin</h1>
              <button
                className="md:hidden p-2 rounded hover:bg-gray-200"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
            <ul className="flex-1 p-4 space-y-2 min-h-screen">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-600 hover:text-white ${
                      pathname === item.href
                        ? "bg-indigo-600 text-white"
                        : "text-gray-700"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.icon} {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
