import EmployerList from "../../components/employer/EmployerList";

const EmployersPage = () => {
  return (
    <>
      <div>
        <div className="bg-white rounded-lg shadow h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
           <EmployerList/>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployersPage;
