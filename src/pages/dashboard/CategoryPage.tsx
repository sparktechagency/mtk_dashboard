import React, { Suspense } from "react";
import FallbackLoading from "../../components/loader/FallbackLoading";

const CategoryList = React.lazy(() => import("../../components/category/CategoryList"));

const CategoryPage = () => {
  return (
    <>
       <div>
        <div className="bg-white shadow rounded-lg h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <Suspense fallback={<FallbackLoading />}>
              <CategoryList />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}

export default CategoryPage