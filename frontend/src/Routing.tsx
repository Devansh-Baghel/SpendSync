import Landing from "./pages/Landing";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
]);

function Routing() {
  return <RouterProvider router={router} />;
}

export default Routing;
