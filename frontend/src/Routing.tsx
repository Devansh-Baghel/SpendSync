import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { AppContext } from "./App";
import { useContext } from "react";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";
import Overview from "./pages/Overview";
import Goals from "./pages/Goals";
import Account from "./pages/Account";
import SingularGoalView from "./components/SingularGoalView";

function Routing() {
  const { isLoggedIn } = useContext(AppContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? <Dashboard /> : <Landing />,
      children: [
        {
          index: true,
          element: <Overview />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "transactions",
          element: <Transactions />,
        },
        {
          path: "account",
          element: <Account />,
        },
        {
          path: "goals",
          element: <Goals />,
          children: [
            {
              path: ":goalId",
              element: <SingularGoalView />,
            },
          ],
        },
      ],
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Routing;
