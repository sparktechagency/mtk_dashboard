import { z } from "zod";
export const letterRegex = /^[A-Za-z]+$/;
export const nonLetterRegex = /^[\s'.\-&,()]+$/;

export const categoryRegex = /^[A-Za-z\s'.\-&,()]+$/; //only contain letters, spaces, apostrophes, hyphens, and dots, and(&) and comma(,)


export const categorySchema = z.object({
  category: z
    .string({
      invalid_type_error: "Title must be string",
      required_error: "Title is required",
    })
    .min(1, "Title is required")
    .regex(
      categoryRegex,
      "Title only contain letters and valid symbols (' . - & , ( )) are allowed."
    )
    .trim(),
  icon: z
    .string({
      invalid_type_error: "Image must be File",
      required_error: "Icon is required",
    })
    .min(1, "Icon is required")
    .trim(),
});



