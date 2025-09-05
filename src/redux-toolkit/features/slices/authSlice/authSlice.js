"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Cookie get function
const getCookie = (name) => {
  if (typeof document === "undefined") return null;
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return cookie ? cookie.split("=")[1] : null;
};

// Initial load from localStorage safely
let storedToken = null;
let storedUserInfo = null;

if (typeof window !== "undefined") {
  storedToken = getCookie("assignment_token");
  const userString = localStorage.getItem("userInfo");

  if (userString && userString !== "undefined" && userString !== "null") {
    try {
      storedUserInfo = JSON.parse(userString);
    } catch (err) {
      console.error("Invalid JSON in localStorage userInfo:", err);
      storedUserInfo = null;
    }
  }
}

// console.log(storedToken)
// LocalStorage theke userId niye API call
export const fetchAuthData = createAsyncThunk(
  "auth/fetchAuthData",
  async (_, { rejectWithValue }) => {
    try {
      if (!storedUserInfo?.id) {
        return rejectWithValue("No userId found in localStorage");
      }
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/view/${storedUserInfo?.id}`
      );
      // console.log('data:',data);
      return data?.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    AuthInfo: storedUserInfo || null,
    token: storedToken || null,
    isAuthenticated: !!storedToken,
    AuthData: null,
    isAuthLoading: false,
    AuthDataError: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.AuthInfo = action.payload.userData;
      state.token = action.payload.userToken;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "userInfo",
          JSON.stringify(action.payload.userData)
        );
      }
    },
    logout: (state) => {
      state.AuthInfo = null;
      state.AuthData = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("userInfo");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthData.pending, (state) => {
        state.isAuthLoading = true;
        state.AuthDataError = null;
      })
      .addCase(fetchAuthData.fulfilled, (state, action) => {
        state.isAuthLoading = false;
        state.AuthData = action.payload;
      })
      .addCase(fetchAuthData.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.AuthDataError = action.payload;
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
