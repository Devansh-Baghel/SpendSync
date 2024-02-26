import Routing from "./Routing";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";
import { createContext, useState } from "react";
import axios from "axios";
// import { IconContext } from "react-icons";

export const AppContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("userStatus") === "loggedIn",
  );
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")),
  );
  const [showGoals, setShowGoals] = useState(
    localStorage.getItem("showGoals") === "true",
  );
  const [showTransactions, setShowTransactions] = useState(
    localStorage.getItem("showTransactions") === "true",
  );

  const [selectedGoal, setSelectedGoal] = useState({});

  axios.defaults.baseURL = "http://localhost:3000/api/v1";
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
        {/* </IconContext.Provider> */}
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
