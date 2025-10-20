import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import CustomQuilEditor from "../form/CustomQuilEditor";
import { policySchema } from "../../schemas/policy.schema";
import { useCreateUpdatePolicyMutation } from "../../redux/features/policy/policyApi";
import SubmitButton from "../form/SubmitButton";

type TFormValues = z.infer<typeof policySchema>;

type TProps = {
    description: string;
}

const UpdatePrivacyForm = ({ description }: TProps) => {
   const [createUpdatePolicy, { isLoading }] = useCreateUpdatePolicyMutation();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(policySchema),
    defaultValues: {
      description
    }
  });


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
   createUpdatePolicy({
      type: "privacy-policy",
      content: data.description
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomQuilEditor
          label="Description"
          name="description"
          control={control}
          height={500}
          placeholder="Write here..."
        />
        <SubmitButton isLoading={isLoading}>Save Change</SubmitButton>
      </form>
    </>
  );
};

export default UpdatePrivacyForm;
