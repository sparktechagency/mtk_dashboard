"use client";
import { Modal } from "antd";
import { useState } from "react";
import { Check, Eye } from "lucide-react";
import type { IPackage } from "../../../types/package.type";

type TProps = {
    plan: IPackage;
};

const ViewPlanModal = ({ plan }: TProps) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setModalOpen(true)}
                className="bg-gray-600 hover:bg-gray-700 p-2 text-white rounded-full"
            >
                <Eye size={18} />
            </button>


            <Modal
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                maskClosable={false}
                footer={false}
            >
                <div className="relative w-full mx-auto py-4">

                    {/* Main Card */}
                    <div className="bg-white rounded-2xl border-2 border-purple-200 p-6 sm:p-8 mt-4">
                        {/* Header */}
                        <div className="text-center mb-6">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{plan?.name}</h2>
                            <div className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                                {plan?.validation}
                            </div>
                        </div>

                        <div className="text-center mb-8">
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-4xl sm:text-5xl font-bold text-gray-900">${plan?.price}</span>
                                <span className="text-gray-500 text-lg">/{plan?.validation}</span>
                            </div>
                            <p className="text-purple-600 text-sm mt-2 font-medium">{plan?.notice}</p>
                        </div>

                        {/* Features */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Features:</h3>
                            <ul className="space-y-3">
                                {plan?.conditions?.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                                            <Check className="w-3 h-3 text-green-600" />
                                        </div>
                                        <span className="text-gray-700 text-sm sm:text-base leading-relaxed">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ViewPlanModal;
