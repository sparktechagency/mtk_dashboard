import { apiSlice } from "../api/apiSlice.js";
import TagTypes from "../../../constant/tagType.constant.js";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => {
        return {
          url: `/dashboard/get_total_count`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.stats],
    }),
    getJobGrowth: builder.query({
      query: (year) => {
        return {
          url: `/dashboard/get_job_growth?year=${year}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.jobGrowth],
    }),
    getIncomeGrowth: builder.query({
      query: (year) => {
        return {
          url: `/dashboard/get_subscription_growth?year=${year}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.jobGrowth],
    }),
  }),
});

export const { useGetStatsQuery, useGetJobGrowthQuery, useGetIncomeGrowthQuery } = dashboardApi;
