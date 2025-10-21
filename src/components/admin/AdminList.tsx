import { useState } from "react";
import ServerErrorCard from "../card/ServerErrorCard";
import ListLoading from "../loader/ListLoading";
import AdminTable from "./AdminTable";
import { useGetAdminsQuery } from "../../redux/features/admin/adminApi";
import AdminListHeader from "./AdminListHeader";
import useDebounce from "../../hooks/useDebounce";

const AdminList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { searchTerm } = useDebounce({searchQuery, setCurrentPage}) //search debounce handled
  const { data, isLoading, isFetching, isError } = useGetAdminsQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm },
  ]);


  const users = data?.data || [];
  const meta = data?.meta || {};


  if (isLoading) {
    return <ListLoading />;
  }

  if (!isLoading && !isError) {
    return (
      <>
        <AdminListHeader meta={meta} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="flex-1 overflow-hidden">
          <AdminTable
            users={users}
            meta={meta}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            loading={isFetching}
          />
        </div>
      </>
    );
  }

  if (!isLoading && isError) {
    return <ServerErrorCard />;
  }

};

export default AdminList;
