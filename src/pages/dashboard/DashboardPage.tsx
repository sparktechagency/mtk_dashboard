import RecentEmployerList from "../../components/dashboard/RecentEmployerList";
import StatsSection from "../../components/dashboard/StatsSection";
import IncomeOverviewChart from "../../components/summary/IncomeOverviewChart";
import JobOverviewChart from "../../components/summary/JobOverviewChart";


const DashboardPage = () => {
  return (
    <>
      <div>
        <StatsSection/>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
          <JobOverviewChart/>
          <IncomeOverviewChart/>
        </div>
         <div className="mt-4">
          <RecentEmployerList/>
         </div>
      </div>
    </>
  );
}

export default DashboardPage