import { Table, ConfigProvider } from 'antd';
import { Eye } from 'lucide-react';
import { jobPostsData } from '../../data/jobPosts.data';



const SubscriberJobPostsTable = () => {
 
  const columns = [
    {
      title: "Serial No",
      dataIndex: "serialNo",
      key: "serialNo",
      width: 100,
    },
    {
      title: "Job Position",
      dataIndex: "jobPosition",
      key: "jobPosition",
    },
    {
      title: "Job Vacancy",
      dataIndex: "jobVacancy",
      key: "jobVacancy",
      width: 120,
    },
    {
      title: "Start Date Line",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date Line",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    //   render: (status: string) => {
    //     let color = ""
    //     if (status === "Active") color = "bg-green-100 text-green-800"
    //     else if (status === "Pending") color = "bg-blue-100 text-blue-800"
    //     else if (status === "Expired") color = "bg-red-100 text-red-800"

    //     return <Badge className={`${color} rounded-md px-2 py-1 text-xs font-medium`}>{status}</Badge>
    //   },
    },
    {
         title: 'Action',
         key: 'action',
         width: '15%',
         //className: 'bg-amber-50',
         render: () => (
           <div className="flex">
             <button className="text-gray-600 hover:text-gray-900">
               <Eye size={20} />
             </button>
           </div>
         ),
       },
  ]


  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: '#FEF3C7', // Amber-50 color
            headerColor: '#000000',
            rowHoverBg: '#F3F4F6', // Gray-100 color
            borderColor: '#E5E7EB', // Gray-200 color
          },
        },
      }}
    >
      <div className="w-full overflow-auto">
        <Table
          columns={columns}
          dataSource={jobPostsData?.slice(0,3)}
          pagination={false}
          rowKey="id"
          sticky
          scroll={{ y: 'calc(100vh - 265px)' }}
          className="employer-table"
        />
      </div>
    </ConfigProvider>
  );
};

export default SubscriberJobPostsTable;