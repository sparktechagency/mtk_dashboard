import React, { useEffect, useState } from "react";
import ServerErrorCard from "../card/ServerErrorCard";
import ListLoading from "../loader/ListLoading";
import UserTable from "./UserTable";
import { useGetUsersQuery } from "../../redux/features/user/userApi";
import UserListHeader from "./UserListHeader";

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

  let content: React.ReactNode;

  if (isLoading) {
    content = <ListLoading />;
  }

  if (!isLoading && !isError) {
    content = (
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
    );
  }

  if (!isLoading && isError) {
    content = <ServerErrorCard />;
  }

  return (
    <>
      <UserListHeader meta={meta} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      {content}
    </>
  );
};

export default UserList;
