import { Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import { Edit, Plus, X } from "lucide-react";
import { ErrorToast } from "../../../helper/ValidationHelper";
import { useUpdateProductImgMutation } from "../../../redux/features/product/productApi";
import CustomButton from "../../form/CustomButton";



type TProps = {
  productId: string
}

const UpdateProductImageModal = ({ productId }: TProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateProductImg, { isLoading, isSuccess }] = useUpdateProductImgMutation();


  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles = Array.from(files)
      const remainingSlots = 5 - selectedFiles.length
      const filesToAdd = newFiles.slice(0, remainingSlots)

      if (filesToAdd.length > 0) {
        setSelectedFiles((prev) => [...prev, ...filesToAdd])
      }

      // Reset the input value to allow selecting the same files again
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const removeFile = (indexToRemove: number) => {
    setSelectedFiles((prev) => prev.filter((_, index) => index !== indexToRemove))
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const getImageUrl = (file: File) => {
    return URL.createObjectURL(file)
  }



  //if success
  useEffect(() => {
    if (!isLoading && isSuccess) {
      setModalOpen(false);
      setSelectedFiles([]);
    }
  }, [isLoading, isSuccess]);


  const handleSubmit = () => {
    if (selectedFiles?.length === 0) {
      ErrorToast("Select minimum one image")
    } else {

      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("image", file));
      updateProductImg({
        id: productId,
        data: formData
      })
    }
  };

  return (
    <>
      <Edit onClick={() => setModalOpen(true)} className="w-4 h-4 text-red-600 cursor-pointer" />

      <Modal
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false)
        }}
        maskClosable={false}
        footer={false}
        width={600}
      >
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
            <div className="p-2">
              <div className="max-w-xl">
                <h2 className="text-xl font-bold mb-6">Upload Images</h2>

                {/* Hidden file input */}
                <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleFileSelect} className="hidden" />

                {/* Upload button */}
                <button
                  onClick={triggerFileInput}
                  type="button"
                  disabled={selectedFiles.length >= 5}
                  className={`mb-6 px-6 py-2 rounded-lg transition-colors flex items-center gap-2 ${selectedFiles.length >= 5
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : "bg-cyan-500 text-white hover:bg-cyan-600"
                    }`}
                >
                  <Plus className="w-5 h-5" />
                  Add Images
                </button>

                {/* Image previews */}
                {selectedFiles.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={getImageUrl(file) || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => removeFile(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Empty state */}
                {selectedFiles.length === 0 && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="text-gray-400 mb-4">
                      <Plus className="w-12 h-12 mx-auto mb-4" />
                      <p className="text-lg">No images selected</p>
                      <p className="text-sm">Click "Add Images" to upload files</p>
                    </div>
                  </div>
                )}

              </div>
             <CustomButton isLoading={isLoading} onClick={handleSubmit}>Save Changes</CustomButton>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdateProductImageModal;
