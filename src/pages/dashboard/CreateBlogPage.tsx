import CreateBlogForm from "../../components/blog/CreateBlogForm"

const CreateBlogPage = () => {
  return (
    <>
      <div>
        <div className="bg-white rounded-lg shadow h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <div className="p-4 flex justify-between">
              <h1 className="text-xl font-medium text-gray-900">
                Add New Blog
              </h1>
            </div>
            <div className="flex-1 overflow-hidden p-4">
              <CreateBlogForm/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateBlogPage