import { FileText } from "lucide-react"
import { useGetPolicyByTypeQuery } from "../../redux/features/policy/policyApi";
import PolicyLoading from "../../components/loader/PolicyLoading";
import React, { Suspense } from "react";

const UpdateAboutForm = React.lazy(() => import("../../components/policy/UpdateAboutForm"));

const AboutUsPage = () => {
  const { data, isLoading, isSuccess, isError } = useGetPolicyByTypeQuery("about-us");
  const about = data?.data;

  if (isLoading) {
    return <PolicyLoading />
  }
  if (!isLoading && isError) {
    return <h1>Server Error Occured</h1>
  }

  if (!isLoading && isSuccess && about?.type) {

    return (
      <Suspense fallback={<PolicyLoading />}>
        <div className="min-h-full bg-gray-50 py-4 sm:py-8 px-4 sm:px-6 lg:px-8 rounded-md">
          <div className="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white flex items-center">
                  <FileText className="mr-2" size={24} />
                  About Us
                </h1>
                {/* <div className="flex space-x-2">
              <button
                className="px-4 py-2 bg-white bg-opacity-20 rounded-md text-white text-sm font-medium hover:bg-opacity-30 transition-all flex items-center"
              >
                <FileText className="mr-1" size={16} /> Load Template
              </button>
            </div> */}
              </div>
            </div>
            <div className="p-6">
              <UpdateAboutForm description={about?.content} />
            </div>
          </div>
        </div>
      </Suspense>
    )
  }
}

export default AboutUsPage;
