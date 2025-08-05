import { Table, ConfigProvider } from "antd";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import type { IOrder, TDeliveryStatus, TOrderDataSource } from "../../types/order.type";
import ChangeOrderStatusModal from "../modal/order/ChangeOrderStatusModal";
import StatusBadge from "../order/StatusBadge";


type TProps = {
  orders: IOrder[];
};


const RecentOrderTable = ({ orders }: TProps) => {

  const dataSource: TOrderDataSource[] = orders?.map((order, index) => ({
    key: index,
    serial: Number(index + 1),
    _id: order?._id,
    token: order?.token,
    fullName: order?.fullName,
    email: order?.email,
    phone: order?.phone,
    status: order?.status,
    paymentStatus: order?.paymentStatus,
    totalPrice: order?.totalPrice,
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
      title: "Token",
      dataIndex: "token",
      key: "token",
      width: "8%",
      render: (text: string) => (
        <>
          <p className="font-bold">{text}</p>
        </>
      ),
    },
    {
      title: "Customer",
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
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status: TDeliveryStatus, record: IOrder) => {
        return (
          <div className="flex items-center gap-2">
             <StatusBadge status={status}/>
            <ChangeOrderStatusModal orderId={record?._id} status={status} />
          </div>
        );
      },
    },
    {
      title: "View",
      dataIndex: "_id",
      key: "_id",
      width: "5%",
      render: (orderId: string) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/order-details/${orderId}`}
            className="bg-gray-600 hover:bg-gray-700 p-2 text-white rounded-full"
          >
            <Eye size={18} />
          </Link>
        </div>
      ),
    },
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
    </ConfigProvider>
  );
};

export default RecentOrderTable;
