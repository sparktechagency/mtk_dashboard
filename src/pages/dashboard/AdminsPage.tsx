import React, { Suspense } from "react";
import FallbackLoading from "../../components/loader/FallbackLoading";

const AdminList = React.lazy(() => import("../../components/admin/AdminList"));


const AdminsPage = () => {
  return (
    <>
      <div>
        <div className="bg-white shadow rounded-lg h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <Suspense fallback={<FallbackLoading />}>
              <AdminList/>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminsPage;
