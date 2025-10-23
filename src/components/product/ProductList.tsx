import React, { Suspense, useState } from "react";
import ServerErrorCard from "../card/ServerErrorCard";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import ProductListHeader from "./ProductListHeader";
import useDebounce from "../../hooks/useDebounce";
import TableLoading from "../loader/TableLoading";

const ProductTable = React.lazy(() => import("./ProductTable"));

const ProductList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { searchTerm } = useDebounce({searchQuery, setCurrentPage}) //search debounce handled
  const { data, isLoading, isFetching, isError, refetch } = useGetProductsQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm },
  ]);

  const products = data?.data || [];
  const meta = data?.meta || {};


  let content: React.ReactNode;

  if (isLoading) {
    content = <TableLoading />;
  }

  if (!isLoading && !isError) {
    content = (
      <>
        <Suspense fallback={<TableLoading />}>
          <ProductTable
            products={products}
            meta={meta}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            loading={isFetching}
          />
        </Suspense >
      </>
    );
  }

  if (!isLoading && isError) {
    content = <ServerErrorCard />;
  }

  return (
    <>
      <ProductListHeader
        meta={meta}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        navigate={navigate}
        onRefresh={() => refetch()}
        isFetching={isFetching}
      />
      {content}
    </>
  )
};

export default ProductList;
