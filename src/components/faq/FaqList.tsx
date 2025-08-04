import { useGetFaqsQuery } from "../../redux/features/faq/faqApi";
import { IFaq } from "../../types/faq.type";
import FaqNotFoundCard from "../card/FaqNotFoundCard";
import ServerErrorCard from "../card/ServerErrorCard";
import FaqLoading from "../loader/FaqLoading";
import CreateFaqModal from "../modal/faq/CreateFaqModal";
import FaqItem from "./FaqItem";

const FaqList = () => {
  const { data, isLoading, isError } = useGetFaqsQuery(undefined);
  const faqs: IFaq[] = data?.data || [];

  if(isLoading){
    return <FaqLoading />
  }

  if(!isLoading && faqs?.length > 0){
    return (
      <>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[80%] overflow-y-scroll content-start">
        {faqs.map((faq, index) => (
          <FaqItem faq={faq} key={index} index={index} />
        ))}
      </div>
      <div className="mt-8 text-center bottom-0 flex justify-center items-center">
        <CreateFaqModal />
      </div>
      </>
    )
  }

   if(!isLoading && isError){
    return <ServerErrorCard/>
  }

  if(!isLoading && faqs.length === 0){
    return (
      <>   
        <FaqNotFoundCard/>
        <div className="mt-8 text-center bottom-0 flex justify-center items-center">
        <CreateFaqModal />
      </div>
      </>
    );
  }


 


}

export default FaqList;