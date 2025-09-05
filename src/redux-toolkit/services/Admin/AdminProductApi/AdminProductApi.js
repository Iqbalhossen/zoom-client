import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AdminProductApi = createApi({
  reducerPath: "AdminProductApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: `http://localhost:5000/api/Product/`,
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/admin/product/`,
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (page = 1) => `view?page=${page}`,
      providesTags: (results, error) => [
        { type: "Product", results, error, id: "LIST" }, ////// using this line then refresh data when delete, update or type and id both same //// providesTags using only query builder
      ],
    }),
    getSingleProduct: builder.query({
      query: (id) => `view/${id}`,
      providesTags: (results, error) => [
        { type: "Product", results, error, id: "LIST" }, ////// using this line then refresh data when delete, update or type and id both same //// providesTags using only query builder
      ],
    }),
    storeProduct: builder.mutation({
      query: (data) => ({
        url: "store",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (results, error) => [
        { type: "Product", results, error, id: "LIST" }, ////// using this line then refresh data when delete, update or type and id both same //// invalidatesTags using only query mutation
      ],
      // invalidatesTags: ["Product"],
      //     async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   try {
      //     const result = await queryFulfilled;
      //     console.log('✅ Success:', result);
      //   } catch (err) {
      //     console.log('❌ Error:', err);
      //   }
      // },
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (results, error) => [
        { type: "Product", results, error, id: "LIST" }, ////// using this line then refresh data when delete, update or type and id both same //// invalidatesTags using only query mutation
      ],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (results, error) => [
        { type: "Product", results, error, id: "LIST" }, ////// using this line then refresh data when delete, update or type and id both same //// invalidatesTags using only query mutation
      ],
    }),
    ActiveInactiveProduct: builder.mutation({
      query: (id) => ({
        url: `active/inactive/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (results, error) => [
        { type: "Product", results, error, id: "LIST" }, ////// using this line then refresh data when delete, update or type and id both same //// invalidatesTags using only query mutation
      ],
    }),
    StockProduct: builder.mutation({
      query: (id) => ({
        url: `stock/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (results, error) => [
        { type: "Product", results, error, id: "LIST" }, ////// using this line then refresh data when delete, update or type and id both same //// invalidatesTags using only query mutation
      ],
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetSingleProductQuery,
  useStoreProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useActiveInactiveProductMutation,
  useStockProductMutation
} = AdminProductApi;
