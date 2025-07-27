import BlogList from "../../components/blog/BlogList";

const BlogsPage = () => {

  return (
    <>
      <div>
        <div className="bg-white rounded-lg shadow h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
           <BlogList/>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogsPage