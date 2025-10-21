import { useEffect, useState } from "react";
import { useGetFaqsQuery } from "../../redux/features/faq/faqApi";
import type { IFaq } from "../../types/faq.type";
import FaqNotFoundCard from "../card/FaqNotFoundCard";
import ServerErrorCard from "../card/ServerErrorCard";
import FaqLoading from "../loader/FaqLoading";
import FaqItem from "./FaqItem";
import { Pagination } from "antd";
import TableOverlayLoading from "../loader/TableOverlayLoading";

const FaqList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isError, isFetching} = useGetFaqsQuery([
      { name: "page", value: currentPage },
      { name: "limit", value: pageSize },
    ]);
  const faqs: IFaq[] = data?.data || [];
  const meta = data?.meta;

  //handle pagination after deleting last document of last page
  useEffect(() => {
    if (meta && currentPage > meta.totalPages) {
      setCurrentPage(meta.totalPages)
    }
  }, [currentPage, meta, setCurrentPage])

  const handlePagination = (page: number, PageSize: number) => {
    setCurrentPage(page);
    setPageSize(PageSize);
  };


  if (isLoading) {
    return <FaqLoading />
  }

  if (!isLoading && faqs?.length > 0) {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[60vh] overflow-y-scroll content-start relative">
          {faqs?.map((faq, index) => (
            <FaqItem faq={faq} key={index} serial={Number(index + 1) + (meta.page - 1) * pageSize} />
          ))}
           {!isLoading && isFetching && <TableOverlayLoading />}
        </div>
        <div className="mt-8 text-center relative flex justify-center items-center">
          <div className="fixed bottom-12">
            {meta?.totalPages > 1 && (
              <Pagination
                onChange={handlePagination}
                current={currentPage}
                pageSize={pageSize}
                total={meta?.total}
              />
            )}
          </div>
        </div>
      </>
    )
  }

  if (!isLoading && isError) {
    return <ServerErrorCard />
  }

  if (!isLoading && !isFetching && faqs.length === 0) {
    return (
      <>
        <FaqNotFoundCard />
      </>
    );
  }

}

export default FaqList;