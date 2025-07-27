import React from "react";
import { Table, ConfigProvider, Pagination } from "antd";
import type { IMeta } from "../../types/global.type";
import type { TSubscriber, TSubscriberDataSource } from "../../types/subscriber.type";
import { baseUrl } from "../../redux/features/api/apiSlice";
import profile_placeholder from "../../assets/images/profile_placeholder.png";
import getFormattedDate from "../../utils/getFormattedDate";


interface CandidateTableProps {
  subscribers: TSubscriber[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}


const SubscriberTable : React.FC<CandidateTableProps> = ({
  subscribers,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
}) => {

  const dataSource: TSubscriberDataSource[] = subscribers?.map((subscriber, index) => ({
    key: index,
    serial: Number(index + 1) + (currentPage - 1) * pageSize,
    _id: subscriber?._id,
    name: subscriber?.name,
    email: subscriber?.email,
    profile_image: subscriber?.profile_image,
    subscription_status: subscriber?.subscription_status,
    duration_time: subscriber?.duration_time,
    companyName: subscriber?.company?.name || "" 
  }));

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      width: "5%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "Image",
      dataIndex: "profile_image",
      key: "profile_image",
      render: (val?: string) => {
        const imgPath = val ? baseUrl + val : "/images/profile_placeholder.png";
        return (
          <div className="flex items-center gap-2">
            <img
              src={imgPath || profile_placeholder}
              alt="profile"
              className="w-[45px] h-[45px] rounded-lg"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = profile_placeholder;
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "17%",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      render: (val: string) => <p className="truncate">{val}</p>,
    },
    {
      title: "Subscription Status",
      dataIndex: "subscription_status",
      key: "subscription_status",
      width: "15%",
      render: (subscription_status: string) => {
        return (
          <div className="w-full">
            {subscription_status === "Active" && (
              <span className="px-3 py-1 text-xs font-medium rounded-full text-blue-700 bg-blue-100 border border-blue-300">
                Active
              </span>
            )}
            {subscription_status === "None" && (
              <span className="px-3 py-1 text-xs font-medium rounded-full text-gray-600 bg-gray-100 border border-gray-300">
                None
              </span>
            )}
            {subscription_status === "Expired" && (
              <span className="px-3 py-1 text-xs font-medium rounded-full text-yellow-700 bg-yellow-100 border border-yellow-300">
                Expired
              </span>
            )}
          </div>
        );
      },
    },
    {
      title: "Duration Time",
      dataIndex: "duration_time",
      key: "duration_time",
      width: "10%",
      render: (time: string) => <span>{getFormattedDate(time)}</span>,
    },
    // {
    //   title: "Action",
    //   key: "_id",
    //   dataIndex: "_id",
    //   width: "10%",
    //   align: "center" as const,
    //   render: () => (
    //     <button className="bg-gray-600 hover:bg-gray-700 p-2 text-white rounded-full">
    //       <Eye size={18} />
    //     </button>
    //   ),
    // },
  ];

  const handlePagination = (page: number, PageSize: number) => {
    setCurrentPage(page);
    setPageSize(PageSize);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#FEF3C7",
            headerColor: "#000000",
            rowHoverBg: "#F3F4F6",
            borderColor: "#E5E7EB",
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

export default SubscriberTable;
