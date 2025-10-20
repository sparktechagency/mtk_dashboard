import { useEffect, useState } from "react";
import ServerErrorCard from "../card/ServerErrorCard";
import OrderTable from "./OrderTable";
import { useGetOrdersQuery } from "../../redux/features/order/orderApi";
import OrderListHeader from "./OrderListHeader";
import FallbackLoading from "../loader/FallbackLoading";

const OrderList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isFetching, isError, refetch } = useGetOrdersQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm },
    { name: "status", value: status },
  ]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(searchQuery);
      setCurrentPage(1)
    }, 600);

    return () => clearTimeout(timeoutId); // cleanup for debounce
  }, [searchQuery]);



  const orders = data?.data || [];
  const meta = data?.meta || {};

  let content: React.ReactNode;

  if (isLoading) {
    content = <FallbackLoading />;
  }

  if (!isLoading && !isError) {
    content = (
      <>
        <OrderListHeader
          meta={meta}
          status={status}
          setStatus={setStatus}
          setCurrentPage={setCurrentPage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onRefresh={()=>refetch()}
          isFetching={isFetching}
        />
        <OrderTable
          orders={orders}
          meta={meta}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          isFetching={isFetching}
        />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <ServerErrorCard />;
  }

  return (
    <>
      {content}
    </>
  );
};

export default OrderList;
