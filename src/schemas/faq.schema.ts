import { z } from "zod";


export const faqSchema = z.object({
  question: z
    .string({
      required_error: "Question is required",
    })
    .min(1, "Question is required")
    .trim()
    .regex(/^.*\?$/, {
      message:
        "Question must end with a question mark (?)",
    }),
  answer: z
    .string({
      required_error: "Answer is required",
    })
    .trim()
    .min(1, "Answer is required"),
});

export const updateFaqSchema = z.object({
  question: z
    .string({
      required_error: "Question is required",
    })
    .min(1, "Question is required")
    .trim()
    .regex(/^.*\?$/, {
      message:
        "Question must end with a question mark (?)",
    }),
  answer: z
    .string({
      required_error: "Answer is required",
    })
    .trim()
    .min(1, "Answer is required"),
  isActive: z.boolean({
    invalid_type_error: "isActive must be boolean value"
  }).default(true)
});