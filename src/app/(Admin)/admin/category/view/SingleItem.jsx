import Link from "next/link";
import React from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import dateFormat from "dateformat";
const SingleItem = ({ data, handleDelete, updateCategory }) => {
  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">{data?.name}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          {dateFormat(data?.createdAt, "dddd, mmmm dd - yyyy")}
        </td>

        <td className="px-6 py-4 whitespace-nowrap text-right">
          <button
            className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 mr-2 cursor-pointer"
            onClick={() => updateCategory(data?._id)}
          >
            <Edit size={16} /> Edit
          </button>
          <button
            className="inline-flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
            onClick={() => handleDelete(data?._id)}
          >
            <Trash2 size={16} /> Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default SingleItem;
