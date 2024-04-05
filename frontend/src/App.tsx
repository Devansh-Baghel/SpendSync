import Routing from "./Routing";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";
import { Toaster as RHToaster } from "react-hot-toast";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

// adding this any just for now, gonna remove this later
/* eslint-disable @typescript-eslint/no-explicit-any */
export const AppContext = createContext<any>({});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("userStatus") === "loggedIn"
  );
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData") || "{}")
  );
  const [showGoals, setShowGoals] = useState(
    localStorage.getItem("showGoals") === "true" ||
      !localStorage.getItem("showGoals")
  );
  const [showTransactions, setShowTransactions] = useState(
    localStorage.getItem("showTransactions") === "true" ||
      !localStorage.getItem("showTransactions")
  );

  const [selectedGoal, setSelectedGoal] = useState({});

  useEffect(() => {
    if (isLoggedIn) {
      axios.get("/users/get-current-user").then((res) => {
        setUserData(res.data.data);
        localStorage.setItem("userData", JSON.stringify(res.data.data));
      });
    }

    if (userData?.user?.stripeSessionId && !userData?.user?.isPaidUser) {
      axios.post("/pay/confirm-payment").then((res) => {
        setUserData(res.data.data);
        localStorage.setItem("userData", JSON.stringify(res.data.data));
      });
    }
  }, []);

  axios.defaults.baseURL = import.meta.env.VITE_API_URI;
  axios.defaults.withCredentials = true;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          userData,
          setUserData,
          selectedGoal,
          setSelectedGoal,
          showGoals,
          setShowGoals,
          showTransactions,
          setShowTransactions,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Routing />
          <Toaster />
          <ReactQueryDevtools />
          <RHToaster
            toastOptions={{
              success: {
                duration: 3000,
              },
            }}
          />
        </QueryClientProvider>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
