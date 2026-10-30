import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "@/features/auth/pages/login-page";
import { RegisterPage } from "@/features/auth/pages/register-page";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { AppLayout } from "@/components/layout/app-layout";
import { InboxPage } from "@/features/inbox/pages/inbox-page";
import { ProjectsPage } from "@/features/projects/projects-page";
import { FocusPage } from "@/features/focus/focus-page";
import { SearchPage } from "@/features/search/search-page";
import { SettingsPage } from "@/features/settings/settings-page";
import { AccountSettingsPage } from "@/features/settings/account-page";
import { AppearanceSettingsPage } from "@/features/settings/appearance-page";
import { LandingPage } from "@/features/marketing/pages/landing-page";
import { NotFoundPage } from "@/features/marketing/pages/not-found-page";
import { PrivacyPage } from "@/features/marketing/pages/privacy-page";
import { TermsPage } from "@/features/marketing/pages/terms-page";
import { CookiePage } from "@/features/marketing/pages/cookie-page";
import { DisclaimerPage } from "@/features/marketing/pages/disclaimer-page";
import { WorkspacesPage } from "@/features/workspaces/pages/workspaces-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/privacy",
    Component: PrivacyPage,
  },
  {
    path: "/terms",
    Component: TermsPage,
  },
  {
    path: "/cookie",
    Component: CookiePage,
  },
  {
    path: "/disclaimer",
    Component: DisclaimerPage,
  },
  {
    path: "/app",
    Component: ProtectedRoute,
    children: [
      { index: true, Component: AppLayout },
      { path: "inbox", Component: InboxPage },
      { path: "workspaces", Component: WorkspacesPage },
      { path: "projects", Component: ProjectsPage },
      { path: "projects/:itemId", Component: ProjectsPage },
      { path: "focus", Component: FocusPage },
      { path: "search", Component: SearchPage },
      { path: "settings", Component: SettingsPage },
      { path: "settings/account", Component: AccountSettingsPage },
      { path: "settings/appearance", Component: AppearanceSettingsPage },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
