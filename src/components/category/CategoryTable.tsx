import { Table, ConfigProvider } from "antd";
import EditCategoryModal from "../modal/category/EditCategoryModal";
import type { ICategory } from "../../types/category.type";
import { baseUrl } from "../../redux/features/api/apiSlice";
import DeleteCategoryModal from "../modal/category/DeleteCategoryModal";



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
      title: "Action",
      dataIndex: "_id",
      key: "action",
      width: "15%",
      render: (val: string, record: ICategory) => (
        <div className="flex items-center gap-3">
          <EditCategoryModal category={record}/>
          <DeleteCategoryModal categoryId={val}/>
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
