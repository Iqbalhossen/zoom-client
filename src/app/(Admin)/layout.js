"use client";
import "./admin-globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Box,
  ShoppingCart,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Providers from "@/redux-toolkit/provider";
import AdminProtectedRoute from "@/components/Admin/AdminProtectedRoute/AdminProtectedRoute";
import Logout from "@/components/Logout/Logout";
import Image from "next/image";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: <Home size={18} /> },
  { name: "Category", href: "/admin/category/view", icon: <Home size={18} /> },
  { name: "Products", href: "/admin/products/view", icon: <Box size={18} /> },
  { name: "Users", href: "/admin/users", icon: <Users size={18} /> },
  { name: "Orders", href: "/admin/orders", icon: <ShoppingCart size={18} /> },
];

// export const metadata = {
//   title: "Admin",
//   description: "Admin",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
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

  const [isClient, setIsClient] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setIsClient(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <AdminProtectedRoute>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />

            <div className="flex min-h-screen bg-gray-100">
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
                {isClient && (sidebarOpen || windowWidth >= 768) && (
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

              {/* Main Content */}
              <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <div className="h-16 bg-white flex items-center justify-between px-4 shadow">
                  {/* Hamburger + Logo */}
                  <div className="flex items-center gap-4">
                    <button
                      className="md:hidden p-2 rounded hover:bg-gray-200"
                      onClick={() => setSidebarOpen((prev) => !prev)}
                    >
                      <Menu size={24} />
                    </button>
                    {!sidebarOpen && (
                      <>
                        <div className="hidden sm:block">
                          <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Admin info */}
                  <div className="relative">
                    <Image
                      src="/profile.jpg"
                      alt="Admin"
                      className="w-10 h-10 rounded-full cursor-pointer"
                      onClick={() => setProfileOpen((prev) => !prev)}
                      width={50}
                      height={50}
                    />
                    <AnimatePresence>
                      {profileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg overflow-hidden z-50"
                        >
                          <Link
                            href="/admin/profile"
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                            onClick={() => setProfileOpen(false)}
                          >
                            <Settings size={16} /> Profile
                          </Link>
                          <Link
                            href="/admin/change-password"
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                            onClick={() => setProfileOpen(false)}
                          >
                            <Settings size={16} /> Change Password
                          </Link>
                           <Logout />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 overflow-auto">{children}</div>
              </div>
            </div>
          </AdminProtectedRoute>
        </Providers>
      </body>
    </html>
  );
}
