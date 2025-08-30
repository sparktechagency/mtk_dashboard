import React, { Suspense } from "react";
import FallbackLoading from "../../components/loader/FallbackLoading";

const ProductList = React.lazy(() => import("../../components/product/ProductList"));

const ProductsPage = () => {

  return (
    <>
      <div>
        <div className="bg-white rounded-lg shadow h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
           <Suspense fallback={<FallbackLoading />}>
              <ProductList />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductsPage;