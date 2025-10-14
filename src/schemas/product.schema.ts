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
  originalPrice: z
    .preprocess(
      (val) => {
        // If empty, return undefined to make it optional
        if (val === '' || val === undefined || val === null) {
          return undefined;
        }
        return Number(val);
      },
      z
        .number({
          invalid_type_error: "Original price must be a number",
        })
        .refine((val) => !isNaN(val), {
          message: "Original price must be a valid number",
        })
        .refine((val) => val >= 0, {
          message: "Original price cannot be negative",
        })
        .optional() // This makes it truly optional
    ),
  quantity: z
    .string({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .refine((val) => !isNaN(Number(val)), { message: "Quantity must be a valid number" })
    .refine((val) => Number(val) > 0, { message: "Quantity must be greater than 0" })
  ,
  discount: z.string({
    invalid_type_error: "discount must be string"
  }).optional(),
  colors: z.array(
    z.string(),
    {
      invalid_type_error: "colors must be an array",
      required_error: "colors must be at least one value"
    }
  ).optional(),
  sizes: z.array(
    z.string(),
    {
      invalid_type_error: "sizes must be an array",
      required_error: "sizes must be at least one value"
    }
  ).optional(),
  introduction: z.string({
    invalid_type_error: "Introduction must be string",
    required_error: "Introduction is required"
  })
    .min(1, "Introduction is required"),
  description: z
    .string({
      invalid_type_error: "Description must be string",
      required_error: "Description is required",
    })
    .min(1, "Description is required")
})
  .superRefine((values, ctx) => {
    const { currentPrice, originalPrice } = values
    if (currentPrice && originalPrice && (currentPrice > originalPrice)) {
      ctx.addIssue({
        path: ["originalPrice"],
        message: "Original Price must be greater than current price",
        code: z.ZodIssueCode.custom,
      });
      ctx.addIssue({
        path: ["currentPrice"],
        message: "Current Price must be less than original price",
        code: z.ZodIssueCode.custom,
      });
    }
  });


export const updateProductValidationSchema = z.object({
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
  originalPrice: z
    .preprocess(
      (val) => {
        // If empty, return undefined to make it optional
        if (val === '' || val === undefined || val === null) {
          return undefined;
        }
        return Number(val);
      },
      z
        .number({
          invalid_type_error: "Original price must be a number",
        })
        .refine((val) => !isNaN(val), {
          message: "Original price must be a valid number",
        })
        .refine((val) => val >= 0, {
          message: "Original price cannot be negative",
        })
        .optional() // This makes it truly optional
    ),
  quantity: z
    .string({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .refine((val) => !isNaN(Number(val)), { message: "Quantity must be a valid number" })
    .refine((val) => Number(val) > 0, { message: "Quantity must be greater than 0" })
    .transform((val)=>Number(val))
  ,
  discount: z.string({
    invalid_type_error: "discount must be string"
  }).optional(),
  colors: z.array(
    z.string(),
    {
      invalid_type_error: "colors must be an array",
      required_error: "colors must be at least one value"
    }
  ).default([]),
  sizes: z.array(
    z.string(),
    {
      invalid_type_error: "sizes must be an array",
      required_error: "sizes must be at least one value"
    }
  ).default([]),
  introduction: z.string({
    invalid_type_error: "Introduction must be string",
    required_error: "Introduction is required"
  })
    .min(1, "Introduction is required"),
  description: z
    .string({
      invalid_type_error: "Description must be string",
      required_error: "Description is required",
    })
    .min(1, "Description is required")
}).superRefine((values, ctx) => {
  const { currentPrice, originalPrice } = values
  if (currentPrice && originalPrice && (currentPrice > originalPrice)) {
    ctx.addIssue({
      path: ["originalPrice"],
      message: "Original Price must be greater than current price",
      code: z.ZodIssueCode.custom,
    });
    ctx.addIssue({
      path: ["currentPrice"],
      message: "Current Price must be less than original price",
      code: z.ZodIssueCode.custom,
    });
  }
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