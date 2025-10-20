import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useForgotPasswordResetMutation } from "../../redux/features/auth/authApi";
import { useForm, type SubmitHandler } from "react-hook-form";
import { resetPasswordSchema } from "../../schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SetResetPasswordError } from "../../redux/features/auth/authSlice";
import type { z } from "zod";
import Error from "../validation/Error";
import CustomInput from "../form/CustomInput";
import PasswordStrength from "../validation/PasswordStrength";
import { getEmail, getOtp } from "../../helper/SessionHelper";
import SubmitButton from "../form/SubmitButton";

type TFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
  const dispatch = useAppDispatch();
  const { ResetPasswordError } = useAppSelector((state) => state.auth);
  const [forgotPasswordReset, { isLoading }] = useForgotPasswordResetMutation();
  const { handleSubmit, control, watch, trigger } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const newPassword = watch("newPassword");

  useEffect(() => {
    if (newPassword) {
      const confirmPassword = watch("confirmPassword");
      if (confirmPassword === newPassword) {
        trigger("confirmPassword");
      }
    }
  }, [newPassword, watch, trigger]);

  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    dispatch(SetResetPasswordError(""));
    forgotPasswordReset({
      email: getEmail(),
      otp: getOtp(),
      password: data.newPassword
    });
  };


  return (
    <>
      {ResetPasswordError && <Error message={ResetPasswordError} />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomInput
          label="New Password"
          name="newPassword"
          type="password"
          control={control}
          placeholder="Enter new password"
        />
        {newPassword && <PasswordStrength password={newPassword} />}
        <CustomInput
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          control={control}
          placeholder="Enter new password"
        />
        <SubmitButton isLoading={isLoading}>Reset Password</SubmitButton>
      </form>
    </>
  );
};

export default ResetPasswordForm;
