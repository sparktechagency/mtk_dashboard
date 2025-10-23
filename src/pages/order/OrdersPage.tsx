import OrderList from "../../components/order/OrderList";

const OrdersPage = () => {

  return (
    <>
      <div className="min-h-full bg-white rounded-md shadow">
          <div className="w-full h-full flex flex-col">
              <OrderList />
          </div>
      </div>
    </>
  )
}

export default OrdersPage;