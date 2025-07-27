import React from "react";
import { Table, ConfigProvider, Pagination } from "antd";
import ChangeStatusModal from "../modal/auth/ChangeStatusModal";
import type { TCandidataDataSource, TCandidate } from "../../types/candidate.type";
import type { IMeta } from "../../types/global.type";
import profile_placeholder from "../../assets/images/profile_placeholder.png";
import { baseUrl } from "../../redux/features/api/apiSlice";


interface CandidateTableProps {
  candidates: TCandidate[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}


const CandidateTable: React.FC<CandidateTableProps> = ({
  candidates,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
}) => {

  const dataSource: TCandidataDataSource[] = candidates?.map((candidate, index) => ({
    key: index,
    serial: Number(index + 1) + (currentPage - 1) * pageSize,
    _id: candidate?._id,
    name: candidate?.name,
    email: candidate?.email,
    profile_image: candidate?.profile_image,
    is_block: candidate?.authId?.is_block
  }));


  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "22.5%",
    },
    {
      title: "Image",
      dataIndex: "profile_image",
      key: "profile_image",
      render: (val?:string) => {
        const imgPath = val ? baseUrl+val : "/images/profile_placeholder.png";
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
        )
      } 
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "22.5%",
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
            <ChangeStatusModal email={record.email} status={val} role="USER"/>
          </div>
        );
      },
    },
    // {
    //   title: "Action",
    //   key: "_id",
    //   width: "5%",
    //   render: (candidateId: string) => (
    //     <div className="flex justify-center">
    //       <Link to={`/candidate-details/${candidateId}`} className="text-gray-600 hover:text-gray-900">
    //         <Eye size={20} />
    //       </Link>
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

export default CandidateTable;
