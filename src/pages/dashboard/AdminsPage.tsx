import AdminList from "../../components/admin/AdminList";



const AdminsPage = () => {
  return (
    <>
      <div className="min-h-full bg-white rounded-md shadow">
          <div className="w-full h-full flex flex-col">
              <AdminList />
          </div>
      </div>
    </>
  );
};

export default AdminsPage;
