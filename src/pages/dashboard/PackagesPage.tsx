import PackageList from "../../components/subscription/PackageList";
import CreatePlanModal from "../../components/modal/subscription/CreatePlanModal";

const PackagesPage = () => {
  return (
    <>
      <div>
        <div className="bg-white rounded-lg shadow h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <div className="p-4 flex justify-between">
              <h1 className="text-xl font-medium text-gray-800">
                Subscription List
              </h1>
             <CreatePlanModal/>
            </div>
            <div className="flex-1 overflow-hidden p-4">
              <PackageList />
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  )
}

export default PackagesPage;