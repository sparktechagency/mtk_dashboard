
import TagTypes from "../../../constant/tagType.constant";
import type { IParam } from "../../../types/global.type";
import { apiSlice } from "../api/apiSlice";

export const newsletterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query({
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
          url: "/newsletter/get-subscriptions",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.subsbscriptions],
    }),
  }),
});

export const { useGetSubscriptionsQuery } = newsletterApi;
