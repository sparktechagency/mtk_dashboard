/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import TagTypes from "../../../constant/tagType.constant.ts";
import {
  getEmail,
  setEmail,
  setToken,
} from "../../../helper/SessionHelper.ts";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper.ts";
import { apiSlice } from "../api/apiSlice.ts";
import {
  SetChangePasswordError,
  SetForgotError,
  SetLoginError,
  SetResetPasswordError,
  SetVerifyOtpError,
} from "./authSlice.ts";
import type { IAuthUser } from "../../../types/global.type.ts";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          const token = res?.data?.data?.accessToken;
          const authUser = jwtDecode(token) as IAuthUser;
          const role = authUser?.role;
          if (role === "ADMIN" || role === "SUPER_ADMIN") {
            setToken(token);
            SuccessToast("Login Success");
            setTimeout(() => {
              window.location.href = "/";
            }, 300);
          } else {
            dispatch(SetLoginError("You are not admin!"));
          }
        } catch (err: any) {
          const status = err?.error?.status;
          if (status === 404) {
            dispatch(SetLoginError("Could not Find this Email!"));
          }
          if (status === 400) {
            dispatch(SetLoginError("Wrong Password!"));
          }
          if (status === 500) {
            dispatch(SetLoginError("Something Went Wrong"));
          }
        }
      },
    }),
    forgotPasswordSendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
      async onQueryStarted({ email }, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          setEmail(email);
          SuccessToast("OTP is sent successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          if (status === 400) {
            dispatch(SetForgotError("Could not Find this Email!"));
          } else {
            dispatch(SetForgotError("Something Went Wrong"));
          }
        }
      },
    }),
    forgotPasswordVerifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Otp is verified successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message;
          if (status === 400) {
            if (message === "Account does not exist!") {
              dispatch(SetVerifyOtpError("Could not Find this Email!"));
            }
            if (message === "Invalid reset code!") {
              dispatch(SetVerifyOtpError("Invalid otp code"));
            }
          } else {
            dispatch(SetVerifyOtpError("Something Went Wrong"));
          }
        }
      },
    }),
    forgotPasswordResendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-resend",
        method: "POST",
        body: data,
      }),
      async onQueryStarted({ email }, { queryFulfilled }) {
        try {
          await queryFulfilled;
          setEmail(email);
          SuccessToast("OTP is sent successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message;
          if(message === "Cannot read properties of null (reading 'email')"){
            ErrorToast("Couldn't find this email address");
          }
          else{
            ErrorToast(message);
          }
        }
      },
    }),
    forgotPasswordReset: builder.mutation({
      query: (data) => ({
        url: `/auth/reset-password?email=${getEmail()}`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Password is reset successfully!");
          localStorage.clear();
          setTimeout(() => {
            window.location.href = "/login";
          }, 300);
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message;
          if (status === 400) {
            dispatch(SetResetPasswordError(message));
          } else {
            dispatch(SetResetPasswordError("Something Went Wrong"));
          }
        }
      },
    }),
    changeStatus: builder.mutation({
      query: (data) => ({
        url: `/auth/block`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.candidates, TagTypes.employers];
        }
        return [];
      },
      async onQueryStarted({is_block, role}, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast(`${role==="USER" ? "Candidate" : "Employer"} is ${is_block ? "blocked" : "activated"} successfully`)
        } catch (err:any) {
          const status = err?.error?.status;
          if (status === 404) {
            ErrorToast(err?.error?.data?.message);
          } else {
            ErrorToast("Something Went Wrong!");
          }
        }
      },
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Password is updated successfully");
          setTimeout(() => {
            localStorage.clear()
            window.location.href = "/auth/signin";
          }, 300);
        } catch (err:any) {
          const message = err?.error?.data?.message;
          if(message === "password is incorrect"){
            dispatch(SetChangePasswordError("Wrong Current Password"))
          }else{
            dispatch(SetChangePasswordError(message))
          }
        }
      },
    }),
    updateAdminProfile: builder.mutation({
      query: (data) => ({
        url: `/auth/admin/edit-profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.me];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Profile is updated successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message || "Something went wrong";
          ErrorToast(message);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordSendOtpMutation,
  useForgotPasswordResendOtpMutation,
  useForgotPasswordVerifyOtpMutation,
  useForgotPasswordResetMutation,
  useChangeStatusMutation,
  useChangePasswordMutation,
  useUpdateAdminProfileMutation
} = authApi;
