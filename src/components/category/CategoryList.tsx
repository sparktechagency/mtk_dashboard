import { useState } from "react";
import { useGetCategoriesQuery } from "../../redux/features/category/categoryApi";
import ServerErrorCard from "../card/ServerErrorCard";
import ListLoading from "../loader/ListLoading";
import CategoryTable from "./CategoryTable";

const CategoryList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isError } = useGetCategoriesQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize }
  ]);
  const categories = data?.data || [];
  const meta = data?.meta || {};

  if (isLoading) {
    return <ListLoading />;
  }

  if (!isLoading && !isError) {
    return <CategoryTable
      categories={categories}
      meta={meta}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
    />;
  }

  if (!isLoading && isError) {
    return <ServerErrorCard />;
  }
};

export default CategoryList;
