"use client";

import { setCredentials } from "@/redux-toolkit/features/slices/authSlice/authSlice";
import { useRegisterUserMutation } from "@/redux-toolkit/services/UserAuthApi/UserAuthApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function UserSignupPage() {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  function handlePhotoChange(e) {
    setErrorMessage([]);
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      return;
    }
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  }

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage([]);

      const formData = new FormData(e.currentTarget);
      const InpuData = Object.fromEntries(formData);
      if (photo) formData.append("image", photo);
      // if (!photo)
      //   return setErrorMessage({ message: "Photo field is required" });

      const results = await registerUser(formData).unwrap();

      if (results?.success) {
        dispatch(
          setCredentials({
            userData: results?.data,
            userToken: results.token,
          })
        );

        push("/user/dashboard");
        SuccessMessage(results?.message);
      }
    } catch (err) {
      // console.error(err);
      setErrorMessage(err?.data?.errors);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Create Account
          </h1>

          {/* {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 p-2 rounded">
            {error}
          </div>
        )} */}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Your full name"
                name="full_name"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
              {errorMessage?.full_name && (
                <div className="text-red-500 text-sm mt-1">
                  <span>{errorMessage?.full_name?.msg}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
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
                  placeholder="At least 6 characters"
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

            <div>
              <label className="block text-sm mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  name="cpassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errorMessage?.cpassword && (
                <div className="text-red-500 text-sm mt-1">
                  <span>{errorMessage?.cpassword?.msg}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full"
              />
              {errorMessage?.message && (
                <div className="text-red-500 text-sm mt-1">
                  <span>{errorMessage?.message}</span>
                </div>
              )}
              {preview && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-2">Preview:</p>
                  <img
                    src={preview}
                    alt="preview"
                    className="w-28 h-28 object-cover rounded-full"
                  />
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-60"
              >
                {isLoading ? "Loading..." : "Signup"}
              </button>
            </div>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?
            <Link href="/login" className="text-indigo-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
