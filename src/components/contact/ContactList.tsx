import React, { Suspense, useState } from "react";
import ServerErrorCard from "../card/ServerErrorCard";
import { useGetContactListQuery } from "../../redux/features/contact/contactApi";
import ContactListHeader from "./ContactListHeader";
import useDebounce from "../../hooks/useDebounce";
import TableLoading from "../loader/TableLoading";
const ContactTable = React.lazy(() => import("./ContactTable"));


const ContactList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { searchTerm } = useDebounce({searchQuery, setCurrentPage}) //search debounce handled
  const { data, isLoading, isFetching, isError } = useGetContactListQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm },
  ]);

  const contacts = data?.data || [];
  const meta = data?.meta || {};


  let content: React.ReactNode;

  if (isLoading) {
    content = <TableLoading />;
  }

  if (!isLoading && !isError) {
    content = (
      <>   
        <Suspense fallback={<TableLoading/>}>
          <div className="flex-1 overflow-hidden">
            <ContactTable
              contacts={contacts}
              meta={meta}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              loading={isFetching}
            />
          </div>
        </Suspense>
      </>
    );
  }

  if (!isLoading && isError) {
    content = <ServerErrorCard />;
  }

  return (
    <>
      <ContactListHeader meta={meta} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {content}
    </>
  )

};

export default ContactList;
