"use client";
import { useStoreCategoryMutation } from "@/redux-toolkit/services/Admin/AdminCategoryApi/AdminCategoryApi";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddCategory({ setIsOpen }) {
  const [StoreCategoryData, { isLoading }] = useStoreCategoryMutation();
  const [errorMessage, setErrorMessage] = useState([]);

  const handleSubmitData = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage([]);
      const formData = new FormData(event.currentTarget);
      const InpuData = Object.fromEntries(formData);
      const results = await StoreCategoryData(InpuData).unwrap();
      if (results?.success) {
        setIsOpen(false);
        toast.success(`${results?.message}`, { autoClose: 5000 });
        event.target.reset();
      }
    } catch (error) {
      if (!error?.data?.success) {
        setErrorMessage(error?.data?.errors);
      }
    }
  };

  return (
    <>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        onClick={() => setIsOpen(false)}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-xl p-6 w-96"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold mb-4">Category add</h2>

          <div>
            <form className="space-y-6" onSubmit={handleSubmitData}>
              {/* Name & Slug */}
              <div className="py-5 gap-4">
                <div>
                  <label className="block mb-1 font-medium">
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                {errorMessage?.name && (
                  <div className="text-red-500 text-sm mt-1">
                    <span>{errorMessage?.name?.msg}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <p
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 cursor-pointer"
                >
                  Close
                </p>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                        <span>Loading</span>
                      </div>
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
