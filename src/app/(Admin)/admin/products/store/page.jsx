"use client";
import { useRef, useState } from "react";
import { easeOut, motion } from "framer-motion";
import JoditEditor from "jodit-react";
import { useStoreProductMutation } from "@/redux-toolkit/services/Admin/AdminProductApi/AdminProductApi";
import { useGetAllCategoryQuery } from "@/redux-toolkit/services/Admin/AdminCategoryApi/AdminCategoryApi";
import { toast } from "react-toastify";

export default function ProductStorePage() {
  const {
    data: CategoryData,
    error,
    isLoading: categoryLoading,
  } = useGetAllCategoryQuery();

  const DisRef = useRef(null);
  const [Dis, setDisContent] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: [],
    price: "",
    discount: "",
    stock: true,
    status: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: [...files] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const [StoreProductData, { isLoading }] = useStoreProductMutation();
  const [errorMessage, setErrorMessage] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage([]);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("slug", formData.slug);
    form.append("price", formData.price);
    form.append("discount", formData.discount);
    form.append("stock", formData.stock);
    form.append("status", formData.status);
    form.append("description", Dis);
    form.append("categories", formData.categories || "");

    // Multiple images
    formData.image.forEach((file) => form.append("image", file));

    try {
      const results = await StoreProductData(form).unwrap();
      if (results?.success) {
        toast.success(results?.message, { autoClose: 5000 });
        setFormData({
          name: "",
          slug: "",
          image: [],
          price: "",
          discount: "",
          stock: true,
          status: true,
          categories: "",
        });
        setDisContent("");
      }
    } catch (error) {
      if (!error?.data?.success) {
        setErrorMessage(error?.data?.errors);
      }
    }
  };

  if (categoryLoading) {
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
    <div className="">
      <motion.div
        className=" mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errorMessage?.name && (
                <div className="text-red-500 text-sm mt-1">
                  <span>{errorMessage?.name?.msg}</span>
                </div>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errorMessage?.slug && (
                <div className="text-red-500 text-sm mt-1">
                  <span>{errorMessage?.slug?.msg}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* image */}
            <div>
              <label className="block mb-1 font-medium">image</label>
              <input
                type="file"
                name="image"
                multiple
                onChange={handleChange}
                className="w-full"
                accept=".jpg,.jpeg,.png"
              />
              {formData.image.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {Array.from(formData.image).map((photo, idx) => (
                    <span
                      key={idx}
                      className="text-sm bg-gray-200 px-2 py-1 rounded"
                    >
                      {photo.name}
                    </span>
                  ))}
                </div>
              )}

              {errorMessage?.image && (
                <div className="text-red-500 text-sm mt-1">
                  <span>{errorMessage?.image?.msg}</span>
                </div>
              )}
            </div>
            <div>
              <label className="block mb-2 text-gray-700">
                Select Category:
              </label>
              <select
                name="categories"
                value={formData.categories || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select an option</option>
                {CategoryData?.data?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {errorMessage?.categories && (
                <div className="text-red-500 text-sm mt-1">
                  <span>{errorMessage?.categories?.msg}</span>
                </div>
              )}
            </div>
          </div>

          {/* Price & Discount */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errorMessage?.price && (
                <div className="text-red-500 text-sm mt-1">
                  <span>{errorMessage?.price?.msg}</span>
                </div>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">Discount</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errorMessage?.discount && (
                <div className="text-red-500 text-sm mt-1">
                  <span>{errorMessage?.discount?.msg}</span>
                </div>
              )}
            </div>
          </div>

          {/* Stock & Status */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4">
              <label className="font-medium">Stock Status</label>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, stock: !prev.stock }))
                }
                className={`px-4 py-2 rounded-lg ${
                  formData.stock ? "bg-green-500 text-white" : "bg-gray-300"
                }`}
              >
                {formData.stock ? "In Stock" : "Out of Stock"}
              </button>
              {errorMessage?.stock && (
                <div className="text-red-500 text-sm mt-1">
                  <span>{errorMessage?.stock?.msg}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <label className="font-medium">Status</label>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, status: !prev.status }))
                }
                className={`px-4 py-2 rounded-lg ${
                  formData.status ? "bg-indigo-500 text-white" : "bg-gray-300"
                }`}
              >
                {formData.status ? "Active" : "Inactive"}
              </button>
              {errorMessage?.status && (
                <div className="text-red-500 text-sm mt-1">
                  <span>{errorMessage?.status?.msg}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <JoditEditor
              ref={DisRef}
              value={Dis}
              height="600"
              onChange={(newContent) => setDisContent(newContent)}
            />
            {errorMessage?.description && (
              <div className="text-red-500 text-sm mt-1">
                <span>{errorMessage?.description?.msg}</span>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
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
      </motion.div>
    </div>
  );
}
