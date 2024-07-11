import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import Verify from "./pages/Verify";

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
        {
          path: "verify",
          element: <Verify></Verify>,
        },
      ],
    },
  ]);
