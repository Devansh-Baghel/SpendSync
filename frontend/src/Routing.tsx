// import Landing from "./pages/Landing";
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
import NewTransaction from "./pages/NewTransaction";
import ResetDemo from "./pages/ResetDemo";
import SingleTransaction from "./components/SingleTransaction";

function Routing() {
  const { isLoggedIn } = useContext(AppContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? <Dashboard /> : <Login />,
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
          children: [
            {
              path: ":transactionId",
              element: <SingleTransaction />,
            },
          ],
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
        {
          path: "create-transaction",
          element: <NewTransaction />,
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
    {
      path: "reset-demo",
      element: <ResetDemo />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Routing;
