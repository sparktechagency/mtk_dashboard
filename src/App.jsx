
// import { Button, Flex } from 'antd';
// import Navbar from './components/Navbar/Navbar';
// import Sidebar from './components/Sidebar/Sidebar';
// import Dashboard from './components/Dashboard/Dashboard';
// function App() {


//   return (
//     <>
//       <div className='flex justify-between '>
//         <div className=''>
//           <Sidebar></Sidebar>
//         </div>
//         <div className=''>
//           <Navbar></Navbar>
//         </div>

//       </div>
//       <Dashboard></Dashboard>
//     </>
//   )
// }

// export default App

// App.jsx
import { Outlet } from 'react-router-dom';
import Layout from './components/Layout/Layout';

export default function App() {
  return (
   <Layout>
      <Outlet/>
   </Layout>
  );
}

