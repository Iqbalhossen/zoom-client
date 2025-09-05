"use client";
import { useSelector } from "react-redux";
import Logout from "@/components/Logout/Logout";

export default function UserDashboard() {
  const { AuthData, isAuthLoading } = useSelector((state) => state.auth);

  if (isAuthLoading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen gap-2">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <p className="text-gray-600 mb-6">
            Welcome, {AuthData?.full_name || "User"}
          </p>
          <nav className="space-y-2">
            <button className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200">
              Profile
            </button>
            <button className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200">
              Orders
            </button>
            <button className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200">
              Wishlist
            </button>

            <Logout />
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-gray-600">
            Here’s what’s happening with your account.
          </p>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4">Order ID</th>
                <th className="py-2 px-4">Product</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Dummy orders */}
              {[1, 2, 3].map((order) => (
                <tr key={order} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">#{1000 + order}</td>
                  <td className="py-2 px-4">Cool Sneakers {order}</td>
                  <td className="py-2 px-4">${120 + order * 5}</td>
                  <td className="py-2 px-4">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-sm">
                      Delivered
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
