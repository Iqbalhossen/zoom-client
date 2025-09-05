"use client";
import { SuccessMessage } from "@/components/Common/ToastMessage/ToastMessage";
import {
  fetchAuthData,
  setCredentials,
} from "@/redux-toolkit/features/slices/authSlice/authSlice";
import { useLoginUserMutation } from "@/redux-toolkit/services/UserAuthApi/UserAuthApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [LoginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const { AuthInfo, token, isAuthenticated, AuthData, isAuthLoading } =
    useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAuthData());
  }, [dispatch]);

  const { push } = useRouter();
  useEffect(() => {
    if (!isAuthLoading) {
      if (AuthData?.role === "admin") {
        if (AuthInfo && token && isAuthenticated) {
          push("/admin/dashboard");
        }
      } else if (AuthData?.role === "user") {
        if (AuthInfo && token && isAuthenticated) {
          push("/user/dashboard");
        }
      }
    }
  }, [AuthInfo, token, isAuthenticated, AuthData, isAuthLoading, push]);

  const [errorMessage, setErrorMessage] = useState([]);

  const handleSubmitData = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage([]);
      const formData = new FormData(event.currentTarget);
      const InpuData = Object.fromEntries(formData);
      const results = await LoginUser(InpuData).unwrap();
      if (results?.data) {
        dispatch(
          setCredentials({
            userData: results?.data,
            userToken: results.token,
          })
        );
        if (results?.role === "admin") {
          push("/admin/dashboard");
          SuccessMessage("admin login successfully");
        }

        if (results?.role === "user") {
          push("/user/dashboard");
          SuccessMessage("User login successfully");
        }
      }
    } catch (error) {
      console.log(error);
      if (!error?.data?.success) {
        setErrorMessage(error?.data?.errors);
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Welcome back
        </h2>

        {errorMessage?.message && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 p-2 rounded text-center">
            {errorMessage?.message}
          </div>
        )}

        <form onSubmit={handleSubmitData} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
            {errorMessage?.email && (
              <div className="text-red-500 text-sm mt-1">
                <span>{errorMessage?.email?.msg}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errorMessage?.password && (
              <div className="text-red-500 text-sm mt-1">
                <span>{errorMessage?.password?.msg}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="mr-2"
              />
              Remember me
            </label>

            <Link href="/forgot-password" className="text-sm text-indigo-600">
              Forgot password?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link href="/sign-up" className="text-indigo-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
