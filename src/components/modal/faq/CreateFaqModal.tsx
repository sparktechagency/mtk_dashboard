import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { useCreateFaqMutation } from "../../../redux/features/faq/faqApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Error from "../../validation/Error";
import { SetCreateFaqError } from "../../../redux/features/faq/faqSlice";
import { faqSchema } from "../../../schemas/faq.schema";
import CustomTextArea from "../../form/CustomTextArea";
import SubmitButton from "../../form/SubmitButton";

type FormValues = z.infer<typeof faqSchema>;

const CreateFaqModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { CreateFaqError } = useAppSelector((state) => state.faq);
  const [createFaq, { isLoading, isSuccess }] = useCreateFaqMutation();
  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(faqSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      reset({
        question: "",
        answer: "",
      });
      dispatch(SetCreateFaqError(""));
      setModalOpen(false);
    }
  }, [isSuccess, reset, dispatch]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(SetCreateFaqError(""));
    createFaq(data);
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/70 transition"
      >
        + Add FAQ
      </button>
      <Modal
        open={modalOpen}
        onCancel={() => {
          reset({
            question: "",
            answer: "",
          });
          dispatch(SetCreateFaqError(""));
          setModalOpen(false);
        }}
        maskClosable={false}
        footer={false}
      >
        <form className="space-y-4 pt-5" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl font-semibold mb-4 text-center">Add New</h2>
          {CreateFaqError && <Error message={CreateFaqError} />}
          <CustomTextArea label="Question" name="question" control={control} placeholder="write a question..." />
          <CustomTextArea label="Answer" name="answer" rows={3} control={control} placeholder="write an answer..." />
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              type="button"
              onClick={() => {
                reset({
                  question: "",
                  answer: "",
                });
                dispatch(SetCreateFaqError(""));
                setModalOpen(false);
              }}
              className="border border-gray-400 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <SubmitButton isLoading={isLoading} loadingTitle="Adding...">Add</SubmitButton>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateFaqModal;
