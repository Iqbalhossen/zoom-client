"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux-toolkit/features/slices/cartSlice/cartSlice";
import { toast } from "react-toastify";

const products = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: `Cool Sneakers ${i + 1}`,
  category: "Men's Shoes",
  price: 120,
  discountPrice: 89.99,
  frontImage:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRue2sWNCwaJd-yZ4TzMKHsNRqoDIQwz3azYA&s",
  backImage:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSreAlx8vw_nSEP7lJzvHzk__lcXehVxw02kQ&s",
  rating: 4,
  reviews: 120,
}));

export default function ProductGrid() {
  return (
    <div className="p-4 bg-gray-50 min-h-screen px-18">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const [hover, setHover] = useState(false);

    const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name || product.title} added to cart! 🛒`);
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={{ scale: 1.05, y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full h-48 bg-gray-100 overflow-hidden">
        <motion.img
          src={hover ? product.backImage : product.frontImage}
          alt={product.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: hover ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>

        <div className="flex items-center mt-2">
          <span className="text-yellow-400">
            {"★".repeat(product.rating)}
            {"☆".repeat(5 - product.rating)}
          </span>
          <span className="ml-2 text-sm text-gray-600">
            ({product.reviews})
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-red-600 mr-2">
              ${product.discountPrice}
            </span>
            <span className="text-gray-400 line-through">${product.price}</span>
          </div>

          <button className="bg-indigo-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-indigo-700"  onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
