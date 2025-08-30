import React from "react";
import { Table, ConfigProvider, Pagination } from "antd";
import type { IMeta } from "../../types/global.type";
import getColorClassForDate from "../../utils/getColorClassForDate";
import type { ISubscriber, TSubscriberDataSource } from "../../types/subscriber.type";
import DeleteSubscriberModal from "../modal/subscriber/DeleteSubscriberModal";


interface SubscribeTableProps {
  subscriptions: ISubscriber[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}


const SubscriberTable : React.FC<SubscribeTableProps> = ({
  subscriptions,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  loading
}) => {

  const dataSource: TSubscriberDataSource[] = subscriptions?.map((subscription, index) => ({
    key: index,
    serial: Number(index + 1) + (currentPage - 1) * pageSize,
    _id: subscription?._id,
    email: subscription?.email,
    subscribedAt: subscription?.subscribedAt,
  }));

  const columns = [
    {
      title: "S.N.",
      dataIndex: "serial",
      key: "serial",
      width: 60,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Subscribe Date",
      dataIndex: "subscribedAt",
      key: "subscribedAt",
      width: 150,
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
      title: "Action",
      dataIndex: "_id",
      key: "action",
      width: 70,
      align: "center" as const,
      render: (val: string) => (  
          <DeleteSubscriberModal subscriberId={val} />
      ),
    },
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
          size="middle"
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey="_id"
          sticky
          scroll={{ y: "calc(100vh - 324px)" }}
          className="custom-table min-h-[calc(100vh-290px)]"
          loading={loading}
        />
      </div>
      {meta?.total > 1 && (
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
