import React, { Suspense } from "react";
import FallbackLoading from "../../components/loader/FallbackLoading";

const ContactList = React.lazy(() => import("../../components/contact/ContactList"));

const ContactPage = () => {
  return (
    <>
      <div>
        <div className="bg-white rounded-lg shadow h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <Suspense fallback={<FallbackLoading />}>
              <ContactList />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactPage