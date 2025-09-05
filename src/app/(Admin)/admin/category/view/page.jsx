"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash2, Plus } from "lucide-react";
import AddCategory from "@/components/Admin/Category/AddCategory";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "@/redux-toolkit/services/Admin/AdminCategoryApi/AdminCategoryApi";
import CustomLoader from "@/components/Admin/CustomLoader/CustomLoader";
import SingleItem from "./SingleItem";
import CustomPagination from "@/components/CustomPagination/CustomPagination";
import {
  DeleteConfirmFun,
  DeleteConfirmResults,
} from "@/components/Common/DeleteConfirmBtn/DeleteConfirmBtn";
import UpdateCategory from "@/components/Admin/Category/UpdateCategory";

export default function CategoryView() {
  const router = useRouter();

  const searchQueryParams = useSearchParams();
  const page = searchQueryParams.get("page") || 1;

  const {
    data: CategoryData,
    error,
    isLoading,
    isFetching,
  } = useGetCategoryQuery(page);

  const [DeleteCategory, { isLoading: DeleteisLoading }] =
    useDeleteCategoryMutation();

  const handleDelete = async (id) => {
    try {
      const DeleteConfirm = await DeleteConfirmFun();
      if (DeleteConfirm?.isConfirmed) {
        await DeleteCategory(id).unwrap();
      }
      DeleteConfirmResults(DeleteConfirm);
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const updateCategory = (id) => {
    setIsUpdateModalOpen(true);
    setUpdateId(id);
  };

  if (isLoading) {
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
    <>
      <div className="p-1">
        <div className="flex items-center justify-between mb-6">
          <motion.h2
            className="text-2xl font-bold text-gray-800"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Category Lists
          </motion.h2>
          <motion.button
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => setIsOpen(true)}
          >
            <Plus size={16} />
            Add Category
          </motion.button>
        </div>

        {/* Table */}
        <motion.div
          className="bg-white shadow-lg rounded-lg overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  created At
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(isFetching || DeleteisLoading) && (
                <>
                  <CustomLoader />
                </>
              )}
              {CategoryData?.data?.length ? (
                CategoryData.data.map((item, index) => (
                  <SingleItem
                    key={item._id}
                    data={item}
                    index={index}
                    paginateData={CategoryData}
                    handleDelete={handleDelete}
                    updateCategory={updateCategory}
                  />
                ))
              ) : (
                <tr>
                  <td className="text-muted text-center" colSpan="100%">
                    Data not found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* paginateLinks */}
          <CustomPagination data={CategoryData}></CustomPagination>
          {/* paginateLinks */}
        </motion.div>
      </div>

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <AnimatePresence>
          {isOpen && <AddCategory setIsOpen={setIsOpen} />}
        </AnimatePresence>

        <AnimatePresence>
          {isUpdateModalOpen && (
            <UpdateCategory
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              categoryId={updateId}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
