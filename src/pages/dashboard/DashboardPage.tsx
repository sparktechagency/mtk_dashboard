import React, { Suspense } from "react";
import DashboardFallbackLoading from "../../components/loader/DashboardFallbackLoading";
const StatsSection = React.lazy(() => import("../../components/dashboard/StatsSection"));
const RecentOrderList = React.lazy(() => import("../../components/dashboard/RecentOrderList"));
const IncomeOverviewChart = React.lazy(() => import("../../components/summary/IncomeOverviewChart"));
const UserOverviewChart = React.lazy(() => import("../../components/summary/UserOverviewChart"));

const DashboardPage = () => {
  return (
    <>
      <div>
        <Suspense fallback={<DashboardFallbackLoading />}>
          <StatsSection />
          <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
            <IncomeOverviewChart />
            <UserOverviewChart />
          </div>
          <div className="mt-4">
            <RecentOrderList />
          </div>
        </Suspense>
      </div>
    </>
  );
}

export default DashboardPage