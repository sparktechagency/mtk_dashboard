import React, { Suspense, useEffect, useState } from "react";
import ServerErrorCard from "../card/ServerErrorCard";
import ListLoading from "../loader/ListLoading";
import { useGetUsersQuery } from "../../redux/features/user/userApi";

const UserTable = React.lazy(() => import("./UserTable"));
const UserListHeader = React.lazy(() => import("./UserListHeader"));


const UserList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isFetching, isError } = useGetUsersQuery([
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
        <Suspense fallback={<ListLoading/>}>
          <UserListHeader meta={meta} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
    return <ServerErrorCard />;
  }

};

export default UserList;
