/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, ConfigProvider } from "antd";
import type { IPackage } from "../../types/package.type";
import DeleteSubscriptionModal from "../modal/subscription/DeleteSubscriptionModal";
import EditPlanModal from "../modal/subscription/EditPlanModal";
import ViewPlanModal from "../modal/subscription/ViewPlanModal";


type TProps = {
  subscriptions: IPackage[]
}

type TDataSource = IPackage & {
  key: number;
  serial: number;
}


const PackageTable = ( { subscriptions }: TProps) => {

  const dataSource: TDataSource[]= subscriptions?.map((subscription, index)=> ({
        key: index,
        serial: Number(index+1),
        _id: subscription?._id,
        name: subscription?.name,
        duration: subscription?.duration,
        validation: subscription?.validation,
        price: subscription?.price,
        conditions: subscription?.conditions,
        notice: subscription?.notice
  }))

  const columns = [
    {
      title: "Serial No",
      dataIndex: "serial",
      key: "serial",
      width: "10%",
    },
    {
      title: "Plan Details",
      dataIndex: "name",
      key: "name",
      width: "15.5%",
    },
    {
      title: "Duration & Type",
      dataIndex: "duration",
      key: "duration",
      width: "15.5%",
      render: (_val: any, subscription: IPackage) => (
        <>
          <div>
            <div className="text-sm text-gray-900">
              {subscription.duration} days
            </div>
            <div className="text-sm text-gray-500">
              {subscription.validation}
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Price($)",
      dataIndex: "price",
      key: "price",
      width: "12.5%",
    },
    {
      title: "Features",
      dataIndex: "features",
      key: "features",
      width: "24.5%",
      render: (_val: any, subscription: IPackage) => (
        <>
          <div className="space-y-1">
            {subscription?.conditions
              .slice(
                0,
                2
              )
              .map((condition, index) => (
                <div
                  key={index}
                  className="text-sm text-gray-600 flex items-start"
                >
                  <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                  <span className="break-words">{condition}</span>
                </div>
              ))}
            {
              subscription?.conditions?.length > 2 && (
                <button>more</button>
              )
            }
          </div>
        </>
      ),
    },
    {
      title: "Notice",
      dataIndex: "notice",
      key: "notice",
      width: "17.5%",
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
     {
      title: "View",
      key: "view",
      width: "10%",
      render: (_: any, record: IPackage) => (
        <div className="flex items-center gap-2">
          <ViewPlanModal plan={record}/>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "15%",
      render: (_val: any, record: IPackage) => (
        <div className="flex items-center gap-2">
          <EditPlanModal plan={record}/>
          <DeleteSubscriptionModal subscriptionId={record?._id} />
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
      <div className="w-full overflow-auto">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey="_id"
          sticky
          scroll={{ y: "calc(100vh - 265px)" }}
          className="employer-table"
        />
      </div>
    </ConfigProvider>
  );
};

export default PackageTable;
