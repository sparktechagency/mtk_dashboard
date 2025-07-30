/* eslint-disable @typescript-eslint/no-explicit-any */

import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import { apiSlice } from "../api/apiSlice";

export const informationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInformation: builder.query({
      query: () => ({
        url: "/information/get-information",
        method: "GET",
      }),
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.information],
    }),
    updateInformation: builder.mutation({
      query: ({id, data }) => ({
        url: `/information/createupdate-information/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.information];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Information is updated successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message || "Something went wrong";
          ErrorToast(message)
        }
      },
    }),
  }),
});

export const { useGetInformationQuery, useUpdateInformationMutation } = informationApi;
