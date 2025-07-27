/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import CustomInput from "../form/CustomInput";
import ConditionForm from "./ConditionForm";
import { useEffect, useState } from "react";
import { ErrorToast } from "../../helper/ValidationHelper";
import { planSchema } from "../../schemas/plan.schema";
import CustomSelect from "../form/CustomSelect";
import CustomTextArea from "../form/CustomTextArea";
import { useCreateSubscriptionMutation } from "../../redux/features/subscription/subscriptionApi";
import { CgSpinnerTwo } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

type TFormValues = z.infer<typeof planSchema>;


const AddPlanForm = () => {
  const navigate = useNavigate();
  const [conditions, setConditions] = useState<string[]>([])
  const [createPlan, { isLoading, isSuccess }] = useCreateSubscriptionMutation();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(planSchema),
  });


  useEffect(() => {
    if (!isLoading && isSuccess) {
      navigate("/packages")
    }
  }, [isLoading, isSuccess, navigate])


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
    </>
  );
};

export default AddPlanForm;
