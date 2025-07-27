import { useParams } from "react-router-dom"
import UpdateBlogForm from "../../components/blog/UpdateBlogForm"
import BlogLoading from "../../components/loader/BlogLoading"
import { useGetSingleBlogQuery } from "../../redux/features/blog/blogApi"
import ServerErrorCard from "../../components/card/ServerErrorCard"

const EditBlogPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError} = useGetSingleBlogQuery(id);
  const blog = data?.data || {};

  if (isLoading) {
    return <BlogLoading />
  }

  if(!isLoading && isError){
    return <ServerErrorCard/>
  }

  if(!isLoading && !isError && !blog?._id){
    return <h1>Blog Not Found</h1>
  }

  if (!isLoading && !isError && blog?._id) {
    return (
      <>
        <div>
          <div className="bg-white rounded-lg shadow h-full overflow-hidden">
            <div className="w-full h-full flex flex-col">
              <div className="p-4 flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">
                  Update Blog
                </h1>
              </div>
              <div className="flex-1 overflow-hidden p-4">
                <UpdateBlogForm blog={blog} />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default EditBlogPage