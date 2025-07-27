/* eslint-disable @typescript-eslint/no-explicit-any */
import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import type { IParam } from "../../../types/global.type";
import { apiSlice } from "../api/apiSlice";
import { SetAdmin, SetAdminCreateError } from "./adminSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.me],
      async onQueryStarted(_arg, { queryFulfilled, dispatch}) {
        try {
          const res = await queryFulfilled;
          const data = res?.data?.data;
          dispatch(SetAdmin(data))
        } catch{
         ErrorToast("Server error is occured");
        }
      },
    }),
    getAdmins: builder.query({
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
          url: "/auth/get_all_admin",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.admins],
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.admins];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Admin is created successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message || "Something went wrong";
          dispatch(SetAdminCreateError(message));
        }
      },
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/auth/delete-auth-account?email=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.admins];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Admin is deleted successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message || "Something went wrong";
          ErrorToast(message);
        }
      },
    }),
  }),
});

export const { useGetAdminsQuery, useCreateAdminMutation, useDeleteAdminMutation, useGetMeQuery } = adminApi;
