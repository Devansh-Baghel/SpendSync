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
import Statistics from "./pages/Statistics";
import NewTransaction from "./pages/NewTransaction";
import SingularGoalView from "./components/SingularGoalView";
import ResetDemo from "./pages/ResetDemo";
import SingleTransaction from "./components/SingleTransaction";
import NotFound from "./components/NotFound";
import PaymentSuccess from "./components/payment/PaymentSuccess";

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
          path: "statistics",
          element: <Statistics />,
        },
        {
          path: "payment-success",
          element: <PaymentSuccess />,
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
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Routing;
