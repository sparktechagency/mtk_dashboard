import { z } from "zod";

export const informationSchema = z.object({
  email: z
    .string({
      invalid_type_error: "email must be string",
      required_error: "email is required",
    })
    .email({
      message: "Invalid email address",
    }),
  phone: z
    .string({
      invalid_type_error: "Contact Number must be string",
      required_error: "Contact number is required",
    })
    .trim()
    .min(1, "Contact number is required"),
  address: z
    .string({
      invalid_type_error: "address must be string",
      required_error: "address is required",
    })
    .trim()
    .min(1, "address is required")
});