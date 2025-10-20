import { Modal } from "antd";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useDeleteAdminMutation } from "../../../redux/features/admin/adminApi";
import DeleteButton from "../../form/DeleteButton";

type TProps = {
  userId: string;
};

const DeleteAdminModal = ({ userId }: TProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [deleteAdmin, { isLoading, isSuccess }] =
    useDeleteAdminMutation();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setModalOpen(false);
    }
  }, [isLoading, isSuccess]);


  const handleDelete = () => {
    deleteAdmin(userId);
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-red-600 hover:bg-red-700 p-2 text-white rounded-full"
      >
        <Trash2 size={18} />
      </button>

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
        closable={false}
      >
        <div className="rounded-md">
          <div className="">
            <div className="flex justify-between items-center">
              <h3 className="text-lg sm:text-xl font-semibold">
                Are you sure, you want to delete?
              </h3>
            </div>
          </div>
          <div>
            <div className="flex justify-end space-x-2 pt-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 cursor-pointer border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                No
              </button>
               <DeleteButton onClick={handleDelete} isLoading={isLoading}/>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteAdminModal;
