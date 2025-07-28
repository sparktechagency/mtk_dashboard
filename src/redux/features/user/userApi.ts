/* eslint-disable @typescript-eslint/no-explicit-any */

import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast } from "../../../helper/ValidationHelper";
import type { IParam } from "../../../types/global.type";
import { apiSlice } from "../api/apiSlice";
import { SetUser } from "./userSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
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
          url: "/user/get-users",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.users],
    }),
    getMe: builder.query({
      query: () => ({
        url: "/user/get-me",
        method: "GET",
      }),
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.me],
      async onQueryStarted(_arg, { queryFulfilled, dispatch}) {
        try {
          const res = await queryFulfilled;
          const data = res?.data?.data;
          dispatch(SetUser(data))
        } catch(err:any){
        const message = err?.error?.data?.message || "Something went wrong";
         ErrorToast(message);
        }
      },
    }),
  }),
});

export const { useGetUsersQuery, useGetMeQuery } = userApi;
