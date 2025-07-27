/* eslint-disable @typescript-eslint/no-explicit-any */

import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import type { IParam } from "../../../types/global.type";
import { apiSlice } from "../api/apiSlice";

export const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
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
          url: "/dashboard/get_all_blogs",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.blogs],
    }),
    createBlog: builder.mutation({
      query: (data) => ({
        url: "/dashboard/blog_create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.blogs];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Blog is created successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message;
          if(message === "Invalid file type"){
            ErrorToast("Please, Upload png, jpeg, jpg formate file")
          }
          else{
            ErrorToast(message);
          }
        }
      },
    }),
    getSingleBlog: builder.query({
      query: (id) => ({
        url: `/dashboard/get_blog_details/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 600,
      providesTags: (_result, _error, arg) => [
        { type: TagTypes.blog, id: arg },
      ],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.log(err)
          ErrorToast("Server error is occured");
        }
      },
    }),
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/dashboard/update_blog/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, _success, arg) => {
        if (result?.success) {
          return [TagTypes.blogs, { type: TagTypes.blog, id: arg.id }];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Blog is updated successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message;
         if(message === "Invalid file type"){
            ErrorToast("Please, Upload png, jpeg, jpg formate file")
          }
          else{
            ErrorToast(message);
          }
        }
      },
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/dashboard/delete_blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.blogs];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Category is deleted successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message;
          ErrorToast(message);
        }
      },
    }),
  }),
});

export const { useGetBlogsQuery, useGetSingleBlogQuery, useCreateBlogMutation, useDeleteBlogMutation, useUpdateBlogMutation } = blogApi;
