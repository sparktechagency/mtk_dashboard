import React, { Suspense, useState } from "react";
import ServerErrorCard from "../card/ServerErrorCard";
import { useGetUsersQuery } from "../../redux/features/user/userApi";
import useDebounce from "../../hooks/useDebounce";
import TableLoading from "../loader/TableLoading";
import UserListHeader from "./UserListHeader";

const UserTable = React.lazy(() => import("./UserTable"));


const UserList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { searchTerm } = useDebounce({searchQuery, setCurrentPage}) //search debounce handled
  const { data, isLoading, isFetching, isError } = useGetUsersQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm },
  ]);

  const users = data?.data || [];
  const meta = data?.meta || {};

  let content: React.ReactNode;

  if (isLoading) {
    content = <TableLoading />;
  }



  if (!isLoading && !isError) {
    content = (
      <>
        <Suspense fallback={<TableLoading/>}>   
          <div className="flex-1 overflow-hidden">
            <UserTable
              users={users}
              meta={meta}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              isFetching={isFetching}
            />
          </div>
        </Suspense>
      </>
    );
  }

  if (!isLoading && isError) {
    content = <ServerErrorCard />;
  }

  return (
    <>
      <UserListHeader meta={meta} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {content}
    </>
  )

};

export default UserList;
