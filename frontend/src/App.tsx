import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layouts/layout/layout";
import { AdminActions } from "./components/pages/admin/admin-actions";
import { Calculator } from "./components/pages/calculator/Calculator";
import { Error } from "./components/pages/error/Error";
import { HomePage } from "./components/pages/home/home-page";
import { Leaderboard } from "./components/pages/leaderboard/Leaderboard";
import { RncpChecker } from "./components/pages/rncp/Rncp";
import { Settings } from "./components/pages/settings/Settings";
import { Stats } from "./components/pages/stats/Stats";
import { AuthProvider } from "./components/providers/AuthProvider";
import { ThemeProvider } from "./components/providers/ThemeProvider";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/calculator", element: <Calculator /> },
      { path: "/leaderboard", element: <Leaderboard /> },
      { path: "/stats", element: <Stats /> },
      { path: "/rncp", element: <RncpChecker /> },
      { path: "/settings", element: <Settings /> },
      { path: "/settings/your-account", element: <Settings /> },
      { path: "/settings/login-and-security", element: <Settings /> },
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
