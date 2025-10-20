import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import CustomInput from "../../form/CustomInput";
import Error from "../../validation/Error";
import { Edit } from "lucide-react";
import type { IColor } from "../../../types/color.type";
import { useUpdateColorMutation } from "../../../redux/features/color/colorApi";
import CustomColorField from "../../form/CustomColorField";
import { colorSchema } from "../../../schemas/color.schema";
import { SetColorUpdateError } from "../../../redux/features/color/colorSlice";
import SubmitButton from "../../form/SubmitButton";


type TFormValues = z.infer<typeof colorSchema>;

type TProps = {
  color: IColor
}

const EditColorModal = ({ color }: TProps) => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { ColorUpdateError } = useAppSelector((state) => state.color);
  const [ updateColor, { isLoading, isSuccess }] = useUpdateColorMutation();
  const { handleSubmit, control, setValue} = useForm<TFormValues>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: color?.name,
      hexCode: color?.hexCode
    }
  });



    //if success
   useEffect(() => {
    if (!isLoading && isSuccess) {
      setModalOpen(false);
    }
  }, [isLoading, isSuccess]);


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    dispatch(SetColorUpdateError(""));
    updateColor({
      id: color?._id,
      data
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
          setValue("name", color?.name);
          setModalOpen(false)
        }}
        maskClosable={false}
        footer={false}
      >
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
            <div className="p-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Update Color
              </h2>
               {ColorUpdateError && <Error message={ColorUpdateError} />}
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
                <SubmitButton isLoading={isLoading} >Save Changes</SubmitButton>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditColorModal;
