import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layouts/layout/layout";
import { AdminActions } from "./components/pages/admin/admin-actions";
import { CalculatorPage } from "./components/pages/calculator/calculator-page";
import { ErrorPage } from "./components/pages/error/error-page";
import { HomePage } from "./components/pages/home/home-page";
import { LeaderboardPage } from "./components/pages/leaderboard/leaderboard-page";
import { AccountSettingsPage } from "./components/pages/settings/account-settings-page";
import { DeviceSettingsPage } from "./components/pages/settings/device-settings-page";
import { FortyTwoStatsPage } from "./components/pages/stats/forty-two/forty-two-stats-page";
import { MainStatsPage } from "./components/pages/stats/main/main-stats-page";
import { AuthProvider } from "./components/providers/AuthProvider";
import { ThemeProvider } from "./components/providers/ThemeProvider";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/calculator", element: <CalculatorPage /> },
      { path: "/leaderboard", element: <LeaderboardPage /> },
      { path: "/stats/42", element: <FortyTwoStatsPage /> },
      { path: "/stats/42stats", element: <MainStatsPage /> },
      // { path: "/rncp", element: <RncpChecker /> },
      { path: "/settings/your-account", element: <AccountSettingsPage /> },
      { path: "/settings/login-and-security", element: <DeviceSettingsPage /> },
      { path: "/admin", element: <AdminActions /> },
    ],
  },
];

function App() {
  const router = createBrowserRouter(routes);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
