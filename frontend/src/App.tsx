import Routing from "./Routing";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";
import { Toaster as RHToaster } from "react-hot-toast";
import { createContext, useState } from "react";
import axios from "axios";
// import { IconContext } from "react-icons";

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

  axios.defaults.baseURL = "https://spendsync.up.railway.app/api/v1";
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
        {/* <IconContext.Provider value={{ size: "2em" }}> */}
        {/* <ModeToggle /> */}
        <Routing />
        <Toaster />
        <RHToaster
          toastOptions={{
            success: {
              duration: 3000,
            },
          }}
        />
        {/* </IconContext.Provider> */}
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
