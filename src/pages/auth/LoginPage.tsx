import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <>
      <div className="w-full max-w-md bg-white py-6 px-4 md:px-6 shadow-md rounded-md">
        <h2 className="text-3xl md:text-3xl font-bold mb-2 text-title text-center">
          Login to Continue
        </h2>
        {/* <p className="text-gray-600 mb-6">Welcome back! please enter your details</p> */}

        {/* Login Form */}
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
