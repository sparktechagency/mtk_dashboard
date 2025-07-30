import { z } from "zod";

export const createProductValidationSchema = z.object({
  name: z.string({
    invalid_type_error: "name must be string",
    required_error: "Name is required",
  })
    .min(1, "Name is required")
    .trim(),
  categoryId: z
    .string({
      invalid_type_error: "category must be a string",
      required_error: "Select category",
    })
    .min(1, "Select category"),
  currentPrice: z
    .preprocess(
      (val) => (val === '' || val === undefined || val === null ? undefined : Number(val)),
      z
        .number({
          required_error: "Current price is required",
          invalid_type_error: "Current price must be a number",
        })
        .refine((val) => !isNaN(val), { message: "Current price must be a valid number" })
        .refine((val) => val > 0, { message: "Current price must be greater than 0" })
    )
  ,
  // originalPrice: z
  //   .preprocess(
  //     (val) => (val === '' || val === undefined || val === null ? undefined : Number(val)),
  //     z
  //       .number({
  //         invalid_type_error: "Original price must be a number",
  //       })
  //       .refine((val) => !isNaN(val), {
  //         message: "Original price must be a valid number",
  //       })
  //       .refine((val) => val >= 0, {
  //         message: "Original price cannot be negative",
  //       })
  //   )
  //   .default(0),
  discount: z.string({
    invalid_type_error: "discount must be string"
  }).optional(),
  colors: z.array(
    z.string(),
    {
      invalid_type_error: "colors must be an array",
      required_error: "colors must be at least one value"
    }
  ).min(1, { message: "colors must be at least one value" }).optional(),
  sizes: z.array(
    z.string(),
    {
      invalid_type_error: "sizes must be an array",
      required_error: "sizes must be at least one value"
    }
  ).min(1, { message: "sizes must be at least one value" }).optional(),
  introduction: z.string({
    invalid_type_error: "Introduction must be string",
    required_error: "Introduction is required"
  })
   .min(1, { message: "Introduction is required" })
  .refine(
      (val) =>
        /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/i.test(val.trim()) ||
        val.includes("<"),
      {
        message: "description must be valid HTML.",
      }
    ),
  description: z
    .string({
      invalid_type_error: "description must be string",
      required_error: "Description is required"
    })
    .min(1, { message: "Description is required" })
    .refine(
      (val) =>
        /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/i.test(val.trim()) ||
        val.includes("<"),
      {
        message: "description must be valid HTML.",
      }
    ),
  status: z.string({
    invalid_type_error: "status must be a valid string value.",
  })
    .refine((val) => ['visible', 'hidden'].includes(val), {
      message: "status must be one of: 'visible', 'hidden'",
    }).default("visible"),
  stockStatus: z.string({
    invalid_type_error: "Stock Status must be a valid string value.",
  })
    .refine((val) => ['In Stock', 'Stock Out', 'Up Coming'].includes(val), {
      message: "Stock Status must be one of: In Stock', 'Stock Out', 'Up Coming'",
    }).default("In Stock")
});
