import { useContext } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { AppContext } from "@/App";
import { PiCrown as ProIcon } from "react-icons/pi";
import toast from "react-hot-toast";

function CheckoutButton() {
  const { setUserData } = useContext(AppContext);

  function handleCheckout() {
    toast.loading("Creating checkout session...");
    axios
      .post("/pay/create-checkout")
      .then((res) => {
        if (res.status === 200) {
          setUserData(res.data.data);
          localStorage.setItem("userData", JSON.stringify(res.data.data));
          window.location = res.data.data.url;
        }
      })
      .catch((e) => {
        console.error(e.error);
      });
  }

  return (
    <Button
      onClick={handleCheckout}
      className="w-full md:w-full h-14 bg-green-600 rounded-[20px] text-lg flex justify-center items-center gap-4 text-white font-semibold hover:bg-green-700 shadow-md"
    >
      <ProIcon className="w-8 h-8" />
      Upgrade to premium
    </Button>
  );
}

export default CheckoutButton;
