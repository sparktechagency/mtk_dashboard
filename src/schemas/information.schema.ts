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
    .min(1, "address is required"),
  instagram: z
    .string({
      invalid_type_error: "instagram must be a valid URL",
      required_error: "Instagram Link is required"
    })
    .min(1, "Instagram Link is required")
    .trim()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Instagram link must be a valid URL",
    }),
  teligram: z
    .string({
      invalid_type_error: "teligram must be a valid URL",
      required_error: "Teligram Link is required"
    })
    .min(1, "Teligram Link is required")
    .trim()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Teligram link must be a valid URL",
    })
});