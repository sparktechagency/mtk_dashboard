import React, { Suspense, useState } from "react";
import ServerErrorCard from "../card/ServerErrorCard";
import { useGetOrdersQuery } from "../../redux/features/order/orderApi";
import OrderListHeader from "./OrderListHeader";
import useDebounce from "../../hooks/useDebounce";
import TableLoading from "../loader/TableLoading";


const OrderTable = React.lazy(() => import("./OrderTable"));

const OrderList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { searchTerm } = useDebounce({searchQuery, setCurrentPage}) //search debounce handled
  const { data, isLoading, isFetching, isError, refetch } = useGetOrdersQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm },
    { name: "status", value: status },
  ]);

  const orders = data?.data || [];
  const meta = data?.meta || {};

  let content: React.ReactNode;

  if (isLoading) {
    content = <TableLoading />;
  }

  if (!isLoading && !isError) {
    content = (
      <>
        <Suspense fallback={<TableLoading/>}>
          <OrderTable
            orders={orders}
            meta={meta}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            isFetching={isFetching}
          />
        </Suspense>
      </>
    );
  }

  if (!isLoading && isError) {
    content = <ServerErrorCard />;
  }

  return (
    <>
      <OrderListHeader
        meta={meta}
        status={status}
        setStatus={setStatus}
        setCurrentPage={setCurrentPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onRefresh={() => refetch()}
        isFetching={isFetching}
      />
      {content}
    </>
  );
};

export default OrderList;
