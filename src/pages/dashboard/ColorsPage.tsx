import React, { Suspense } from "react";
import FallbackLoading from "../../components/loader/FallbackLoading";
const ColorList = React.lazy(() => import("../../components/color/ColorList"));

const ColorsPage = () => {
  return (
    <>
      <div>
        <div className="bg-white shadow rounded-lg h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <Suspense fallback={<FallbackLoading />}>
              <ColorList />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}

export default ColorsPage