"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ProductDetailsPage() {
  const product = {
    id: 1,
    name: "Cool Sneakers",
    category: "Men's Shoes",
    price: 120,
    discountPrice: 89.99,
    description: "High-quality sneakers perfect for daily wear.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRue2sWNCwaJd-yZ4TzMKHsNRqoDIQwz3azYA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSreAlx8vw_nSEP7lJzvHzk__lcXehVxw02kQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRue2sWNCwaJd-yZ4TzMKHsNRqoDIQwz3azYA&s",
    ],
    options: ["Red", "Blue", "Black"],
  };

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedOption, setSelectedOption] = useState(product.options[0]);

  // Comment & Rating
  const [userRating, setUserRating] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleAddToCart = () => setAddedToCart(true);

  const handleSubmitComment = () => {
    if (userRating === 0 || commentText.trim() === "") return;
    setComments([...comments, { rating: userRating, text: commentText }]);
    setUserRating(0);
    setCommentText("");
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col lg:flex-row gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Product Images */}
        <motion.div className="w-full lg:w-1/2" whileHover={{ scale: 1.02 }}>
          <motion.div
            className="bg-gray-100 rounded-2xl overflow-hidden mb-4"
            layout
          >
            <motion.img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover transition duration-300"
              layout
            />
          </motion.div>
          <div className="flex gap-2 mb-4">
            {product.images.map((img, idx) => (
              <motion.img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === img ? "border-indigo-600" : "border-gray-200"
                }`}
                onClick={() => setMainImage(img)}
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col justify-between"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.h1 className="text-2xl font-bold mb-2" layout>
              {product.name}
            </motion.h1>
            <motion.p className="text-gray-500 mb-4" layout>
              {product.category}
            </motion.p>

            <motion.div className="mb-4" layout>
              <span className="text-lg font-bold text-red-600 mr-2">
                ${product.discountPrice}
              </span>
              <span className="text-gray-400 line-through">
                ${product.price}
              </span>
            </motion.div>

            <motion.p className="text-gray-700 mb-6" layout>
              {product.description}
            </motion.p>

            {/* Options */}
            <div className="mb-6">
              <p className="mb-2 font-medium">Options:</p>
              <div className="flex gap-2">
                {product.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setSelectedOption(opt)}
                    className={`px-3 py-1 border rounded-lg ${
                      selectedOption === opt
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-6">
              <motion.button
                onClick={handleDecrease}
                className="px-3 py-1 border rounded-lg hover:bg-gray-200"
                whileTap={{ scale: 0.95 }}
              >
                -
              </motion.button>
              <span className="text-lg font-medium">{quantity}</span>
              <motion.button
                onClick={handleIncrease}
                className="px-3 py-1 border rounded-lg hover:bg-gray-200"
                whileTap={{ scale: 0.95 }}
              >
                +
              </motion.button>
            </div>

            {/* Add/View Cart */}
            <motion.button
              onClick={handleAddToCart}
              className={`w-full py-2 rounded-lg text-white font-medium ${
                addedToCart
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {addedToCart ? "View Cart" : "Add to Cart"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Comment & Rating Section */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

        {/* Add Comment */}
        <motion.div className="mb-6" layout>
          <p className="font-medium mb-2">Your Rating:</p>
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <motion.span
                key={num}
                onClick={() => setUserRating(num)}
                className={`cursor-pointer text-2xl ${
                  userRating >= num ? "text-yellow-400" : "text-gray-300"
                }`}
                whileTap={{ scale: 1.2 }}
              >
                ★
              </motion.span>
            ))}
          </div>
          <textarea
            className="w-full border rounded-lg p-2 mb-2"
            rows={3}
            placeholder="Write your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <motion.button
            onClick={handleSubmitComment}
            className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>
        </motion.div>

        {/* Show Comments */}
        <div className="space-y-4">
          {comments.length === 0 && (
            <p className="text-gray-500">No reviews yet.</p>
          )}
          {comments.map((c, idx) => (
            <motion.div
              key={idx}
              className="border p-3 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-1">
                <span className="text-yellow-400">
                  {"★".repeat(c.rating)}
                  {"☆".repeat(5 - c.rating)}
                </span>
              </div>
              <p>{c.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
