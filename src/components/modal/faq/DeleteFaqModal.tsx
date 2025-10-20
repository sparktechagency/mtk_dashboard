import { Modal } from "antd";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDeleteFaqMutation } from "../../../redux/features/faq/faqApi";
import DeleteButton from "../../form/DeleteButton";


type TProps = {
  faqId : string
}


const DeleteFaqModal = ({ faqId }: TProps) => {
   const [ modalOpen, setModalOpen ] = useState(false);
   const [ deleteFaq, { isLoading, isSuccess, isError }] = useDeleteFaqMutation();

    useEffect(()=> {
        if(isSuccess || isError){
          setModalOpen(false)
        }
    },[isSuccess, isError])
   
    const handleDelete = () => {
        deleteFaq(faqId);
    }

  return (
    <>
      <button onClick={()=> setModalOpen(true)} className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100 transition">
        <FiTrash2 className="text-red-500" size={20} />
      </button>
      <Modal
        title="Are you sure, you want to delete?"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
        closable={false}
      >
        <div className="flex justify-end px-4 gap-x-3">
          <button
            onClick={() => setModalOpen(false)}
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            No
          </button>
         <DeleteButton onClick={handleDelete} isLoading={isLoading}/>
        </div>
      </Modal>
    </>
  );
}

export default DeleteFaqModal;