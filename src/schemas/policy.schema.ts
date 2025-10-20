import { z } from "zod";

export const policySchema = z.object({
  description: z.string({
    invalid_type_error: "Description must be string",
    required_error: "Description is required",
  })
    .min(1, "Description is required")
});