import { z } from "zod";

export const isEditorContentEmpty = (html: string) => {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent?.trim() === "";
};

export const blogSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required"),
  category: z
    .string({
      invalid_type_error: "Category must be string",
      required_error: "Select a category",
    })
    .trim()
    .min(1, "Select a category"),

  descriptions: z.preprocess(
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
  icon: z
    .string({
      invalid_type_error: "Image must be File",
      required_error: "Image is required",
    })
    .min(1, "Image is required")
    .trim(),
});
