/* eslint-disable @typescript-eslint/no-explicit-any */
import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import { apiSlice } from "../api/apiSlice";


export const policyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTermsConditions: builder.query({
      query: () => {
        return {
          url: `/dashboard/get-rules`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.termsConditions],
    }),
    getPrivacyPolicy: builder.query({
      query: () => {
        return {
          url: `/dashboard/get-privacy-policy`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.privacyPolicy],
    }),
    getAboutUs: builder.query({
      query: () => {
        return {
          url: `/dashboard/about_us`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.aboutUs],
    }),
    createUpdateTermsConditions: builder.mutation({
      query: ({data}) => ({
        url: `/dashboard/addupdate-termsConditions`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.termsConditions];
        }
        return [];
      },
      async onQueryStarted({ message }, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast(`Terms-Conditions is ${message} successfully`);
        } catch (err:any) {
          const message = err?.error?.data?.message;
          ErrorToast(message);
        }
      },
    }),
    createUpdatePrivacyPolicy: builder.mutation({
      query: ({ data}) => ({
        url: `/dashboard/addupdate-privacy-policy`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.privacyPolicy];
        }
        return [];
      },
      async onQueryStarted({ message }, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast(`Privacy Policy is ${message} successfully`);
        } catch (err:any) {
          const message = err?.error?.data?.message;
          ErrorToast(message);
        }
      },
    }),
    createUpdateAboutUs: builder.mutation({
      query: ({ data }) => ({
        url: `/dashboard/about_us`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.aboutUs];
        }
        return [];
      },
      async onQueryStarted( { message }, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast(`About Us is ${message} successfully`);
        } catch (err:any) {
          const message = err?.error?.data?.message;
          ErrorToast(message);
        }
      },
    }),
  }),
});

export const {
  useGetTermsConditionsQuery,
  useGetPrivacyPolicyQuery,
  useGetAboutUsQuery,
  useCreateUpdateTermsConditionsMutation,
  useCreateUpdatePrivacyPolicyMutation,
  useCreateUpdateAboutUsMutation
} = policyApi;
