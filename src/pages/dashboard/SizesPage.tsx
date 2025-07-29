import CreateCategoryModal from "../../components/modal/category/CreateCategoryModal"
import SizeList from "../../components/size/SizeList"

const SizesPage = () => {
  return (
    <>
      <div>
        <div className="bg-white rounded-lg shadow h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <div className="p-4 flex justify-between">
              <h1 className="text-xl font-medium text-gray-800">
                Size List
              </h1>
              <CreateCategoryModal/>
            </div>
            <div className="flex-1 overflow-hidden">
              <SizeList />
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  )
}

export default SizesPage