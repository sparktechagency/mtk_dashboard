import { Modal } from "antd";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import ImageUpload from "../../form/ImageUpload";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { useCreateCategoryMutation } from "../../../redux/features/category/categoryApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { categorySchema } from "../../../schemas/category.schema";
import type { z } from "zod";
import CustomInput from "../../form/CustomInput";
import { CgSpinnerTwo } from "react-icons/cg";
import { SetCategoryCreateError } from "../../../redux/features/category/categorySlice";
import Error from "../../validation/Error";

type TFormValues = z.infer<typeof categorySchema>;

const CreateCategoryModal = () => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { CategoryCreateError } = useAppSelector((state) => state.category);
  const [createCategory, { isLoading, isSuccess, reset }] = useCreateCategoryMutation();
  const { handleSubmit, control, setValue, clearErrors, setError, formState: { errors } } = useForm<TFormValues>({
    resolver: zodResolver(categorySchema),
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  

  useEffect(() => {
    if (image !=null) {
      setValue("icon", "This is icon");
      clearErrors("icon");
    }
  }, [image, setValue, setError, clearErrors]);



  const setIconError = () => {
    setValue("icon", "");
    setError("icon", {
      type: "manual",
      message: "Icon is required",
    });
  };


  //if success
   useEffect(() => {
    if (!isLoading && isSuccess) {
      setValue("category", "");
      setPreview(null)
      setImage(null)
      setModalOpen(false);
    }
  }, [isLoading, isSuccess, reset, setValue]);


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    dispatch(SetCategoryCreateError(""));
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("image", image as File);
    createCategory(formData);
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-2 bg-primary px-3 py-1.5 text-white cursor-pointer rounded-md hover:bg-[#2b4773] duration-200"
      >
        <FaPlus />
        Add New
      </button>
      <Modal
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setValue("category", "");
          setImage(null)
          setPreview(null)
        }}
        maskClosable={false}
        footer={false}
      >
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
            <div className="p-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Create Category
              </h2>
               {CategoryCreateError && <Error message={CategoryCreateError} />}
              <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInput
                  label="Category Title"
                  name="category"
                  type="text"
                  control={control}
                  placeholder="Enter title"
                />
                <div className="mb-6 mt-2">
                  <ImageUpload preview={preview} setPreview={setPreview} image={image} setImage={setImage} title="Category Icon" setIconError={setIconError}/>
                  {
                    errors?.icon && (
                      <p className="mt-1 text-sm text-red-500">{errors?.icon?.message}</p>
                    )
                  }
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-4 py-2 w-full rounded-lg text-white font-medium 
                  ${
                    isLoading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                  } transition-colors duration-200 flex items-center justify-center gap-x-2 focus:outline-none focus:ring-blue-500`}
                  >
                    {isLoading ? (
                      <>
                         <CgSpinnerTwo className="animate-spin" fontSize={16} />
                        Processing...
                      </>
                    ) : (
                      "Create Category"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateCategoryModal;
