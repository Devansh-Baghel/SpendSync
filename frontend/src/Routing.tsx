import Landing from "./pages/Landing";
import Register from "./pages/Register";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function Routing() {
  return <RouterProvider router={router} />;
}

export default Routing;
