/* eslint-disable @typescript-eslint/no-explicit-any */

import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import type { IParam } from "../../../types/global.type";
import { apiSlice } from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
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
          url: "/dashboard/all-category",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.users],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/dashboard/create-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.categories];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Category is created successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message || "Something went wrong";
          if(message === "Invalid file type"){
            ErrorToast("Please, Upload png, jpeg, jpg formate file")
          }
          else{
            ErrorToast(message);
          }
        }
      },
    }),
    updateCategory: builder.mutation({
      query: ({id, data }) => ({
        url: `/dashboard/edit-category/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.categories];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Category is updated successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message || "Something went wrong";
          if(message === "Invalid file type"){
            ErrorToast("Please, Upload png, jpeg, jpg formate file")
          }
          else{
            ErrorToast(message);
          }
        }
      },
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/dashboard/delete-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.categories];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Category is deleted successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message || "Something went wrong";
          ErrorToast(message);
        }
      },
    }),
  }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } = categoryApi;
