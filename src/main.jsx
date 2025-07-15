import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from './App.jsx'
import Layout from "./components/Layout/Layout.jsx";

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import User from "./components/User/User.jsx";
import Category from "./components/Category/Category.jsx";
import Orders from "./components/Orders/Orders.jsx";
import Products from "./components/Products/Products.jsx";
import Notification from "./components/Notification/Notification.jsx";
import HelpSupport from "./components/HelpFAQs/HelpSupport.jsx";
import FAQs from "./components/HelpFAQs/FAQs.jsx";
import AboutUs from "./components/Settings/AboutUs.jsx";
import TermsConditions from "./components/Settings/TermsConditions.jsx";
import PrivacyPolicy from "./components/Settings/PrivacyPolicy.jsx";
import Profile from "./components/Profile/Profile.jsx";
import HelpCenterPage from "./components/Dashboard/HelpCenterPage/HelpCenterPage.jsx"
import Login from "./components/Logout/Login.jsx";
import ForgetPassword from "./components/Logout/ForgetPassword.jsx";
import CheckYourEmail from "./components/Logout/CheckYourEmail.jsx";
import SetPassword from "./components/Logout/SetPassword.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
          path: "/",
          element: <Dashboard></Dashboard>,
      },
      {
        path: "/help-center",
        element: <HelpCenterPage></HelpCenterPage>,
      },
      {
        path: "/user-management",
        element: <User></User>,

      },
      {
        path: "/order-management",
        element: <Orders></Orders>,
      },
      {
        path: "/category",
        element: <Category></Category>,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/notifications",
        element: <Notification></Notification>,
      },
      {
        path: "/help-support",
        element: <HelpSupport></HelpSupport>,

      },

      {
        path: "/FAQs",
        element: <FAQs></FAQs>,
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/terms-contiditions",
        element: <TermsConditions></TermsConditions>,
      },

      {
        path: "/privacy-policy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
    ],

    
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword></ForgetPassword>,
  },
  {
    path: "/check-email",
    element: <CheckYourEmail></CheckYourEmail>,
  },
  {
    path: "/set-password",
    element: <SetPassword></SetPassword>,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
