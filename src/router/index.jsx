import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../App";
import LoginPage from "../components/Auth/Login";
import SignUpPage from "../components/Auth/SignUp";
import ProtectedRoute from "./ProtectedRoute"; 

const Home = lazy(() => import("@pages/Home"));
const About = lazy(() => import("@pages/About"));
const Contact = lazy(() => import("@pages/Contact"));
const Error = lazy(() => import("@pages/Error"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/signUp",
    element: <SignUpPage />,
  },

  {
    path: "/",
    element: <ProtectedRoute />, 
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            path: "home",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: "about",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <About />
              </Suspense>
            ),
          },
          {
            path: "contact",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Contact />
              </Suspense>
            ),
          },
          {
            path: "*",
            element: (
              <Suspense fallback={<div>Loading</div>}>
                <Error />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
