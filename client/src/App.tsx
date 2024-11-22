import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layouts/layout/Layout";
import { Calculator } from "./components/pages/calculator/Calculator";
import { Error } from "./components/pages/error/Error";
import { Home } from "./components/pages/home/Home";
import { Leaderboard } from "./components/pages/leaderboard/Leaderboard";
import { RncpChecker } from "./components/pages/rncp/Rncp";
import { Settings } from "./components/pages/settings/Settings";
import { Stats } from "./components/pages/stats/Stats";
import { AuthProvider } from "./components/providers/AuthProvider";
import { ThemeProvider } from "./components/providers/ThemeProvider";

function App() {
  const router = createBrowserRouter([
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
      ],
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
