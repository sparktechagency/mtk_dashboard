import React, { Suspense } from "react";
import FaqLoading from "../../components/loader/FaqLoading";
import CreateFaqModal from "../../components/modal/faq/CreateFaqModal";
const FaqList = React.lazy(() => import("../../components/faq/FaqList"));


const FaqsPage = () => {
  return (
    <div className="p-6 mx-auto min-h-full bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">FAQs</h2>
        <CreateFaqModal />
      </div>
      <Suspense fallback={<FaqLoading />}>
        <FaqList />
      </Suspense>
    </div>
  );
};

export default FaqsPage;