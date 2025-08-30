import React, { Suspense } from "react";
import FallbackLoading from "../../components/loader/FallbackLoading";

const SizeList = React.lazy(() => import("../../components/size/SizeList"));

const SizesPage = () => {
  return (
    <>
      <div>
        <div className="bg-white rounded-lg shadow h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <div className="flex-1 overflow-hidden">
               <Suspense fallback={<FallbackLoading />}>
                  <SizeList />
                </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SizesPage