import { Modal } from "antd";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import CustomInput from "../../form/CustomInput";
import Error from "../../validation/Error";
import { useCreateColorMutation } from "../../../redux/features/color/colorApi";
import CustomColorField from "../../form/CustomColorField";
import { colorSchema } from "../../../schemas/color.schema";
import { SetColorCreateError } from "../../../redux/features/color/colorSlice";
import SubmitButton from "../../form/SubmitButton";

type TFormValues = z.infer<typeof colorSchema>;

const CreateColorModal = () => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { ColorCreateError } = useAppSelector((state) => state.color);
  const [createColor, { isLoading, isSuccess, reset }] = useCreateColorMutation();
  const { handleSubmit, control, setValue } = useForm<TFormValues>({
    resolver: zodResolver(colorSchema),
  });

  
  //if success
   useEffect(() => {
    if (!isLoading && isSuccess) {
      setValue("name", "");
      setValue("hexCode", "");
      setModalOpen(false);
    }
  }, [isLoading, isSuccess, reset, setValue]);


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    dispatch(SetColorCreateError(""));
    createColor(data);
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center justify-center gap-2 bg-primary px-4 py-2 text-white cursor-pointer rounded-md hover:bg-primary/70 duration-200"
      >
        <FaPlus />
        Add New
      </button>
      <Modal
        open={modalOpen}
        onCancel={() => {
          setValue("name", "");
          setValue("hexCode", "");
          setModalOpen(false);
          dispatch(SetColorCreateError(""));
        }}
        maskClosable={false}
        footer={false}
      >
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
            <div className="p-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Add Color
              </h2>
               {ColorCreateError && <Error message={ColorCreateError} />}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <CustomInput
                  label="Color Name"
                  name="name"
                  type="text"
                  control={control}
                  placeholder="Enter color name"
                />
                <CustomColorField
                  label="Choose Color"
                  name="hexCode"
                  control={control}
                  placeholder="Enter title"
                />
                <CustomInput
                  label="Color Hex Code"
                  name="hexCode"
                  type="text"
                  control={control}
                  placeholder="e.g., #fff or #ffffff"
                />
                <SubmitButton isLoading={isLoading} loadingTitle="Adding...">Add</SubmitButton>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateColorModal;
