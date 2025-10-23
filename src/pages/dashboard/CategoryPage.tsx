import CategoryList from "../../components/category/CategoryList"

const CategoryPage = () => {
  return (
    <>
      <div className="min-h-full bg-white rounded-md shadow">
          <div className="w-full h-full flex flex-col">
              <CategoryList />
          </div>
      </div>
    </>
  )
}

export default CategoryPage