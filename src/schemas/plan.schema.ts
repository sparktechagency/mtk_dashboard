import { z } from "zod";
import { fullNameRegex } from "./admin.schema";



export const planSchema = z
    .object({
        name: z
            .string({
                invalid_type_error: "Name must be string",
                required_error: "Name is required",
            })
            .min(1, "Name is required")
            .trim()
            .regex(fullNameRegex, {
                message:
                    "Name can only contain letters, spaces, apostrophes, hyphens, and dots.",
            }),
        price: z
            .string({
                invalid_type_error: "Price must be a number",
                required_error: "Price is required",
            })
            .trim()
            .min(1, "Price is required")
            .refine((val) => /^\d+$/.test(val), {
                message: "Price must be a number",
            })
            .transform((val) => Number(val))
            .refine((val) => val > 0, {
                message: "Price must be at least 1",
            }),
        validation: z
            .string({
                invalid_type_error: "validation must be string",
                required_error: "Select validity",
            })
            .trim()
            .min(1, "Select validity"),
        notice: z
            .string({
                invalid_type_error: "Notice must be string",
                required_error: "Notice is required",
            })
            .min(1, "Notice is required")

    })
