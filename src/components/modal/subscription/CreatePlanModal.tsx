/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useCreateSubscriptionMutation } from "../../../redux/features/subscription/subscriptionApi";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { planSchema } from "../../../schemas/plan.schema";
import type { z } from "zod";
import { ErrorToast } from "../../../helper/ValidationHelper";
import CustomInput from "../../form/CustomInput";
import CustomSelect from "../../form/CustomSelect";
import CustomTextArea from "../../form/CustomTextArea";
import ConditionForm from "../../package/ConditionForm";
import { CgSpinnerTwo } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";

type TFormValues = z.infer<typeof planSchema>;


const CreatePlanModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [conditions, setConditions] = useState<string[]>([])
  const [createPlan, { isLoading, isSuccess }] = useCreateSubscriptionMutation();
  const { handleSubmit, control, setValue } = useForm({
    resolver: zodResolver(planSchema)
  });


  useEffect(() => {
    if (!isLoading && isSuccess) {
      setModalOpen(false);
      setValue("name", "");
      setValue("price", "");
      setValue("validation", "");
      setValue("notice", "");
      setConditions([])
    }
  }, [isLoading, isSuccess, setValue])


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    if (conditions?.length === 0) {
      ErrorToast("Please, add minimum one feature")
    }
    else {
       createPlan({
        ...data,
        conditions
      })
    }
  };
 
  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-2 bg-primary px-3 py-1.5 text-white cursor-pointer rounded-md hover:bg-[#2b4773] duration-200"
      >
        <FaPlus />
        Add New Plan
      </button>
      <Modal
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setValue("name", "");
          setValue("price", "");
          setValue("validation", "");
          setValue("notice", "");
          setConditions([])
        }}
        maskClosable={false}
        footer={false}
        width={600}
      >
        <div className="">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg">
              <h1 className="text-2xl font-semibold text-gray-900 mb-8">Add Plan</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-x-4">
          <CustomInput
            label="Name"
            name="name"
            type="text"
            control={control}
            placeholder="Enter plane name"
          />

          <CustomInput
            label="Price"
            name="price"
            type="text"
            control={control}
            placeholder="Enter price"
            onInput={(e: any) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
          />
        </div>
        <CustomSelect
          label="Validity"
          name="validation"
          control={control}
          options={[
            {
              label: "Monthly",
              value: "Monthly"
            },
            {
              label: "Yearly",
              value: "Yearly"
            }
          ]}
        />
        <CustomTextArea label="Notice" name="notice" control={control} placeholder="Write here..." />
        <ConditionForm conditions={conditions} setConditions={setConditions} />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 w-full bg-primary hover:bg-[#2b4773] disabled:bg-[#2b4773 disabled:cursor-not-allowed rounded-lg text-white font-medium 
 transition-colors duration-200 flex items-center justify-center gap-x-2 focus:outline-none`}
          >
            {isLoading ? (
              <>
                <CgSpinnerTwo className="animate-spin" fontSize={16} />
                Processing...
              </>
            ) : (
              "Save"
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

export default CreatePlanModal;
