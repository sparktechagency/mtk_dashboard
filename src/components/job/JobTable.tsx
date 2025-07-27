import React from "react";
import { Table, ConfigProvider, Pagination } from "antd";
import type { IMeta } from "../../types/global.type";
import type { TJob, TJobDataSource } from "../../types/job.type";
import getFormattedDate from "../../utils/getFormattedDate";
import type { ColumnsType } from "antd/es/table";


interface JobTableProps {
  jobs: TJob[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}


const JobTable: React.FC<JobTableProps> = ({
  jobs,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
}) => {

  const dataSource: TJobDataSource[] = jobs?.map((job, index) => ({
    key: index,
    serial: Number(index + 1) + (currentPage - 1) * pageSize,
    _id: job?._id,
    title: job?.title,
    category: job?.category?.category,
    vacancies: job?.vacancies,
    status: job?.status,
    createdAt: job?.createdAt,
    application_dateline: job?.application_dateline
  }));


  const columns: ColumnsType<TJobDataSource> = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      width: "5%",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "22.5%",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "22.5%",
    },
    {
      title: "Vacancy",
      dataIndex: "vacancies",
      key: "vacancies",
      align: "center",
      width: "6%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      align: "center",
      render: (status: string) => (
        <button className={`w-20 py-1 ${status==="Active" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"}  text-xs sm:text-sm rounded-lg `}>
          {status}
        </button>
      ),
    },
    {
      title: "Posted Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "12%",
      render: (date: string) => <span>{getFormattedDate(date)}</span>,
    },
    {
      title: "Deadline",
      dataIndex: "application_dateline",
      key: "application_dateline",
      width: "12%",
      render: (date: string) => <span>{getFormattedDate(date)}</span>,
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   width: "5%",
    //   render: () => (
    //     <div className="flex justify-center">
    //       <button className="text-gray-600 hover:text-gray-900">
    //         <Eye size={20} />
    //       </button>
    //     </div>
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

export default JobTable;
