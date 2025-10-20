import { Modal } from "antd";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import { replySchema } from "../../../schemas/contact.schema";
import { useReplyContactMutation } from "../../../redux/features/contact/contactApi";
import CustomTextArea from "../../form/CustomTextArea";
import { Reply } from "lucide-react";
import SubmitButton from "../../form/SubmitButton";

type TFormValues = z.infer<typeof replySchema>;

type TProps = {
    contactId: string
}

const ReplyModal = ({ contactId }: TProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [reply, { isLoading, isSuccess, reset }] = useReplyContactMutation();
  const { handleSubmit, control, setValue, } = useForm<TFormValues>({
    resolver: zodResolver(replySchema),
  });

  
  //if success
   useEffect(() => {
    if (!isLoading && isSuccess) {
      setValue("replyText", "");
      setModalOpen(false);
    }
  }, [isLoading, isSuccess, reset, setValue]);


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    reply({
      id: contactId,
      data: data,
    });
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 p-2 text-white rounded-full"
      >
        <Reply size={18} />
      </button>
      <Modal
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setValue("replyText", "");
        }}
        maskClosable={false}
        footer={false}
      >
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
            <div className="p-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Reply Message
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <CustomTextArea
                  label="Message"
                  name="replyText"
                  control={control}
                  placeholder="write a message..."
                />
                <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ReplyModal;
