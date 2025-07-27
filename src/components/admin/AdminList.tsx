import React, { useState } from "react";
import ServerErrorCard from "../card/ServerErrorCard";
import ListLoading from "../loader/ListLoading";
import AdminTable from "./AdminTable";
import { useGetAdminsQuery } from "../../redux/features/admin/adminApi";
import CreateAdminModal from "../modal/admin/CreateAdminModal";

const AdminList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isError } = useGetAdminsQuery(undefined);


  const admins = data?.data || [];
  const meta = data?.data?.meta || {};

  let content: React.ReactNode;

  if (isLoading) {
    content = <ListLoading />;
  }

  if (!isLoading && !isError) {
    content = (
      <div className="flex-1 overflow-hidden">
        <AdminTable
          admins={admins}
          meta={meta}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
    );
  }

  if (!isLoading && isError) {
    content = <ServerErrorCard />;
  }

  return (
    <>
      <div className="p-4 flex justify-between">
        <h1 className="text-xl font-medium text-gray-800">
          Admin List
        </h1>
       <CreateAdminModal/>
      </div>
      {content}
    </>
  );
};

export default AdminList;
