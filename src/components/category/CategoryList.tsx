import { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "../../redux/features/category/categoryApi";
import ServerErrorCard from "../card/ServerErrorCard";
import CategoryTable from "./CategoryTable";
import CategoryListHeader from "./CategoryListHeader";
import FallbackLoading from "../loader/FallbackLoading";

const CategoryList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading,isFetching, isError } = useGetCategoriesQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm }
  ]);

  
  //debounced handle
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(searchQuery);
      setCurrentPage(1)
    }, 600);

    return () => clearTimeout(timeoutId); // cleanup for debounce
  }, [searchQuery]);


  const categories = data?.data || [];
  const meta = data?.meta || {};


  if (isLoading) {
    return <FallbackLoading />;
  }

  if (!isLoading && !isError) {
    return (
      <>
        <CategoryListHeader meta={meta} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CategoryTable
          categories={categories}
          meta={meta}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          loading={isFetching}
        />
      </>
    )
  }

  if (!isLoading && isError) {
    return <ServerErrorCard />;
  }
};

export default CategoryList;
