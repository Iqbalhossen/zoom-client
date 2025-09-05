// components/ProductCard.js
"use client";
import { addToCart } from "@/redux-toolkit/features/slices/cartSlice/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name || product.title} added to cart! 🛒`);
  };

  return (
    <div className="border rounded-xl shadow hover:shadow-lg transition bg-white flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain p-4"
      />
      <div className="flex flex-col flex-grow px-4 pb-4">
        <h2 className="text-lg font-semibold line-clamp-2">{product.title}</h2>
        <p className="text-gray-600 text-sm mt-1 line-clamp-3">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xl font-bold text-blue-600">
            ${product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
