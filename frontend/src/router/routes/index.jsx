import { createBrowserRouter } from "react-router-dom";
import { AuthGuard } from "../guards/AuthGuard";
import { GuestGuard } from "../guards/GuestGuard";
import LandingPage from "../../pages/public/LandingPage";
import LoginPage from "../../pages/public/LoginPage";
import SignupPage from "../../pages/public/SignupPage";
import DashboardPage from "../../pages/protected/DashboardPage";
import NotFoundPage from "../../pages/error/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: (
      <GuestGuard>
        <LoginPage />
      </GuestGuard>
    ),
  },
  {
    path: "/signup",
    element: (
      <GuestGuard>
        <SignupPage />
      </GuestGuard>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <AuthGuard>
        <DashboardPage />
      </AuthGuard>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
