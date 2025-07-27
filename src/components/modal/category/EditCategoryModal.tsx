import { Modal } from "antd";
import { useEffect, useState } from "react";
import ImageUpload from "../../form/ImageUpload";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { useUpdateCategoryMutation } from "../../../redux/features/category/categoryApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { categorySchema } from "../../../schemas/category.schema";
import type { z } from "zod";
import CustomInput from "../../form/CustomInput";
import { CgSpinnerTwo } from "react-icons/cg";
import { SetCategoryUpdateError } from "../../../redux/features/category/categorySlice";
import Error from "../../validation/Error";
import { Edit } from "lucide-react";
import type { ICategory } from "../../../types/category.type";
import icon_placeholder from "../../../assets/images/icon_placeholder.jpg";


type TFormValues = z.infer<typeof categorySchema>;

type TProps = {
  category: ICategory
}

const EditCategoryModal = ({ category }: TProps) => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { CategoryUpdateError } = useAppSelector((state) => state.category);
  const [ updateCategory, { isLoading, isSuccess }] = useUpdateCategoryMutation();
  const { handleSubmit, control, setValue, clearErrors, setError, formState: { errors } } = useForm<TFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category: category?.category,
      icon: category?.image
    }
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(category?.image || icon_placeholder);

  

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
      setModalOpen(false);
    }
  }, [isLoading, isSuccess]);


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    dispatch(SetCategoryUpdateError(""));
    const formData = new FormData();
    formData.append("category", data.category);
    if(image){
      formData.append("image", image as File);
    }
    updateCategory({
      id: category?._id,
      data: formData
    });
  };

  return (
    <>
       <button
        onClick={() => setModalOpen(true)}
        className="bg-green-600 hover:bg-green-700 p-2 text-white rounded-full"
      >
        <Edit size={18} />
      </button>

      <Modal
        open={modalOpen}
        onCancel={() => {
          setValue("category", category?.category);
          setPreview(category?.image || icon_placeholder);
          setModalOpen(false)
        }}
        maskClosable={false}
        footer={false}
      >
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
            <div className="p-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Update Category
              </h2>
               {CategoryUpdateError && <Error message={CategoryUpdateError} />}
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
                      "Save Changes"
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

export default EditCategoryModal;
