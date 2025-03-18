import "./App.css";
import Home from "@pages/Home";
import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const About = lazy(() => import("@pages/About"));
const Contact = lazy(() => import("@pages/Contact"));
function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
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
const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
