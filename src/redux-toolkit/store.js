import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AllMiddleware, rootReducers } from "./rootReducers";

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...AllMiddleware),
  devTools: true,
});

// load cart from localStorage
if (typeof window !== "undefined") {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) store.dispatch({ type: "cart/setCart", payload: JSON.parse(savedCart) });

  // subscribe to save cart on every state change
  store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem("cart", JSON.stringify(state.cart.items));
  });
}

setupListeners(store.dispatch);
