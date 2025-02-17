import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layouts/layout/Layout";
import { AdminActions } from "./components/pages/admin/admin-actions";
import { Calculator } from "./components/pages/calculator/Calculator";
import { Error } from "./components/pages/error/Error";
import { Home } from "./components/pages/home/Home";
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
      { path: "/", element: <Home /> },
      { path: "/settings", element: <Settings /> },
      { path: "/calculator", element: <Calculator /> },
      { path: "/leaderboard", element: <Leaderboard /> },
      { path: "/stats", element: <Stats /> },
      { path: "/rncp", element: <RncpChecker /> },
      { path: "/admin", element: <AdminActions /> },
    ],
  },
];

function App() {
  const router = createBrowserRouter(routes, {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  });

  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
