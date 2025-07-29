/* eslint-disable @typescript-eslint/no-explicit-any */

import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import type { IParam } from "../../../types/global.type";
import { apiSlice } from "../api/apiSlice";
import { SetCategoryCreateError, SetCategoryUpdateError } from "../category/categorySlice";

export const colorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getColors: builder.query({
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
          url: "/color/get-colors",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.colors],
    }),
    createColor: builder.mutation({
      query: (data) => ({
        url: "/color/create-color",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.colors];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Color is added successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message || "Something Went Wrong";
          dispatch(SetCategoryCreateError(message));
        }
      },
    }),
    updateColor: builder.mutation({
      query: ({id, data }) => ({
        url: `/color/update-color/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.colors];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Color is updated successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message || "Something went wrong";
          dispatch(SetCategoryUpdateError(message));
        }
      },
    }),
    deleteColor: builder.mutation({
      query: (id) => ({
        url: `/color/delete-color/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.colors];
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

export const { useGetColorsQuery, useCreateColorMutation, useUpdateColorMutation, useDeleteColorMutation } = colorApi;
