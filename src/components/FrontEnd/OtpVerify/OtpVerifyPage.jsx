"use client";
import { useState } from "react";

export default function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return; // শুধুমাত্র digit
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // next input এ focus
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("OTP Submitted:", otpCode);
    // এখানে API call করবে
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">OTP Verification</h2>
        <p className="text-gray-500 text-center mb-6">
          Enter the 6-digit code sent to your phone/email
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-6">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                className="w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Verify OTP
          </button>
          <p className="text-center text-gray-400 mt-4 text-sm">
            Didn't receive code?{" "}
            <span className="text-indigo-600 cursor-pointer hover:underline">
              Resend
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
