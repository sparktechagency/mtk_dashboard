import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useForgotPasswordSendOtpMutation } from "../../redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { forgotPasswordSendOtpSchema } from "../../schemas/auth.schema";
import { useEffect } from "react";
import { SetForgotError } from "../../redux/features/auth/authSlice";
import type { z } from "zod";
import Error from "../validation/Error";
import CustomInput from "../form/CustomInput";
import SubmitButton from "../form/SubmitButton";

type TFormValues = z.infer<typeof forgotPasswordSendOtpSchema>;

const ForgotPasswordForm = () => {
   const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ForgotError } = useAppSelector((state) => state.auth);
  const [forgotPasswordSendOtp, { isLoading, isSuccess }] =
    useForgotPasswordSendOtpMutation();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(forgotPasswordSendOtpSchema),
  });


   useEffect(()=>{
      if(isSuccess){
        navigate("/auth/verify-otp");
      }
    }, [isSuccess, navigate])

  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    dispatch(SetForgotError(""));
    forgotPasswordSendOtp(data);
  };

  return (
    <>
   {ForgotError && <Error message={ForgotError} />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomInput
          label="Email"
          name="email"
          type="text"
          control={control}
          placeholder="Enter email address"
        />
        <SubmitButton isLoading={isLoading}>Continue</SubmitButton>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
