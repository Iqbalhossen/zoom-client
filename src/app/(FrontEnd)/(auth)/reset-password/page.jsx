"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useForgotPasswordTokenVerifyQuery,
  useResetPasswordMutation,
} from "@/redux-toolkit/services/UserAuthApi/UserAuthApi";

import { Suspense } from "react";
import { SuccessMessage } from "@/components/Common/ToastMessage/ToastMessage";
import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<></>}>
      <ResetPasswordContent />
    </Suspense>
  );
}

function ResetPasswordContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { push } = useRouter();

  const searchQueryParams = useSearchParams();
  const token = searchQueryParams.get("token");

  const { data, error, isLoading, isFetching } =
    useForgotPasswordTokenVerifyQuery(token);

  const [ResetPassword, { isLoading: btnIsLoading }] =
    useResetPasswordMutation();

  const [errorMessage, setErrorMessage] = useState([]);

  const [passwordUpdateData, setPasswordUpdateData] = useState([]);

  const handleSubmitData = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage([]);
      const formData = new FormData(event.currentTarget);
      const InpuData = Object.fromEntries(formData);
      const results = await ResetPassword({ ...InpuData, token }).unwrap();
      if (results?.success) {
        // setPasswordUpdateData(results);
        push("/login");
        SuccessMessage(results?.message);
      }
    } catch (error) {
      if (!error?.data?.success) {
        setErrorMessage(error?.data?.errors);
      }
    }
  };

  if (isLoading) {
    return;
  }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Reset Password
          </h1>

          {data?.success && data?.data?.resetPasswordToken ? (
            <>
              {errorMessage?.message && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center"
                  role="alert"
                >
                  {errorMessage?.message}
                </div>
              )}

              {passwordUpdateData?.message && (
                <div
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center"
                  role="alert"
                >
                  {passwordUpdateData?.message}
                </div>
              )}

              <form onSubmit={handleSubmitData} className="space-y-4">
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
                  <label className="block text-sm mb-1">
                    Enter New Password
                  </label>
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
                  <button
                    type="submit"
                    disabled={btnIsLoading}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-60"
                  >
                    {btnIsLoading ? "Loading..." : "Reset"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="auth-section  flex items-center justify-center">
                Expired token
              </div>
            </>
          )}

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
