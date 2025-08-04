import type { IFaq } from "../../types/faq.type";
import DeleteFaqModal from "../modal/faq/DeleteFaqModal";
import EditFaqModal from "../modal/faq/EditFaqModal";

type TProps = {
  faq: IFaq;
  index: number;
};

const FaqItem = ({ faq, index }: TProps) => {
  return (
    <>
      <div className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Question no: {index + 1}
            </p>
            <h3 className="font-semibold text-gray-800">{faq?.questions}</h3>
          </div>
          <div className="flex gap-x-1.5">
            <EditFaqModal faq={faq} />
            <DeleteFaqModal faqId={faq?._id} />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-gray-700">{faq.answer}</p>
        </div>
      </div>
    </>
  );
};

export default FaqItem;