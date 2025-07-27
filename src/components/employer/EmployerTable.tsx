import React from "react";
import { Table, ConfigProvider, Pagination } from "antd";
import ChangeStatusModal from "../modal/auth/ChangeStatusModal";
import type { IMeta } from "../../types/global.type";
import profile_placeholder from "../../assets/images/profile_placeholder.png";
import { baseUrl } from "../../redux/features/api/apiSlice";
import type { TEmployer, TEmployerDataSource } from "../../types/employer.type";


interface EmployerTableProps {
  employers: TEmployer[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}



const EmployerTable : React.FC<EmployerTableProps> = ({
  employers,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
}) => {

  const dataSource: TEmployerDataSource[] = employers?.map((employer, index) => ({
    key: index,
    serial: Number(index + 1) + (currentPage - 1) * pageSize,
    _id: employer?._id,
    name: employer?.name,
    email: employer?.email,
    profile_image: employer?.profile_image,
    subscription_status: employer?.subscription_status,
    companyName: employer?.company?.name || "",
    is_block: employer?.authId?.is_block
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
      //width: "15%",
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
      render: (val: string) => (
        <p className="truncate">{val}</p>
      )
    },
     {
      title: "Status",
      dataIndex: "is_block",
      key: "is_block",
      width: "15%",
      render: (val: boolean, record: { email: string; }) => {
        const statusStyles = {
          blocked: "bg-red-100 text-red-700 border border-red-300",
          active: "bg-green-100 text-green-700 border border-green-300",
        };

        const bgColor = val ? statusStyles.blocked : statusStyles.active;

        return (
          <div className="flex items-center gap-2">
            <button
              className={`${bgColor} w-20 cursor-default px-3 py-0.5 text-sm font-medium rounded-full`}
            >
              {val ?  "Blocked" : "Active"}
            </button>
            <ChangeStatusModal email={record.email} status={val} role="EMPLOYER"/>
          </div>
        );
      },
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
    // {
    //   title: "Action",
    //   key: "action",
    //   width: "5%",
    //   //className: 'bg-amber-50',
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

export default EmployerTable;
