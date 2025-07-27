import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardPage from "../pages/dashboard/DashboardPage";
import LoginPage from "../pages/auth/LoginPage";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import VerifyOtpPage from "../pages/auth/VerifyOtpPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import EmployersPage from "../pages/dashboard/EmployersPage";
import CategoryPage from "../pages/dashboard/CategoryPage";
import CandidatesPage from "../pages/dashboard/CandidatesPage";
import ContactPage from "../pages/dashboard/ContactPage";
import BlogsPage from "../pages/dashboard/BlogsPage";
import SubscribersPage from "../pages/dashboard/SubscribersPage";
import PackagesPage from "../pages/dashboard/PackagesPage";
import AboutUsPage from "../pages/settings/AboutUsPage";
import PrivacyPolicyPage from "../pages/settings/PrivacyPolicyPage";
import TermsConditionPage from "../pages/settings/TermsConditionPage";
import JobDetailsPage from "../pages/dashboard/JobDetailsPage";
import JobPostsPage from "../pages/dashboard/JobPostsPage";
import SubscriberDetailsPage from "../pages/dashboard/SubscriberDetailsPage";
import CreateBlogPage from "../pages/dashboard/CreateBlogPage";
import EditBlogPage from "../pages/dashboard/EditBlogPage";
import ProfilePage from "../pages/settings/ProfilePage";
import ChangePasswordPage from "../pages/settings/ChangePasswordPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import AdminsPage from "../pages/dashboard/AdminsPage";
import BlogDetailsPage from "../pages/dashboard/BlogDetailsPage";
import CreatePlanPackage from "../pages/dashboard/CreatePlanPackage";
import TransactionsPage from "../pages/dashboard/TransactionsPage";
import CandidateDetailsPage from "../pages/dashboard/CandidateDetailsPage";

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
        path: "employers",
        element: <EmployersPage />,
      },
      {
        path: "admins",
        element: <AdminsPage />,
      },
      {
        path: "candidates",
        element: <CandidatesPage />,
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
        path: "subscribers",
        element: <SubscribersPage />,
      },
      {
        path: "subscribers/details/:id",
        element: <SubscriberDetailsPage />,
      },
      {
        path: "packages",
        element: <PackagesPage />,
      },
      {
        path: "transactions",
        element: <TransactionsPage />,
      },
       {
        path: "add-plan",
        element: <CreatePlanPackage />,
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
        path: "blog-details/:id",
        element: <BlogDetailsPage />,
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
    element: <h1>Not Found Page</h1>,
  },
]);

export default router;
