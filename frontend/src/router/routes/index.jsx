import { createBrowserRouter } from "react-router-dom";
import { AuthGuard } from "../guards/AuthGuard";
import { GuestGuard } from "../guards/GuestGuard";
import LandingPage from "../../pages/public/LandingPage";
import LoginPage from "../../pages/public/LoginPage";
import SignupPage from "../../pages/public/SignupPage";
import DashboardPage from "../../pages/protected/DashboardPage";
import ChallengesPage from "../../pages/protected/ChallengesPage";
import ChallengeDetailPage from "../../pages/protected/ChallengeDetailPage";
import ChallengePracticePage from "../../pages/protected/ChallengePracticePage";
import NotFoundPage from "../../pages/error/NotFoundPage";
import MonacoEditor from "@/components/editor/editor";

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
    path: "/challenges",
    element: <ChallengesPage />,
  },
  {
    path: "/challenges/:id",
    element: <ChallengeDetailPage />,
  },
  {
    path: "/challenges/:id/practice",
    element: <ChallengePracticePage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path : "/editor",
    element : <MonacoEditor/>
  }
]);
