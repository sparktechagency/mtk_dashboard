import { Table, ConfigProvider, Pagination } from "antd";
import type { IMeta } from "../../types/global.type";
import type { IOrder, TOrderDataSource } from "../../types/order.type";


type TProps = {
  orders: IOrder[];
  meta: IMeta,
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
};


const AdminTable = ({ orders, meta, currentPage, setCurrentPage, pageSize, setPageSize }: TProps) => {

  const dataSource: TOrderDataSource[] = orders?.map((order, index) => ({
    key: index,
    serial: Number(index + 1) + ((currentPage - 1) * pageSize),
    _id: order?._id,
    token: order?.token,
    fullName: order?.fullName,
    email: order?.email,
    phone: order?.phone,
    status: order?.status,
    paymentStatus: order?.paymentStatus,
    createdAt: order?.createdAt
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
      dataIndex: "fullName",
      key: "fullName",
      width: "12.5%",
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "22.5%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "12.5%",
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   width: "15%",
    //   render: (status: TBlockStatus, record: IUser) => {
    //     const statusStyles = {
    //       blocked: "bg-red-100 text-red-700 border border-red-300",
    //       unblocked: "bg-green-100 text-green-700 border border-green-300",
    //     };

    //     const bgColor = status=== "blocked" ? statusStyles.blocked : statusStyles.unblocked;

    //     return (
    //       <div className="flex items-center gap-2">
    //         <button
    //           className={`${bgColor} w-20 cursor-default px-3 py-0.5 text-sm font-medium rounded-full`}
    //         >
    //           {status === "blocked" ?  "Blocked" : "Active"}
    //         </button>
    //         <ChangeStatusModal userId={record?._id} status={status}/>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: "Action",
    //   dataIndex: "_id",
    //   key: "action",
    //   width: "7%",
    //   render: (productId: string) => (
    //     <div className="flex items-center gap-2">
    //       <DeleteBlogModal blogId={productId} />
    //     </div>
    //   ),
    // },
  ];



  const handlePagination = (page: number, PageSize: number) => {
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
      {meta?.totalPages > 1 && (
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

export default AdminTable;
