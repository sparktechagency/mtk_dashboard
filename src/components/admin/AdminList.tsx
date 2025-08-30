import { useEffect, useState } from "react";
import ServerErrorCard from "../card/ServerErrorCard";
import ListLoading from "../loader/ListLoading";
import AdminTable from "./AdminTable";
import { useGetAdminsQuery } from "../../redux/features/admin/adminApi";
import AdminListHeader from "./AdminListHeader";

const AdminList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isFetching, isError } = useGetAdminsQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm },
  ]);

  //debounced handle
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(searchQuery);
      setCurrentPage(1)
    }, 600);

    return () => clearTimeout(timeoutId); // cleanup for debounce
  }, [searchQuery]);

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
