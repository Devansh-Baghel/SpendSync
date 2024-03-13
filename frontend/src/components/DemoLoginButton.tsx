import toast from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "@/App";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function DemoLoginButton() {
  const { setIsLoggedIn, setUserData } = useContext(AppContext);
  const navigate = useNavigate();

  async function demoLogin() {
    const toastPromise = axios
      .post("/users/login", {
        email: "demo@demo.demo",
        password: import.meta.env.VITE_DEMO_PASS,
      })
      .then((response) => {
        localStorage.setItem("userStatus", "loggedIn");
        setIsLoggedIn(true);
        localStorage.setItem("userData", JSON.stringify(response.data.data));
        setUserData(response.data.data);
        navigate("/");
      });

    toast.promise(toastPromise, {
      loading: "Logging in...",
      success: "Logged in as a demo user",
      error: "Error logging you in",
    });
  }

  return (
    <Button
      className="w-full mt-4 rounded-[20px]"
      onClick={demoLogin}
      type="button"
    >
      Login as a demo user
    </Button>
  );
}

export default DemoLoginButton;
