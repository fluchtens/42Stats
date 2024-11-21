import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "./components/layouts/layout/Layout";
import { Error } from "./components/pages/error/Error";
import { Home } from "./components/pages/home/Home";
import { AuthProvider } from "./components/providers/AuthProvider";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home /> },
        // { path: "/login", element: <Login /> },
        // { path: "/register", element: <Register /> },
        // { path: "/projects", element: <Projects /> },
        // { path: "/p/:id", element: <ProjectPage /> },
        // { path: "/settings", element: <Settings /> },
        // { path: "/settings/your-account", element: <AccountSettingsTab /> },
        // { path: "/settings/login-and-security", element: <SecuritySettingsTab /> },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
