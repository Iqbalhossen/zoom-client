"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import {
  useActiveInactiveProductMutation,
  useDeleteProductMutation,
  useGetProductQuery,
  useStockProductMutation,
} from "@/redux-toolkit/services/Admin/AdminProductApi/AdminProductApi";
import { useRouter, useSearchParams } from "next/navigation";
import CustomLoader from "@/components/Admin/CustomLoader/CustomLoader";
import SingleItem from "./SingleItem";
import { DeleteConfirmFun, DeleteConfirmResults } from "@/components/Common/DeleteConfirmBtn/DeleteConfirmBtn";
import { toast } from "react-toastify";

export default function ProductsViewPage() {
  const router = useRouter();

  const searchQueryParams = useSearchParams();
  const page = searchQueryParams.get("page") || 1;

  const {
    data: ProductData,
    error,
    isLoading,
    isFetching,
  } = useGetProductQuery(page);

  const [DeleteProduct, { isLoading: DeleteisLoading }] =
    useDeleteProductMutation();

  const handleDelete = async (id) => {
    try {
      const DeleteConfirm = await DeleteConfirmFun();
      if (DeleteConfirm?.isConfirmed) {
        await DeleteProduct(id).unwrap();
      }
      DeleteConfirmResults(DeleteConfirm);
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

    const [ActiveInactiveProduct] =
    useActiveInactiveProductMutation();

  const HandleActiveInactive = async(id)=>{
   const results =  await ActiveInactiveProduct(id).unwrap();
   if(results?.success){
    toast.success(results?.message );
   }
  }

    const [StockProduct] =
    useStockProductMutation();

  const HandleStock = async(id)=>{
   const results =  await StockProduct(id).unwrap();
   if(results?.success){
    toast.success(results?.message );
   }
  }

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
    <div className="p-1">
      {/* Header: Title + Button */}
      <div className="flex items-center justify-between mb-6">
        <motion.h2
          className="text-2xl font-bold text-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Product Lists
        </motion.h2>
        <Link href="/admin/products/store">
          <motion.p
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Plus size={16} />
            Add Product
          </motion.p>
        </Link>
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
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* {(isFetching || DeleteisLoading) && (
                <>
                  <CustomLoader />
                </>
              )} */}
            {ProductData?.data?.length ? (
              ProductData.data.map((item, index) => (
                <SingleItem
                  key={item._id}
                  data={item}
                  index={index}
                  paginateData={ProductData}
                  handleDelete={handleDelete}
                  HandleActiveInactive={HandleActiveInactive}
                  HandleStock={HandleStock}
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
      </motion.div>
    </div>
  );
}
