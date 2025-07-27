/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import type { IPackage } from "../../../types/package.type";
import { useNavigate } from "react-router-dom";
import { useUpdateSubscriptionMutation } from "../../../redux/features/subscription/subscriptionApi";
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

type TFormValues = z.infer<typeof planSchema>;

type TProps = {
  plan: IPackage
}

const EditPlanModal = ({ plan } : TProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [conditions, setConditions] = useState<string[]>([...plan.conditions])
  const [updatePlan, { isLoading, isSuccess }] = useUpdateSubscriptionMutation();
  const { handleSubmit, control, setValue } = useForm({
    resolver: zodResolver(planSchema),
    defaultValues: {
        name: plan?.name,
        price: plan?.price.toString(),
        validation: plan?.validation,
        notice: plan?.notice
    }
  });


  useEffect(() => {
    if (!isLoading && isSuccess) {
      setModalOpen(false)
    }
  }, [isLoading, isSuccess, navigate])


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    if (conditions?.length === 0) {
      ErrorToast("Please, add minimum one feature")
    }
    else {
        updatePlan({
            id: plan?._id,
            data: {
                ...data,
                conditions
            }
        })
    }
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
          setModalOpen(false);
          setValue("name", plan?.name);
          setValue("price", plan?.price.toString());
          setValue("validation", plan?.validation);
          setValue("notice", plan?.notice);
          setConditions(plan?.conditions)
        }}
        maskClosable={false}
        footer={false}
        width={600}
      >
        <div className="">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg">
              <h1 className="text-2xl font-semibold text-gray-900 mb-8">Update Plan</h1>
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

export default EditPlanModal;
