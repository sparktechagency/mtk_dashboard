import { useEffect, useState } from "react";
import ServerErrorCard from "../card/ServerErrorCard";
import ListLoading from "../loader/ListLoading";
import { useGetSubscribersQuery } from "../../redux/features/newsletter/newsletterApi";
import SubscriberListHeader from "./SubscriberListHeader";
import SubscriberTable from "./SubscriberTable";

const SubscriberList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isFetching, isError } = useGetSubscribersQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm },
  ]);

  //debounced handle
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(searchQuery);
      setCurrentPage(1)
    }, 600);

    return () => clearTimeout(timeoutId); // cleanup for debounce
  }, [searchQuery]);


  const subscriptions = data?.data || [];
  const meta = data?.meta || {};

  if (isLoading) {
    return <ListLoading />;
  }

  if (!isLoading && !isError) {
    return (
      <>
        <SubscriberListHeader meta={meta} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="flex-1 overflow-hidden">
          <SubscriberTable
            subscriptions={subscriptions}
            meta={meta}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
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

export default SubscriberList;
