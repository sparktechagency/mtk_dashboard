import React, { Suspense } from "react";
import FallbackLoading from "../../components/loader/FallbackLoading";
const SubscriberList = React.lazy(() => import("../../components/subsciber/SubscriberList"));


const SubscribersPage = () => {
  return (
    <>
      <div>
        <div className="bg-white rounded-lg shadow h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <Suspense fallback={<FallbackLoading />}>
              <SubscriberList />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubscribersPage