import React, { Suspense, useState } from "react";
import { useGetCategoriesQuery } from "../../redux/features/category/categoryApi";
import ServerErrorCard from "../card/ServerErrorCard";
import useDebounce from "../../hooks/useDebounce";
import TableLoading from "../loader/TableLoading";
import CategoryListHeader from "./CategoryListHeader";

const CategoryTable = React.lazy(() => import("./CategoryTable"));

const CategoryList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { searchTerm } = useDebounce({searchQuery, setCurrentPage}) //search debounce handled
  const { data, isLoading,isFetching, isError } = useGetCategoriesQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm }
  ]);


  const categories = data?.data || [];
  const meta = data?.meta || {};


  let content: React.ReactNode;

  if (isLoading) {
    content = <TableLoading />;
  }

  if (!isLoading && !isError) {
    content = (
      <>
        <Suspense fallback={<TableLoading/>}>
          <CategoryTable
            categories={categories}
            meta={meta}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            loading={isFetching}
          />
        </Suspense>
      </>
    )
  }

  if (!isLoading && isError) {
    content = <ServerErrorCard />;
  }

  return (
    <>
      <CategoryListHeader meta={meta} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {content}
    </>
  )
};

export default CategoryList;
