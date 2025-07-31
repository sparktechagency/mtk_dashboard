import { Modal } from "antd";
import { useEffect, useState } from "react";
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


type TFormValues = z.infer<typeof categorySchema>;

type TProps = {
    productId: string
}

const UpdateProductImageModal = ({ productId }: TProps) => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { CategoryUpdateError } = useAppSelector((state) => state.category);
  const [ updateCategory, { isLoading, isSuccess }] = useUpdateCategoryMutation();
  const { handleSubmit, control, setValue} = useForm<TFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "name"
    }
  });



    //if success
   useEffect(() => {
    if (!isLoading && isSuccess) {
      setModalOpen(false);
    }
  }, [isLoading, isSuccess]);


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    dispatch(SetCategoryUpdateError(""));
    updateCategory({
      id: productId,
      data
    });
  };

  return (
    <>
      <Edit onClick={() => setModalOpen(true)} className="w-4 h-4 text-red-600 cursor-pointer" />

      <Modal
        open={modalOpen}
        onCancel={() => {
          setValue("name", "name");
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
                  label="Title"
                  name="name"
                  type="text"
                  control={control}
                  placeholder="Enter title"
                />
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-4 py-2 w-full rounded-lg text-white font-medium 
                  ${
                    isLoading
                      ? "bg-disabled cursor-not-allowed"
                      : "bg-primary hover:bg-disabled"
                  } transition-colors duration-200 flex items-center justify-center gap-x-2 focus:outline-none focus:ring-blue-500`}
                  >
                    {isLoading ? (
                      <>
                         <CgSpinnerTwo className="animate-spin" fontSize={16} />
                        Processing...
                      </>
                    ) : (
                      "Save Change"
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

export default UpdateProductImageModal;
