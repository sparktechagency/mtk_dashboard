import { Modal, message } from "antd"
import { useState } from "react"
import { Eye, Copy, Check } from "lucide-react"

type TProps = {
  paymentId: string
}

const ViewPaymentIdModal = ({ paymentId }: TProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentId)
    setCopied(true)
    message.success("Payment ID copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        disabled={!paymentId}
        className={`p-1 rounded-full transition-colors ${
          paymentId ? "bg-gray-100 hover:bg-gray-200 text-gray-700" : "bg-gray-50 text-gray-300 cursor-not-allowed"
        }`}
      >
        <Eye size={14} />
      </button>

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={null}
        centered
        width={420}
        styles={{
          content: {
            borderRadius: "12px",
            padding: "32px",
          },
        }}
      >
        <div className="space-y-6">
          {/* Header Section */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 mb-4">
              <Eye className="text-blue-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Payment ID</h2>
            <p className="text-sm text-gray-500 mt-1">User unique payment identifier</p>
          </div>

          {/* Payment ID Display */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">Payment ID</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-sm font-mono text-gray-900 break-all">{paymentId}</code>
              <button
                onClick={handleCopy}
                className="flex-shrink-0 p-2 hover:bg-gray-200 rounded-md transition-colors"
                title="Copy payment ID"
              >
                {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} className="text-gray-600" />}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ViewPaymentIdModal
