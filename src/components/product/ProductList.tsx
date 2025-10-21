import React, { useState } from "react";
import ServerErrorCard from "../card/ServerErrorCard";
import ListLoading from "../loader/ListLoading";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import ProductListHeader from "./ProductListHeader";
import useDebounce from "../../hooks/useDebounce";

const ProductTable = React.lazy(() => import("./ProductTable"));

const ProductList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { searchTerm } = useDebounce({searchQuery, setCurrentPage}) //search debounce handled
  const { data, isLoading, isFetching, isError } = useGetProductsQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm },
  ]);

  const products = data?.data || [];
  const meta = data?.meta || {};


  if (isLoading) {
    return <ListLoading />;
  }

  if (!isLoading && !isError) {
    return (
      <>
        <ProductListHeader meta={meta} searchQuery={searchQuery} setSearchQuery={setSearchQuery} navigate={navigate} />
        <ProductTable
          products={products}
          meta={meta}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          loading={isFetching}
        />
      </>
    );
  }

  if (!isLoading && isError) {
    return <ServerErrorCard />;
  }
};

export default ProductList;
