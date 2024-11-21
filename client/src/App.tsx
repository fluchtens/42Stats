import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { Layout } from "./components/layouts/layout/Layout";
import { Error } from "./components/pages/error/Error";
import { Home } from "./components/pages/home/Home";

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
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
