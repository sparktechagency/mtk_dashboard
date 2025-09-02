import ServerErrorCard from "../card/ServerErrorCard";
import { useGetOrdersQuery } from "../../redux/features/order/orderApi";
import RecentOrderTable from "./RecentOrderTable";
import { useNavigate } from "react-router-dom";
import RecentOrderLoading from "../loader/RecentOrderLoading";

const RecentOrderList = () => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching, isError } = useGetOrdersQuery([
    { name: "page", value: 1 },
    { name: "limit", value: 5 },
  ]);


  const orders = data?.data || [];


  if (isLoading) {
    return <RecentOrderLoading />;
  }

  if (!isLoading && !isError) {
    return (
      <>
        <div className="w-full mx-auto bg-white p-4 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">Recent Orders</h1>
            <button onClick={() => navigate('/orders')} className="text-sm text-blue-600 hover:underline">View All</button>
          </div>
           <RecentOrderTable
            orders={orders}
            loading={isFetching}
          />
        </div>
      </>
    );
  }

  if (!isLoading && isError) {
    return <ServerErrorCard />;
  }

};

export default RecentOrderList;
