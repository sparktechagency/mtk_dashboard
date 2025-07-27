/* eslint-disable prefer-const */
import React, { useEffect, useState } from "react";
import ServerErrorCard from "../card/ServerErrorCard";
import ListLoading from "../loader/ListLoading";
import { FaSearch } from "react-icons/fa";
import SubscriberTable from "./SubscriberTable";
import { useGetSubscribersQuery } from "../../redux/features/subscription/subscriptionApi";

const SubscriberList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isError } = useGetSubscribersQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm },
  ]);

  //debounced handle
  useEffect(() => {
    let timeoutId;
    clearTimeout(timeoutId); 
    timeoutId = setTimeout(() => {
      setSearchTerm(searchQuery);
    }, 600);
  }, [searchQuery]);

  const subscribers = data?.data?.result || [];
  const meta = data?.data?.meta || {};

  let content: React.ReactNode;

  if (isLoading) {
    content = <ListLoading />;
  }

  if (!isLoading && !isError) {
    content = (
      <div className="flex-1 overflow-hidden">
        <SubscriberTable
          subscribers={subscribers}
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
          Total Subscribers
        </h1>
        <div className="flex items-center gap-12">
          <h1 className="text-lg">
            Total: <span className="font-bold"> {meta?.total} </span>
          </h1>
          <div className="relative w-72">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-700">
              <FaSearch size={16} />
            </span>
            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      {content}
    </>
  );
};

export default SubscriberList;
