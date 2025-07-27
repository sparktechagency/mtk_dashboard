/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, ConfigProvider } from "antd";
import EditCategoryModal from "../modal/category/EditCategoryModal";
import type { ICategory } from "../../types/category.type";
import icon_placeholder from "../../assets/images/icon_placeholder.jpg";
import { baseUrl } from "../../redux/features/api/apiSlice";



type TProps = {
  categories: ICategory[]
}

type TDataSource = {
  key: number;
  serial: number;
  _id: string;
  category: string;
  image: string;
}


const CategoryTable = ( { categories }: TProps) => {

  const dataSource: TDataSource[] = categories?.map((category, index)=> ({
        key: index,
        serial: Number(index+1),
        _id: category?._id,
        category: category?.category,
        image: baseUrl+category?.image
  }))

  const columns = [
    {
      title: "Serial No",
      dataIndex: "serial",
      key: "serial",
      width: "10%",
    },
    {
      title: "Title",
      dataIndex: "category",
      key: "category",
      width: "22.5%",
    },
    {
      title: "Icon",
      dataIndex: "image",
      key: "image",
      width: "17.5%",
      render: (val: string) => (
        <>
          {/* <img src={val} alt="icon" className="w-12 h-12 rounded-md" /> */}
           <img
            src={val || icon_placeholder}
            alt="profile"
            className="w-[45px] h-[45px] rounded-lg"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = icon_placeholder;
            }}
          />
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "15%",
      render: (_val: any, record: ICategory) => (
        <div className="flex items-center gap-2">
          <EditCategoryModal category={record}/>
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

export default CategoryTable;
