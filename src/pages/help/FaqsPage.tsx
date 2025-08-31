import React, { Suspense } from "react";
import FaqLoading from "../../components/loader/FaqLoading";
const FaqList = React.lazy(() => import("../../components/faq/FaqList"));


const FaqsPage = () => {
  return (
    <div className="p-6 mx-auto min-h-full bg-white rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">FAQs</h2>
      <Suspense fallback={<FaqLoading />}>
        <FaqList />
      </Suspense>
    </div>
  );
};

export default FaqsPage;