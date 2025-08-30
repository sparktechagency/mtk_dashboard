import FallbackLoading from "../../components/loader/FallbackLoading";
import React, { Suspense } from "react";

const OrderList = React.lazy(() => import("../../components/order/OrderList"));

const OrdersPage = () => {

  return (
    <>
      <div>
        <div className="bg-white rounded-lg shadow h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <Suspense fallback={<FallbackLoading />}>
              <OrderList />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrdersPage;