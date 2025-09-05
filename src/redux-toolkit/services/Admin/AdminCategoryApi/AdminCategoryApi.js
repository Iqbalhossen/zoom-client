import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AdminCategoryApi = createApi({
  reducerPath: "AdminCategoryApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: `http://localhost:5000/api/category/`,
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/admin/category/`,
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => `all/view`,
      providesTags: (results, error) => [
        { type: "Category", results, error, id: "LIST" }, ////// using this line then refresh data when delete, update or type and id both same //// providesTags using only query builder
      ],
    }),
    getCategory: builder.query({
      query: (page = 1) => `view?page=${page}`,
      providesTags: (results, error) => [
        { type: "Category", results, error, id: "LIST" }, ////// using this line then refresh data when delete, update or type and id both same //// providesTags using only query builder
      ],
    }),
    getSingleCategory: builder.query({
      query: (id) => `view/${id}`,
      providesTags: (results, error) => [
        { type: "Category", results, error, id: "LIST" }, ////// using this line then refresh data when delete, update or type and id both same //// providesTags using only query builder
      ],
    }),
    storeCategory: builder.mutation({
      query: (data) => ({
        url: "store",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (results, error) => [
        { type: "Category", results, error, id: "LIST" }, ////// using this line then refresh data when delete, update or type and id both same //// invalidatesTags using only query mutation
      ],
      // invalidatesTags: ["Category"],
      //     async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   try {
      //     const result = await queryFulfilled;
      //     console.log('✅ Success:', result);
      //   } catch (err) {
      //     console.log('❌ Error:', err);
      //   }
      // },
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (results, error) => [
        { type: "Category", results, error, id: "LIST" }, ////// using this line then refresh data when delete, update or type and id both same //// invalidatesTags using only query mutation
      ],
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (results, error) => [
        { type: "Category", results, error, id: "LIST" }, ////// using this line then refresh data when delete, update or type and id both same //// invalidatesTags using only query mutation
      ],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useGetCategoryQuery,
  useGetSingleCategoryQuery,
  useStoreCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = AdminCategoryApi;
