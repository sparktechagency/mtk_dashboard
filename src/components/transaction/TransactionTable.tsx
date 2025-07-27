import React from "react";
import { Table, ConfigProvider, Pagination } from "antd";
import type { IMeta } from "../../types/global.type";
import getColorClassForDate from "../../utils/getColorClassForDate";
import type { TTransaction, TTransactionDataSource } from "../../types/transaction.type";
import type { ColumnType } from "antd/es/table";


interface TransactionTableProps {
  transactions: TTransaction[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

const TransactionTable : React.FC<TransactionTableProps> = ({
  transactions,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
}) => {

  const dataSource: TTransactionDataSource[] = transactions?.map((transaction, index) => ({
    key: index,
    serial: Number(index + 1) + (currentPage - 1) * pageSize,
    _id: transaction?._id,
    name: transaction?.userId?.name,
    email: transaction?.userId?.email,
    plan: transaction?.subscriptionId?.name,
    amount: transaction?.amount,
    paymentStatus: transaction?.paymentStatus,
    createdAt: transaction?.createdAt,
  }));

  const columns: ColumnType<TTransactionDataSource>[] = [
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "17%",
    },
    {
      title: "Subscription Plan",
      dataIndex: "plan",
      key: "plan",
      width: "15%",
      align: "center"
    },
    {
      title: "Amount($)",
      dataIndex: "amount",
      key: "amount",
      width: "12.5%",
      align:"center"
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: "20%",
      render: (text: string) => (
        <>
          <p>{text}</p>
        </>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "12%",
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

export default TransactionTable;
