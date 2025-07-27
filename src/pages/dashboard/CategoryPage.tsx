import CategoryList from "../../components/category/CategoryList"
import CreateCategoryModal from "../../components/modal/category/CreateCategoryModal"

const CategoryPage = () => {
  return (
    <>
      <div>
        <div className="bg-white rounded-lg shadow h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <div className="p-4 flex justify-between">
              <h1 className="text-xl font-medium text-gray-800">
                Category List
              </h1>
              <CreateCategoryModal/>
            </div>
            <div className="flex-1 overflow-hidden">
              <CategoryList />
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  )
}

export default CategoryPage