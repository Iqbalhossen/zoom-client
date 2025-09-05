"use client";
import { Settings, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logout from "@/components/Logout/Logout";
const Header = () => {
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

  return (
    <>
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
          <img
            src="/profile.jpg"
            alt="Admin"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setProfileOpen((prev) => !prev)}
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
    </>
  );
};
export default Header;
