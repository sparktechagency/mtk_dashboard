/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { SetBlogCreateError } from "../../redux/features/blog/blogSlice";
import CustomInput from "../form/CustomInput";
import { CgSpinnerTwo } from "react-icons/cg";
import type { z } from "zod";
import CustomSelect from "../form/CustomSelect";
import CustomQuilEditor from "../form/CustomQuilEditor";
import Error from "../validation/Error";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProductValidationSchema } from "../../schemas/product.schema";
import { useCreateProductMutation } from "../../redux/features/product/productApi";
import { useGetCategoryDropDownQuery } from "../../redux/features/category/categoryApi";
import CustomMultiSelect from "../form/CustomMultiSelect";
import { useGetColorDropDownQuery } from "../../redux/features/color/colorApi";
import { useGetSizesQuery } from "../../redux/features/size/sizeApi";

type TFormValues = z.infer<typeof createProductValidationSchema>;


const CreateProductForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useGetCategoryDropDownQuery(undefined);
  useGetColorDropDownQuery(undefined);
  useGetSizesQuery(undefined);
  const { BlogCreateError } = useAppSelector((state) => state.blog);
  const { categoryOptions } = useAppSelector((state) => state.category);
  const { colorOptions } = useAppSelector((state) => state.color);
  const { sizeOptions } = useAppSelector((state) => state.size);
  const [createProduct, { isLoading, isSuccess }] = useCreateProductMutation();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(createProductValidationSchema),
  });

  useEffect(()=> {
    if(!isLoading && isSuccess){
      navigate("/blogs")
    }
  }, [isLoading, isSuccess, navigate])


  const onSubmit: SubmitHandler<TFormValues> = () => {
    dispatch(SetBlogCreateError(""));
    const formData = new FormData();
    // formData.append("image", image as File);
    // formData.append("title", data.title);
    // formData.append("category", data.category);
    // formData.append("descriptions", data.descriptions);
    createProduct(formData);
  };

  return (
    <>
      {BlogCreateError && <Error message={BlogCreateError} />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <CustomInput
            label="Name"
            name="name"
            type="text"
            control={control}
            placeholder="Enter name"
          />
          <CustomSelect
            label="Category"
            name="categoryId"
            control={control}
            options={categoryOptions}
            disabled={categoryOptions.length===0}
          />
          <CustomInput
            label="Current Price"
            name="currentPrice"
            type="text"
            control={control}
            placeholder="Enter price"
            onInput={(e: any) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
          />
          <CustomInput
            label="Old Price(optional)"
            name="originalPrice"
            type="text"
            control={control}
            placeholder="Enter price"
            onInput={(e: any) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
          />
          <div className="col-span-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <CustomMultiSelect name="colors" label="Colors (Optional)" control={control} options={colorOptions} disabled={colorOptions?.length === 0} />
            <CustomMultiSelect name="sizes" label="Sizes (Optional)" control={control} options={sizeOptions} disabled={sizeOptions?.length === 0} />
            <CustomInput
              label="Discount (Optional)"
              name="discoun"
              type="text"
              control={control}
              placeholder="Enter discount"
            />
          </div>

        </div>
        {/* <div className="mb-6 mt-2">
          <ImageUpload
            preview={preview}
            setPreview={setPreview}
            image={image}
            setImage={setImage}
            title="Blog Image"
            setIconError={setIconError}
          />
          {errors?.icon && (
            <p className="mt-1 text-sm text-red-500">{errors?.icon?.message}</p>
          )}
        </div> */}
          <CustomQuilEditor
            label="Short Introduction"
            name="introduction"
            control={control}
            height={40}
            placeholder="Write a blog..."
          />
          <CustomQuilEditor
            label="Description"
            name="description"
            control={control}
            height={250}
            placeholder="Write a blog..."
          />

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-x-2 bg-primary hover:bg-[#2b4773] cursor-pointer text-white py-2 rounded-md font-semibold transition-colors duration-100"
        >
          {isLoading ? (
            <>
              <CgSpinnerTwo className="animate-spin" fontSize={16} />
              Processing...
            </>
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </>
  );
};

export default CreateProductForm;
