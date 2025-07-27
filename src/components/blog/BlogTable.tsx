import { Table, ConfigProvider, Pagination } from "antd";
import { Edit, Eye } from "lucide-react";
import DeleteBlogModal from "../modal/blog/DeleteBlogModal";
import type { IMeta } from "../../types/global.type";
import type { TBlog, TBlogDataSource } from "../../types/blog.type";
import { Link } from "react-router-dom";
import getCategory from "../../utils/getCategory";
import getCategoryColor from "../../utils/getCategoryColor";
import getColorClassForDate from "../../utils/getColorClassForDate";
import blog_placeholder from "../../assets/images/blog_placeholder.png";
import { baseUrl } from "../../redux/features/api/apiSlice";
import getBlogImgPath from "../../utils/getBlogImgPath";


type TProps = {
  blogs: TBlog[];
  meta: IMeta,
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
};


const BlogTable = ({ blogs, meta, currentPage, setCurrentPage, pageSize, setPageSize }: TProps) => {


    const dataSource: TBlogDataSource[] = blogs?.map((blog, index) => ({
      key: index,
      serial: Number(index+1) + ((currentPage-1)*pageSize),
      _id: blog?._id,
      title: blog?.title,
      category: blog?.category,
      descriptions: blog?.descriptions,
      image: blog?.image?.length > 0 ? baseUrl+ getBlogImgPath(blog?.image[0]) : blog_placeholder,
      createdAt: blog?.createdAt,
    }));



  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      width: "10%",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "20.5%",
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: "17.5%",
      render: (val: string) => (
        <>
          {/* <img src={val} alt="icon" className="w-12 h-12 rounded-md" /> */}
          <img
            src={val}
            alt="profile"
            className="w-[45px] h-[45px] rounded-lg"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = blog_placeholder;
            }}
            />
        </>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "15%",
      render: (category: string) => (
        <>
          <span
            className={`${getCategoryColor(
              category
            )} text-xs font-semibold px-3 py-1 rounded-full`}
          >
            {getCategory(category)}{" "}
          </span>
        </>
      ),
    },
    {
      title: "Published Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      render: (val: string) => {
        const { bg, text, border } = getColorClassForDate(val.split('T')[0]);
        return (
          <button
            className={`text-sm px-2 py-1 rounded ${bg} ${text} ${border} border cursor-default`}
          >
            {val.split('T')[0]}
          </button>
        );
      },
    },
    {
      title: "View",
      dataIndex: "_id",
      key: "_id",
      width: "5%",
      render: (blogId: string) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/blog-details/${blogId}`}
            className="bg-gray-600 hover:bg-gray-700 p-2 text-white rounded-full"
          >
            <Eye size={18} />
          </Link>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      width: "7%",
      render: (blogId: string)  => (
        <div className="flex items-center gap-2">
          <Link
            to={`/update-blog/${blogId}`}
            className="bg-green-600 hover:bg-green-700 p-2 text-white rounded-full"
          >
            <Edit size={18} />
          </Link>
          <DeleteBlogModal blogId={blogId} />
        </div>
      ),
    },
  ];



  const handlePagination = (page:number, PageSize:number) => {
    setCurrentPage(page);
    setPageSize(PageSize)
  }



  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#FEF3C7", // Amber-50 color
            headerColor: "#000000",
            rowHoverBg: "#F3F4F6", // Gray-100 color
            borderColor: "#E5E7EB", // Gray-200 color
          },
        },
      }}
    >
      <div className="w-full overflow-auto px-4">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey="_id"
          sticky
          scroll={{ y: "calc(100vh - 324px)" }}
          className="employer-table"
        />
      </div>
      {meta?.total > 0 && (
        <div className="p-8 bg-white shadow-md flex justify-center">
          <Pagination
            onChange={handlePagination}
            current={currentPage}
            pageSize={pageSize}
            total={meta?.total}
          />
        </div>
      )}
    </ConfigProvider>
  );
};

export default BlogTable;
