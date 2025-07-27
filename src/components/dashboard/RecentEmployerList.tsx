
import { useNavigate } from "react-router-dom"
import { useGetEmployersQuery } from "../../redux/features/employer/employerApi"
import RecentEmployersLoading from "../loader/RecentEmployersLoading"
import RecentEmployerTable from "./RecentEmployerTable";
import ServerErrorCard from "../card/ServerErrorCard";



const RecentEmployerList = () =>{
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetEmployersQuery([
      { name: "page", value: 1 },
      { name: "limit", value: 5 },
  ]);

  const employers = data?.data?.result || [];


   let content: React.ReactNode;
  
    if (isLoading) {
      content = <RecentEmployersLoading />;
    }
  
    if (!isLoading && !isError) {
      content = (
        <div className="flex-1 overflow-hidden">
          <RecentEmployerTable
            employers={employers}
          />
        </div>
      );
    }
  
    if (!isLoading && isError) {
      content = <ServerErrorCard />;
    }



  return (
    <div className="w-full mx-auto bg-white p-4 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Recent Employer List</h1>
        <button onClick={()=>navigate('/employers')} className="text-sm text-blue-600 hover:underline">View All</button>
      </div>
      {content}
    </div>
  )
}

export default RecentEmployerList;