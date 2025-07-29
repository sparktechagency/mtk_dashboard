import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardPage from "../pages/dashboard/DashboardPage";
import LoginPage from "../pages/auth/LoginPage";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import VerifyOtpPage from "../pages/auth/VerifyOtpPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import CategoryPage from "../pages/dashboard/CategoryPage";
import ContactPage from "../pages/dashboard/ContactPage";
import BlogsPage from "../pages/dashboard/BlogsPage";
import AboutUsPage from "../pages/settings/AboutUsPage";
import PrivacyPolicyPage from "../pages/settings/PrivacyPolicyPage";
import TermsConditionPage from "../pages/settings/TermsConditionPage";
import JobDetailsPage from "../pages/dashboard/JobDetailsPage";
import JobPostsPage from "../pages/dashboard/JobPostsPage";
import CreateBlogPage from "../pages/dashboard/CreateBlogPage";
import EditBlogPage from "../pages/dashboard/EditBlogPage";
import ProfilePage from "../pages/settings/ProfilePage";
import ChangePasswordPage from "../pages/settings/ChangePasswordPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import AdminsPage from "../pages/dashboard/AdminsPage";
import CandidateDetailsPage from "../pages/dashboard/CandidateDetailsPage";
import HelpPage from "../pages/help/HelpPage";
import FaqsPage from "../pages/help/FaqsPage";
import UsersPage from "../pages/dashboard/UsersPage";
import ColorsPage from "../pages/dashboard/ColorsPage";
import SizesPage from "../pages/dashboard/SizesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "admins",
        element: <AdminsPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "candidate-details/:id",
        element: <CandidateDetailsPage />,
      },
      {
        path: "category",
        element: <CategoryPage />,
      },
      {
        path: "colors",
        element: <ColorsPage />,
      },
      {
        path: "sizes",
        element: <SizesPage />,
      },
      {
        path: "help",
        element: <HelpPage />,
      },
      {
        path: "faqs",
        element: <FaqsPage />,
      },
      {
        path: "contacts",
        element: <ContactPage />,
      },
      {
        path: "blogs",
        element: <BlogsPage />,
      },
      {
        path: "create-blog",
        element: <CreateBlogPage />,
      },
      {
        path: "update-blog/:id",
        element: <EditBlogPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "change-password",
        element: <ChangePasswordPage />,
      },
      {
        path: "about-us",
        element: <AboutUsPage />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "terms-condition",
        element: <TermsConditionPage />,
      },
      {
        path: "job-details",
        element: <JobDetailsPage />,
      },
      {
        path: "job-posts",
        element: <JobPostsPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/auth/signin" replace />,
      },
      {
        path: "signin",
        element: <LoginPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtpPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>This is Not Found Page</h1>
    //element: <NotFoundRoute/>,
  },
]);

export default router;
