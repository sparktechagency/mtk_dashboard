"use client";

import AddPlanForm from "../../components/package/AddPlanForm";

const CreatePlanPackage = () => {

  return (
    <div className="min-h-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">Add New Plan</h1>
          <AddPlanForm />
        </div>
      </div>
    </div>
  )

}

export default CreatePlanPackage;
