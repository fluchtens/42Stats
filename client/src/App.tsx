import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "./components/layouts/layout/Layout";
import { Calculator } from "./components/pages/calculator/Calculator";
import { Error } from "./components/pages/error/Error";
import { Home } from "./components/pages/home/Home";
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
        { path: "/calculator", element: <Calculator /> },
      ],
    },
  ]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
