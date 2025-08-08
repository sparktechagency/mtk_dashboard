/* eslint-disable @typescript-eslint/no-explicit-any */

import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import type { IParam } from "../../../types/global.type";
import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args !== undefined && args.length > 0) {
          args.forEach((item: IParam) => {
            if (item.value) {
              params.append(item.name, item.value);
            }
          });
        }
        return {
          url: "/order/get-all-orders",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 120,
      providesTags: [TagTypes.orders],
    }),
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/order/get-single-order/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 600,
      providesTags: (_result, _error, arg) => [
        { type: TagTypes.order, id: arg },
      ],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        }catch{
          ErrorToast("Server error is occured");
        }
      },
    }),
    changeProductStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/update-product/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, _success, arg) => {
        if (result?.success) {
          return [TagTypes.products, { type: TagTypes.product, id: arg.id }];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
       try {
          await queryFulfilled;
          SuccessToast("Update Success");
        } catch (err:any) {
          const message = err?.error?.data?.message || "Something Went Wrong";
          ErrorToast(message);
        }
      },
    }),
    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/order/update-order/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, _success, arg) => {
        if (result?.success) {
          return [TagTypes.orders, { type: TagTypes.order, id: arg.id }];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
       try {
          await queryFulfilled;
          SuccessToast("Update Success");
        } catch (err:any) {
          const message = err?.error?.data?.message || "Something Went Wrong";
          ErrorToast(message);
        }
      },
    }),
    updateProductImg: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/update-product-img/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, _success, arg) => {
        if (result?.success) {
          return [TagTypes.products, { type: TagTypes.product, id: arg.id }];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
       try {
          await queryFulfilled;
          SuccessToast("Update Success");
        } catch (err:any) {
          const message = err?.error?.data?.message || "Something Went Wrong";
          ErrorToast(message);
        }
      },
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.products];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Product is deleted successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message;
          ErrorToast(message);
        }
      },
    }),
  }),
});

export const { useGetOrdersQuery, useGetSingleOrderQuery, useUpdateProductImgMutation, useDeleteProductMutation, useChangeProductStatusMutation, useUpdateOrderMutation } = orderApi;
