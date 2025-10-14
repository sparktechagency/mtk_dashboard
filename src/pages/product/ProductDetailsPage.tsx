import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/features/product/productApi";
import SingleProductLoading from "../../components/loader/SingleProductLoading";
import ServerErrorCard from "../../components/card/ServerErrorCard";
import React, { Suspense } from "react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import AuthenticationCard from "../../components/card/AuthenticationCard";
const ProductDetails = React.lazy(() => import("../../components/product/ProductDetails"));



const ProductDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetSingleProductQuery(id);
  const product = data?.data || {};
  const fetchError = error as FetchBaseQueryError;

  if (isLoading) {
    return <SingleProductLoading />
  }

  if (!isLoading && isError && fetchError?.status===401) {
    return <AuthenticationCard/>
  }

  if (!isLoading && isError) {
    return <ServerErrorCard />
  }

  if (!isLoading && !isError && !product?._id) {
    return <h1>Product Not Found</h1>
  }

  if (!isLoading && !isError && product?._id) {
    return (
      <>
        <Suspense fallback={<SingleProductLoading/>}>
          <ProductDetails product={product} />
        </Suspense>
      </>
    )
  }
}

export default ProductDetailsPage