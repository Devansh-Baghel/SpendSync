import Routing from "./Routing";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "http://localhost:3000/api/v1";
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <ModeToggle /> */}
      <Routing />
    </ThemeProvider>
  );
}

export default App;
