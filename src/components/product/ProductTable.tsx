import { Table, ConfigProvider, Pagination } from "antd";
import { Edit, Eye } from "lucide-react";
import DeleteBlogModal from "../modal/blog/DeleteBlogModal";
import type { IMeta } from "../../types/global.type";
import { Link } from "react-router-dom";
import blog_placeholder from "../../assets/images/blog_placeholder.png";
import type { IProduct, TProductDataSource } from "../../types/product.type";
import { FaStar } from "react-icons/fa";
import ChangeStatusModal from "../modal/auth/ChangeStatusModal";
import type { IUser, TBlockStatus } from "../../types/user.type";


type TProps = {
  products: IProduct[];
  meta: IMeta,
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
};


const ProductTable = ({ products, meta, currentPage, setCurrentPage, pageSize, setPageSize }: TProps) => {

    const dataSource: TProductDataSource[] = products?.map((product, index) => ({
      key: index,
      serial: Number(index+1) + ((currentPage-1)*pageSize),
      _id: product?._id,
      name: product?.name,
      categoryName: product?.categoryName,
      currentPrice: product?.currentPrice,
      originalPrice: product?.originalPrice,
      image: product?.images?.length > 0 ? product?.images[0] : blog_placeholder,
      ratings: product?.ratings,
      status: product?.status
    }));



  const columns = [
    {
      title: "S.N.",
      dataIndex: "serial",
      key: "serial",
      width: "3%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "title",
      width: "12.5%",
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
      width: "7.5%",
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
      dataIndex: "categoryName",
      key: "categoryName",
      width: "10%",
    },
    {
      title: "Price",
      dataIndex: "currentPrice",
      key: "currentPrice",
      width: "5%",
      align: "center"
    },
    {
      title: "Original Price",
      dataIndex: "currentPrice",
      key: "currentPrice",
      width: "7%",
      align: "center"
    },
    {
      title: "Ratings",
      dataIndex: "ratings",
      key: "ratings",
      width: "10%",
      align: "center",
      render: (value: number) => (
        <>
          <div className="flex items-center gap-1 justify-center">
            <FaStar className="text-yellow-500" size={18} />
            <span>{value}</span>
          </div>
        </>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (status: TBlockStatus, record: IUser) => {
        const statusStyles = {
          blocked: "bg-red-100 text-red-700 border border-red-300",
          unblocked: "bg-green-100 text-green-700 border border-green-300",
        };

        const bgColor = status=== "blocked" ? statusStyles.blocked : statusStyles.unblocked;

        return (
          <div className="flex items-center gap-2">
            <button
              className={`${bgColor} capitalize w-20 cursor-default px-3 py-0.5 text-sm font-medium rounded-full`}
            >
              {status}
            </button>
            <ChangeStatusModal userId={record?._id} status={status}/>
          </div>
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

export default ProductTable;
