import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./layouts/AppLayout";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: "/",
      element: <AppLayout></AppLayout>,
      children: [
        {
          index: true,
          element: <Home></Home>,
        },
      ],
    },
  ]);
