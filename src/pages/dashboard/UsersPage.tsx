import UserList from "../../components/user/UserList";

const UsersPage = () => {
  return (
    <>
     <div className="min-h-full bg-white rounded-md shadow">
        <div className="w-full h-full flex flex-col">
          <UserList />
        </div>
      </div>
    </>
  );
};

export default UsersPage;
