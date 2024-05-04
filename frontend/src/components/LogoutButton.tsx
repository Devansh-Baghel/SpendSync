import { AppContext } from "@/App";
import { useContext } from "react";
import axios from "axios";
import { HiOutlineLogout as LogoutIcon } from "react-icons/hi";
import { toast } from "react-hot-toast";

function LogoutButton() {
  const { setIsLoggedIn } = useContext(AppContext);

  async function handleLogout() {
    const toastPromise = axios.post("/users/logout").then(() => {
      localStorage.removeItem("userStatus");
      setIsLoggedIn(false);
    });

    toast.promise(toastPromise, {
      success: "Logged out",
      loading: "Logging out",
      error: "Unable to log out",
    });
  }

  return (
    <button
      className="flex items-center gap-6 hover:text-red-500"
      onClick={() => {
        handleLogout();
      }}
    >
      <LogoutIcon className="w-6 h-6 " />
      Log out
    </button>
  );
}

export default LogoutButton;
