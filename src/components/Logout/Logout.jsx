"use client";

import { logout } from "@/redux-toolkit/features/slices/authSlice/authSlice";
import { useLogoutUserMutation } from "@/redux-toolkit/services/UserAuthApi/UserAuthApi";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { SuccessMessage } from "../Common/ToastMessage/ToastMessage";

export default function Logout() {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [LogoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      const results = await LogoutUser().unwrap();
      dispatch(logout());
      if (results?.success) {
        push("/login");
        SuccessMessage(results?.message);
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <button
        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
        onClick={handleLogout}
      >
        <LogOut size={16} /> Logout
      </button>
    </>
  );
}
