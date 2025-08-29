import { useEffect, useState } from "react";
import ServerErrorCard from "../card/ServerErrorCard";
import ListLoading from "../loader/ListLoading";
import { useNavigate } from "react-router-dom";
import ProductTable from "./ProductTable";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import ProductListHeader from "./ProductListHeader";

const ProductList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading,isFetching, isError } = useGetProductsQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm },
  ]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(searchQuery);
      setCurrentPage(1)
    }, 600);

    return () => clearTimeout(timeoutId); // cleanup for debounce
  }, [searchQuery]);


  const products = data?.data || [];
  const meta = data?.meta || {};

  let content: React.ReactNode;

  if (isLoading) {
    content = <ListLoading />;
  }

  if (!isLoading && !isError) {
    content = (
      <ProductTable
        products={products}
        meta={meta}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        loading={isFetching}
      />
    );
  }

  if (!isLoading && isError) {
    content = <ServerErrorCard />;
  }

   return (
     <>
       <ProductListHeader meta={meta} searchQuery={searchQuery} setSearchQuery={setSearchQuery} navigate={navigate} />
       {content}
     </>
   );
};

export default ProductList;
