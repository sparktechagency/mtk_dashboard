import React, { Suspense, useState } from "react";
import ServerErrorCard from "../card/ServerErrorCard";
import { useGetSubscribersQuery } from "../../redux/features/newsletter/newsletterApi";
import SubscriberListHeader from "./SubscriberListHeader";
import useDebounce from "../../hooks/useDebounce";
import TableLoading from "../loader/TableLoading";

const SubscriberTable = React.lazy(() => import("./SubscriberTable"));


const SubscriberList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { searchTerm } = useDebounce({searchQuery, setCurrentPage}) //search debounce handled
  const { data, isLoading, isFetching, isError } = useGetSubscribersQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm },
  ]);


  const subscriptions = data?.data || [];
  const meta = data?.meta || {};

  let content: React.ReactNode;

  if (isLoading) {
    content = <TableLoading />;
  }

  if (!isLoading && !isError) {
    content =  (
      <>
        <Suspense fallback={<TableLoading />}>
          <div className="flex-1 overflow-hidden">
            <SubscriberTable
              subscriptions={subscriptions}
              meta={meta}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              loading={isFetching}
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
      <SubscriberListHeader meta={meta} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {content}
    </>
  )

};

export default SubscriberList;
