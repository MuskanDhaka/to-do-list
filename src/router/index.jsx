import Home from "@pages/Home";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import AppLayout from "../App"; // Import AppLayout here

const About = lazy(() => import("@pages/About"));
const Contact = lazy(() => import("@pages/Contact"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // ✅ Wrap all routes in AppLayout
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback="Loading">
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback="Loading">
            <Contact />
          </Suspense>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
