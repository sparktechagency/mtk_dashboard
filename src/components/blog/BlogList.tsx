import { useEffect, useState } from "react";
import { useGetBlogsQuery } from "../../redux/features/blog/blogApi";
import ServerErrorCard from "../card/ServerErrorCard";
import ListLoading from "../loader/ListLoading";
import BlogTable from "./BlogTable";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isError } = useGetBlogsQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm },
  ]);

 useEffect(() => {
  const timeoutId = setTimeout(() => {
    setSearchTerm(searchQuery);
  }, 600);

  return () => clearTimeout(timeoutId); // cleanup for debounce
}, [searchQuery]);


  const blogs = data?.data?.data || [];
  const meta = data?.data?.meta || {};

  let content: React.ReactNode;

  if (isLoading) {
    content = <ListLoading />;
  }

  if (!isLoading && !isError) {
    content = (
      <BlogTable
        blogs={blogs}
        meta={meta}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    );
  }

  if (!isLoading && isError) {
    content = <ServerErrorCard />;
  }

   return (
     <>
       <div className="p-4 flex justify-between">
         <h1 className="text-xl font-medium text-gray-800">Blog List</h1>
         <div className="flex items-center gap-12">
           <h1 className="text-lg">
             Total: <span className="font-bold"> {meta?.total} </span>
           </h1>
           <div className="relative w-72">
             <span className="absolute inset-y-0 left-3 flex items-center text-gray-700">
               <FaSearch size={16} />
             </span>
             <input
               type="text"
               placeholder="Search here..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
             />
           </div>
           <button
             onClick={() => navigate("/create-blog")}
             className="bg-primary px-3 py-1.5 text-white cursor-pointer rounded-md hover:bg-[#2b4773] duration-200"
           >
             {" "}
             Add New
           </button>
         </div>
       </div>
       {content}
     </>
   );
};

export default BlogList;
