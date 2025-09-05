"use client";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/redux-toolkit/features/slices/cartSlice/cartSlice";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

export default function CartPage() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id, name) => {
    dispatch(removeFromCart(id));
    toast.info(`${name} removed from cart ❌`);
  };

  const handleClear = () => {
    dispatch(clearCart());
    toast.error("Cart cleared 🗑️");
  };

  const handleIncrease = (id, name) => {
    dispatch(increaseQuantity(id));
    toast.info(`${name} quantity increased ⬆️`);
  };

  const handleDecrease = (id, name) => {
    dispatch(decreaseQuantity(id));
    toast.info(`${name} quantity decreased ⬇️`);
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛒 Cart</h1>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul className="divide-y">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-4"
              >
                <div className="flex items-center gap-4">
                  <img src={item?.frontImage} className="w-16 h-16 object-contain" />
                  <div>
                    <h2>{item?.name}</h2>
                    <p>
                      ${item?.price} × {item.quantity}
                    </p>
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => handleIncrease(item.id, item.title)}
                        className="px-2 py-1 bg-green-500 text-white rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleDecrease(item.id, item.title)}
                        className="px-2 py-1 bg-yellow-500 text-white rounded"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id, item.title)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4 font-bold text-xl">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleClear}
            className="bg-red-500 text-white px-6 py-3 mt-4 w-full rounded hover:bg-red-600"
          >
            Clear All
          </button>
        </>
      )}
    </div>
  );
}
