"use client";

import { useForgotPasswordMutation } from "@/redux-toolkit/services/UserAuthApi/UserAuthApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ForgotPage() {
  const { userInfo, token } = useSelector((state) => state.auth);
  const { push } = useRouter();

  useEffect(() => {
    if (userInfo && token) {
      push("/dashboard");
    }
  }, [userInfo]);

  const [ForgotPassword, { isLoading }] = useForgotPasswordMutation();

  const [errorMessage, setErrorMessage] = useState([]);

  const [data, setData] = useState([]);

  const handleSubmitData = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage([]);
      setData([]);
      const formData = new FormData(event.currentTarget);
      const InpuData = Object.fromEntries(formData);
      const results = await ForgotPassword(InpuData).unwrap();
      if (results?.success) {
        setData(results);
      }
    } catch (error) {
      if (!error?.data?.success) {
        setErrorMessage(error?.data?.errors);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Forgot</h2>
        {data?.message && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center mb-4"
            role="alert"
          >
            {data?.message}
          </div>
        )}

        {errorMessage?.message && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center mb-4"
            role="alert"
          >
            {errorMessage?.message}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmitData}>
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
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-60"
            >
              {isLoading ? "Loading..." : "Forgot"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          have an account?
          <Link href="/login" className="text-indigo-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
