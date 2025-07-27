import { useGetSubscriptionsQuery } from "../../redux/features/subscription/subscriptionApi";
import ServerErrorCard from "../card/ServerErrorCard";
import ListLoading from "../loader/ListLoading";
import PackageTable from "./PackageTable";

const PackageList = () => {
  const { data, isLoading, isError } = useGetSubscriptionsQuery(undefined);
  const subscriptions = data?.data || [];

  if (isLoading) {
    return <ListLoading />;
  }

  if (!isLoading && !isError) {
    return <PackageTable subscriptions={subscriptions}/>;
  }

  if (!isLoading && isError) {
    return <ServerErrorCard />;
  }
};

export default PackageList;
