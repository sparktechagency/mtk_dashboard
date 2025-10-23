import React, { Suspense, useState } from "react";
import ServerErrorCard from "../card/ServerErrorCard";
import { useGetSizesQuery } from "../../redux/features/size/sizeApi";
import SizeListHeader from "./SizeListHeader";
import TableLoading from "../loader/TableLoading";

const SizeTable = React.lazy(() => import("./SizeTable"));


const SizeList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isError } = useGetSizesQuery(undefined);
  const sizes = data?.data || [];
  const meta = data?.meta || {};

  let content: React.ReactNode;

  if (isLoading) {
    content = <TableLoading />;
  }

  if (!isLoading && !isError) {
    content = (
      <> 
        <Suspense fallback={<TableLoading />}>
          <SizeTable
            sizes={sizes}
            meta={meta}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
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
      <SizeListHeader />
      {content}
    </>
  )
};

export default SizeList;
