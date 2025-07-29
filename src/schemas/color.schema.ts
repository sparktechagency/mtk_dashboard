import { z } from "zod";


export const colorSchema = z.object({
    name: z
        .string({
            invalid_type_error: "Title must be string",
            required_error: "Title is required",
        })
        .min(1, "Title is required")
        .trim(),
    //   hexCode: z
    //     .string({
    //       invalid_type_error: "Choose Color must be string",
    //       required_error: "Choose Color",
    //     })
    //     .min(1, "Choose Color")
    //     .trim(),
    hexCode: z
        .string({
            invalid_type_error: "Choose Color must be string",
            required_error: "Choose Color",
        })
        .min(1, "Choose Color")
        .trim()
        .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
            message: "Hex code must be a valid color format (e.g., #fff or #ffffff)",
        }),
});



