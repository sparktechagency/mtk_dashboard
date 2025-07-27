import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast } from "../../../helper/ValidationHelper";
import type { IParam } from "../../../types/global.type";
import { apiSlice } from "../api/apiSlice";


export const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleJob: builder.query({
      query: (id) => ({
        url: `/jobs/details?jobId=${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 600,
      providesTags: (_result, _error, arg) => [{ type: TagTypes.job, id: arg }],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch{
          ErrorToast("Server error is occured");
        }
      },
    }),
    getJobs: builder.query({
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
          url: "/dashboard/get_all",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.jobs],
    }),
  }),
});

export const { useGetJobsQuery } = jobApi;
