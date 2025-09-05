"use client";

import UserProtectedRoute from "@/components/FrontEnd/UserProtectedRoute/UserProtectedRoute";

export default function MiddlewareProtectedRoute({ children }) {
  return (
    <>
      <UserProtectedRoute>{children}</UserProtectedRoute>
    </>
  );
}
