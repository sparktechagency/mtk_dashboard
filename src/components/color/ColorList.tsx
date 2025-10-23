import React, { Suspense, useState } from "react";
import ServerErrorCard from "../card/ServerErrorCard";
import { useGetColorsQuery } from "../../redux/features/color/colorApi";
import ColorListHeader from "./ColorListHeader";
import useDebounce from "../../hooks/useDebounce";
import TableLoading from "../loader/TableLoading";
const ColorTable = React.lazy(() => import("./ColorTable"));


const ColorList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { searchTerm } = useDebounce({searchQuery, setCurrentPage}) //search debounce handled
  const { data, isLoading, isFetching, isError } = useGetColorsQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm },
  ]);


  const colors = data?.data || [];
  const meta = data?.meta || {};

  let content: React.ReactNode;

  if (isLoading) {
    content = <TableLoading />;
  }

  if (!isLoading && !isError) {
    content = (
      <>
        <Suspense fallback={<TableLoading />}>
          <ColorTable
            colors={colors}
            meta={meta}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            loading={isFetching}
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
      <ColorListHeader meta={meta} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {content}
    </>
  )
 
};

export default ColorList;
