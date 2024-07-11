import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: "/",
      element: <AppLayout></AppLayout>,
      children: [
        {
          element: <AuthLayout></AuthLayout>,
          children: [
            {
              index: true,
              element: <Home></Home>,
            },
          ],
        },
      ],
    },
  ]);
