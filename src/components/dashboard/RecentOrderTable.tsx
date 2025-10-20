import { Table, ConfigProvider } from "antd";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import type { IOrder, TDeliveryStatus, TOrderDataSource, TPaymentStatus } from "../../types/order.type";
import ChangeOrderStatusModal from "../modal/order/ChangeOrderStatusModal";
import StatusBadge from "../order/StatusBadge";
import ViewPaymentIdModal from "../modal/order/ViewPaymentIdModal";


type TProps = {
  orders: IOrder[];
  loading: boolean;
};


const RecentOrderTable = ({ orders, loading }: TProps) => {

  const dataSource: TOrderDataSource[] = orders?.map((order, index) => ({
    key: index,
    serial: Number(index + 1),
    _id: order?._id,
    token: order?.token,
    fullName: order?.fullName,
    paymentId: order?.paymentId,
    email: order?.email,
    phone: order?.phone,
    status: order?.status,
    paymentStatus: order?.paymentStatus,
    totalPrice: order?.totalPrice,
    stripeFee: order?.stripeFee,
    netAmount: order?.netAmount,
    createdAt: order?.createdAt
  }));



  const columns = [
    {
      title: "S.N.",
      dataIndex: "serial",
      key: "serial",
      width: 60,
    },
    {
      title: "Token",
      dataIndex: "token",
      key: "token",
      width: 90,
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
      width: 150,
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
      width: 220,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Payment ID",
      dataIndex: "paymentId",
      key: "paymentId",
      width: 110,
      render: (paymentId: string) => (
        <>
          <div className="flex gap-2 items-center">
            {paymentId ? (
              <p className="truncate">{paymentId.slice(0, 7) + "..."}</p>
            ) : (
              <p className="text-gray-400 italic">N/A</p>
            )}
            <ViewPaymentIdModal paymentId={paymentId} />
          </div>
        </>
      ),
    },
    {
      title: "Amount",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 90,
      align: "center" as const,
      render: (val: number) => (
        <span>${val}</span>
      )
    },
      {
      title: "Stripe Fee",
      dataIndex: "stripeFee",
      key: "stripeFee",
      width: 90,
      align: "center" as const,
      render: (val: number) => (
        <>
          {val ? `$${val}` : 'N/A'}
        </>
      )
    },
    {
      title: "Net Amount",
      dataIndex: "netAmount",
      key: "netAmount",
      width: 90,
      align: "center" as const,
      render: (val: number) => (
        <>
          {val ? `$${val}` : 'N/A'}
        </>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 160,
      render: (status: TDeliveryStatus, record: IOrder) => {
        return (
          <div className="flex items-center gap-2">
            <StatusBadge status={status} />
            <ChangeOrderStatusModal orderId={record?._id} status={status} />
          </div>
        );
      },
    },
     {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: 120,
      render: (paymentStatus: TPaymentStatus) => {
        const statusStyles = {
          unpaid: "bg-purple-100 text-purple-700 border border-purple-300",
          paid: "bg-green-100 text-green-700 border border-green-300",
          failled: "bg-red-100 text-red-700 border border-red-300",
        };

        const style = statusStyles[paymentStatus] || "bg-gray-100 text-gray-700 border";
        return (
          <div className="flex items-center gap-2">
            <span
              className={`${style} w-20 capitalize text-center px-3 py-0.5 text-sm font-medium rounded-full`}
            >
              {paymentStatus}
            </span>
          </div>
        );
      }
    },
    {
      title: "View",
      dataIndex: "_id",
      key: "_id",
      width: 80,
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
      <div className="w-full overflow-auto overflow-x-auto">
        <Table
          size="small"
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey="_id"
          sticky
          className="custom-table"
          scroll={{x:"max-content"}}
          loading={loading}
        />
      </div>
    </ConfigProvider>
  );
};

export default RecentOrderTable;
