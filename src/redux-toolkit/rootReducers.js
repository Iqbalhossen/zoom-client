import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/slices/authSlice/authSlice";
import cartReducer from "./features/slices/cartSlice/cartSlice";
import { UserAuthApi } from "./services/UserAuthApi/UserAuthApi";
import { AdminCategoryApi } from "./services/Admin/AdminCategoryApi/AdminCategoryApi";
import { AdminProductApi } from "./services/Admin/AdminProductApi/AdminProductApi";

export const rootReducers = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  ////// User Auth api call
  [UserAuthApi.reducerPath]: UserAuthApi.reducer,

  // //////Admin api call
  [AdminCategoryApi.reducerPath]: AdminCategoryApi.reducer,
  [AdminProductApi.reducerPath]: AdminProductApi.reducer,
});

export const AllMiddleware = [
  UserAuthApi.middleware,
  AdminCategoryApi.middleware,
  AdminProductApi.middleware,
];
