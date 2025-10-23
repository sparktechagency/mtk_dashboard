import { Table, ConfigProvider, Pagination } from "antd";
import EditCategoryModal from "../modal/category/EditCategoryModal";
import type { ICategory } from "../../types/category.type";
import DeleteCategoryModal from "../modal/category/DeleteCategoryModal";
import type { IMeta } from "../../types/global.type";
import { useEffect } from "react";



type TProps = {
  categories: ICategory[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}

type TDataSource = {
  key: number;
  serial: number;
  _id: string;
  name: string;
}


const CategoryTable = ({
  categories, meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  loading
}: TProps) => {

  const dataSource: TDataSource[] = categories?.map((category, index) => ({
    key: index,
    serial: Number(index + 1) + (meta.page - 1) * pageSize,
    _id: category?._id,
    name: category?.name
  }))

  //handle pagination after deleting last document of last page
  useEffect(() => {
    if (currentPage > meta.totalPages) {
      setCurrentPage(meta.totalPages)
    }
  }, [currentPage, meta, setCurrentPage])

  const columns = [
    {
      title: "S.N.",
      dataIndex: "serial",
      key: "serial",
      width: 60,
    },
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      width: 180,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      width: 115,
      render: (val: string, record: ICategory) => (
        <div className="flex items-center gap-3">
          <EditCategoryModal category={record} />
          <DeleteCategoryModal categoryId={val} />
        </div>
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
      <div className="w-full overflow-auto px-4 overflow-x-auto">
        <Table
          size="small"
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey="_id"
          sticky
          scroll={{ y: "calc(100vh - 265px)" }}
          className="custom-table min-h-[calc(100vh-290px)]"
          loading={loading}
        />
      </div>
      {meta?.totalPages > 1 && (
        <div className="p-8 bg-white border-t shadow-md flex justify-center">
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

export default CategoryTable;
