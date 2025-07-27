"use client";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import CustomInput from "../form/CustomInput";
import { CgSpinnerTwo } from "react-icons/cg";
import { updateAdminSchema } from "../../schemas/admin.schema";
import type { TAuthAdmin } from "../../types/admin.type";
import { useUpdateAdminProfileMutation } from "../../redux/features/auth/authApi";

type TFormValues = z.infer<typeof updateAdminSchema>;

type TProps = {
  file: File | null;
  admin: TAuthAdmin | null
}

const ProfileForm = ({ admin, file }: TProps) => {
  const [updateProfile, { isLoading }] = useUpdateAdminProfileMutation();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(updateAdminSchema),
    defaultValues: {
      name: admin?.name || "",
      phone_number: admin?.contact || "" 
    }
  });


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    //changePassword(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("contact", data.phone_number);

    if (file !== null) {
      formData.append("profile_image", file);
    }
    updateProfile(formData)
  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomInput
          label="Name"
          name="name"
          type="text"
          control={control}
          placeholder="Enter full name"
        />
        <div>
          <label
            htmlFor="Email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            value={admin?.email}
            disabled
            placeholder="Enter Email Address"
            className="w-full mt-1 border disabled:bg-gray-200 focus:outline-none rounded-md px-4 py-2 pr-10 
                        border-gray-300 focus:border-blue-500
                    "
          />
        </div>


        <CustomInput
          label="Phone Number(only UK)"
          name="phone_number"
          type="text"
          control={control}
          placeholder="e.g., +44 20 1234 5678 or 020 1234 5678"
        />
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
    </>
  );
};

export default ProfileForm;
