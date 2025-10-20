/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../form/CustomInput";
import { CgSpinnerTwo } from "react-icons/cg";
import type { z } from "zod";
import CustomSelect from "../form/CustomSelect";
import CustomQuilEditor from "../form/CustomQuilEditor";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateProductValidationSchema } from "../../schemas/product.schema";
import { useUpdateProductMutation } from "../../redux/features/product/productApi";
import { useGetCategoryDropDownQuery } from "../../redux/features/category/categoryApi";
import CustomMultiSelect from "../form/CustomMultiSelect";
import { useGetColorDropDownQuery } from "../../redux/features/color/colorApi";
import { useGetSizesQuery } from "../../redux/features/size/sizeApi";
import type { ISingleProduct } from "../../types/product.type";
import checkEqualArray from "../../utils/checkEqualArray";
import { WarningToast } from "../../helper/ValidationHelper";

type TFormValues = z.infer<typeof updateProductValidationSchema>;

type TProps = {
    product: ISingleProduct
}

const UpdateProductForm = ({ product }: TProps) => {
  const navigate = useNavigate();
  const defaultColors = product?.colors?.length > 0 ? product?.colors?.map((cv) => cv._id) : []
  const defaultSizes = product?.sizes?.length > 0 ? product?.sizes?.map((cv) => cv._id) : [];
  useGetCategoryDropDownQuery(undefined);
  const {isLoading: isColorLoading} = useGetColorDropDownQuery(undefined);
  useGetSizesQuery(undefined);
  const { categoryOptions } = useAppSelector((state) => state.category);
  const { colorOptions } = useAppSelector((state) => state.color);
  const { sizeOptions } = useAppSelector((state) => state.size);
  const [ updateProduct, { isLoading, isSuccess }] = useUpdateProductMutation();
  const { handleSubmit, control, watch, trigger } = useForm({
    resolver: zodResolver(updateProductValidationSchema),
      defaultValues: {
          name: product?.name,
          categoryId: product?.categoryId,
          currentPrice: String(product.currentPrice),
          originalPrice: String(product.originalPrice),
          quantity: String(product.quantity),
          discount: product?.discount,
          colors: defaultColors,
          sizes: defaultSizes,
          introduction: product?.introduction,
          description: product?.description
      }
  });

  const currentPrice = watch("currentPrice");
  const originalPrice = watch("originalPrice");

  useEffect(() => {
    if (currentPrice) {
      trigger("originalPrice");
    }
    if(currentPrice && !originalPrice){
      trigger("currentPrice");
    }
  }, [currentPrice, originalPrice, watch, trigger]);
  

  useEffect(() => {
    if (!isLoading && isSuccess) {
      navigate("/products")
    }
  }, [isLoading, isSuccess, navigate])


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    const finalValues: Record<string, unknown> = {};

    if (product?.discount != data.discount) {
      if (!data.discount) {
        finalValues.discount = "";
      }
      if (data.discount) {
        finalValues.discount = data.discount;
      }
    }

    if (product.originalPrice != data.originalPrice) {
      if (!data.originalPrice) {
        finalValues.originalPrice = 0;
      }
      if (data.originalPrice) {
        finalValues.originalPrice = data.originalPrice;
      }
    }
  
    if(product.name != data?.name){
      finalValues.name=data?.name
    }

    if(product.categoryId != data?.categoryId){
      finalValues.categoryId=data?.categoryId
    }

    if(product.currentPrice != data?.currentPrice){
      finalValues.currentPrice=data?.currentPrice
    }

    if(product.introduction != data?.introduction){
      finalValues.introduction=data?.introduction
    }
    if(product.description != data?.description){
      finalValues.description=data?.description
    }

    if(product.quantity != data?.quantity){
      finalValues.quantity=data?.quantity
    }


    if(!checkEqualArray(defaultColors, data.colors)){
      finalValues.colors=data.colors
    }
    if(!checkEqualArray(defaultSizes, data.sizes)){
      finalValues.sizes=data.sizes
    }
   
    if (Object.keys(finalValues).length === 0) {
      WarningToast("No changes detected. Please update at least one field before saving.");
    } else {
      //update the product
      updateProduct({
        id: product?._id,
        data: finalValues
      })
    }
   
  };

  return (
    <>
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
            disabled={categoryOptions.length === 0}
          />
          <CustomInput
            label="Current Price"
            name="currentPrice"
            type="text"
            control={control}
            placeholder="Enter price"
          />
          <CustomInput
            label="Original Price(optional)"
            name="originalPrice"
            type="text"
            control={control}
            placeholder="Enter price"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomMultiSelect name="colors" label="Colors (Optional)" control={control} options={colorOptions} disabled={isColorLoading || colorOptions?.length === 0} />
          <CustomMultiSelect name="sizes" label="Sizes (Optional)" control={control} options={sizeOptions} disabled={sizeOptions?.length === 0} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <CustomInput
            label="Quantity"
            name="quantity"
            type="text"
            control={control}
            placeholder="Enter quantity"
            onInput={(e: any) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
          />
          <CustomInput
            label="Discount (Optional)"
            name="discount"
            type="text"
            control={control}
            placeholder="Enter discount"
          />
        </div>
     

        <CustomQuilEditor
          label="Short Introduction"
          name="introduction"
          control={control}
          height={40}
          placeholder="Write a short intro..."
        />
        <CustomQuilEditor
          label="Description"
          name="description"
          control={control}
          height={250}
          placeholder="Write a description..."
        />
                  
        <button
          type="submit"
          className="w-full flex justify-center items-center gap-x-2 bg-primary hover:bg-primary/80 disabled:bg-primary/80 cursor-pointer text-white py-2 rounded-md font-semibold transition-colors duration-100"
        >
          {isLoading ? (
            <>
              <CgSpinnerTwo className="animate-spin" fontSize={16} />
              Processing...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </>
  );
};

export default UpdateProductForm;
