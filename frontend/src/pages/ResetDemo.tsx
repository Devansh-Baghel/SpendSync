import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "@/App";

function ResetDemo() {
  const { isLoggedIn } = useContext(AppContext);

  function resetDemo() {
    const toastPromise = axios.post("/demo/reset-demo-user");

    toast.promise(toastPromise, {
      loading: "Reseting demo user...",
      success: "Demo user has been reset",
      error: "Unable to reset demo user",
    });
  }

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <Button onClick={resetDemo} disabled={!isLoggedIn}>
        Reset demo user
      </Button>
    </div>
  );
}

export default ResetDemo;
