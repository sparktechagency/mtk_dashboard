import React, { Suspense } from "react";
import FallbackLoading from "../../components/loader/FallbackLoading";

const UserList = React.lazy(() => import("../../components/user/UserList"));

const UsersPage = () => {
  return (
    <>
      <div>
       <div className="bg-white shadow rounded-lg h-full overflow-hidden">
        <div className="w-full h-full flex flex-col">
          <Suspense fallback={<FallbackLoading />}>
            <UserList />
          </Suspense>
        </div>
      </div>
      </div>
    </>
  );
};

export default UsersPage;
