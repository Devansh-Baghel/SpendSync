import Routing from "./Routing";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { createContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  axios.defaults.baseURL = "http://localhost:3000/api/v1";
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {/* <ModeToggle /> */}
        <Routing />
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
