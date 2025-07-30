import { z } from "zod";
export const letterRegex = /^[A-Za-z]+$/;
export const nonLetterRegex = /^[\s'.\-&,()]+$/;

export const categoryRegex = /^[A-Za-z\s'.\-&,()]+$/; //only contain letters, spaces, apostrophes, hyphens, and dots, and(&) and comma(,)


export const categorySchema = z.object({
  name: z
    .string({
      invalid_type_error: "Title must be string",
      required_error: "Title is required",
    })
    .min(1, "Title is required")
    .trim(),
});


export const stockStatusSchema = z.object({
  stockStatus: z.string({
    invalid_type_error: "Stock Status must be a valid string value.",
    required_error: "stockStaus is required"
  })
    .min(1, "stockStaus is required")
    .refine((val) => ['in_stock', 'stock_out', 'up_coming'].includes(val), {
      message: "Stock Status must be one of: in_stock', 'stock_out', 'up_coming'",
    })
})
