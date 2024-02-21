import { AppContext } from "@/App";
import { useContext } from "react";
import axios from "axios";
import { Button } from "./ui/button";

function LogoutButton() {
  const { setIsLoggedIn } = useContext(AppContext);

  async function handleLogout() {
    await axios.post("/users/logout");
    localStorage.removeItem("userStatus");
    setIsLoggedIn(false);
  }

  return (
    <Button
      onClick={() => {
        handleLogout();
      }}
    >
      Log out
    </Button>
  );
}

export default LogoutButton;
