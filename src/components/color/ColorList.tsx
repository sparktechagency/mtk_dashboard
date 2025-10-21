import { useState } from "react";
import ServerErrorCard from "../card/ServerErrorCard";
import ListLoading from "../loader/ListLoading";
import ColorTable from "./ColorTable";
import { useGetColorsQuery } from "../../redux/features/color/colorApi";
import ColorListHeader from "./ColorListHeader";
import useDebounce from "../../hooks/useDebounce";

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

  if (isLoading) {
    return <ListLoading />;
  }

  if (!isLoading && !isError) {
    return (
      <>
        <ColorListHeader meta={meta} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ColorTable
          colors={colors}
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

export default ColorList;
