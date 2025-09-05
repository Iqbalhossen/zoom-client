import React from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import Image from "next/image";
const SingleItem = ({ data, handleDelete, HandleActiveInactive, HandleStock }) => {
  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${data?.images[0]}`}
            alt={data.name}
            className="w-12 h-12 rounded-lg object-cover"
            width={50}
            height={50}
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{data?.name}</td>
        <td className="px-6 py-4 whitespace-nowrap">${data?.price}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          {data?.stock ? (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              In Stock
            </span>
          ) : (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
              Out of Stock
            </span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {data?.status ? (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
              Active
            </span>
          ) : (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
              Inactive
            </span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right">
          <button className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 mr-2 cursor-pointer" onClick={()=>HandleStock(data?._id)}>
             {data?.stock ? "out of stock" : "In stock"}
          </button>
          <button className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 mr-2 cursor-pointer " onClick={()=>HandleActiveInactive(data?._id)}>
            {data?.status ? "Inactive" : "active"}
          </button>
          <button className="inline-flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer" onClick={()=>handleDelete(data?._id)}>
            <Trash2 size={16} /> Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default SingleItem;
