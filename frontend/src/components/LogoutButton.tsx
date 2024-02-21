import { AppContext } from "@/App";
import { useContext } from "react";
import axios from "axios";
import { HiOutlineLogout as LogoutIcon } from "react-icons/hi";

function LogoutButton() {
  const { setIsLoggedIn } = useContext(AppContext);

  async function handleLogout() {
    await axios.post("/users/logout");
    localStorage.removeItem("userStatus");
    setIsLoggedIn(false);
  }

  return (
    <button
      className="flex items-center gap-6"
      onClick={() => {
        handleLogout();
      }}
    >
      <LogoutIcon className="w-6 h-6 text-accent-foreground"/>
      Log out
    </button>
  );
}

export default LogoutButton;
