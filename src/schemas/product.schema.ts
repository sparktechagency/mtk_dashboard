import { z } from "zod";


export const isEditorContentEmpty = (html: string) => {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent?.trim() === "";
};

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
      (val) => (val === '' || val === undefined || val === null ? undefined : Number(val)),
      z
        .number({
          invalid_type_error: "Original price must be a number",
          required_error: "Original price is required",
        })
        .refine((val) => !isNaN(val), {
          message: "Original price must be a valid number",
        })
        .refine((val) => val >= 0, {
          message: "Original price cannot be negative",
        })
    ),
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
  introduction: z.preprocess(
    (val) => {
      if (typeof val === "string" && isEditorContentEmpty(val)) {
        return ""; // force fail if visually empty
      }
      return val;
    },
    z
      .string({
        invalid_type_error: "Introduction must be string",
        required_error: "Introduction is required"
      })
      .min(1, "Introduction is required")
  ),
  description: z.preprocess(
    (val) => {
      if (typeof val === "string" && isEditorContentEmpty(val)) {
        return ""; // force fail if visually empty
      }
      return val;
    },
    z
      .string({
        invalid_type_error: "Description must be string",
        required_error: "Description is required",
      })
      .min(1, "Description is required")
  ),
  status: z.string({
    invalid_type_error: "status must be a valid string value.",
  })
    .refine((val) => ['visible', 'hidden'].includes(val), {
      message: "status must be one of: 'visible', 'hidden'",
    }).optional(),
  stockStatus: z.string({
    invalid_type_error: "Stock Status must be a valid string value.",
  })
    .refine((val) => ['in_stock', 'stock_out', 'up_coming'].includes(val), {
      message: "Stock Status must be one of: in_stock', 'stock_out', 'up_coming'",
    }).optional(),
})
  .superRefine((data, ctx) => {
    if (data.currentPrice > data.originalPrice) {
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
      (val) => (val === '' || val === undefined || val === null ? undefined : Number(val)),
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
    )
    .default(0),
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
  introduction: z.preprocess(
    (val) => {
      if (typeof val === "string" && isEditorContentEmpty(val)) {
        return ""; // force fail if visually empty
      }
      return val;
    },
    z
      .string({
        invalid_type_error: "Introduction must be string",
        required_error: "Introduction is required"
      })
      .min(1, "Introduction is required")
  ),
  description: z.preprocess(
    (val) => {
      if (typeof val === "string" && isEditorContentEmpty(val)) {
        return ""; // force fail if visually empty
      }
      return val;
    },
    z
      .string({
        invalid_type_error: "Description must be string",
        required_error: "Description is required",
      })
      .min(1, "Description is required")
  ),
 status: z.string({
    invalid_type_error: "status must be a valid string value.",
  })
    .refine((val) => ['visible', 'hidden'].includes(val), {
      message: "status must be one of: 'visible', 'hidden'",
    }),
  stockStatus: z.string({
    invalid_type_error: "Stock Status must be a valid string value.",
  })
    .refine((val) => ['in_stock', 'stock_out', 'up_coming'].includes(val), {
      message: "Stock Status must be one of: in_stock', 'stock_out', 'up_coming'",
    })
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