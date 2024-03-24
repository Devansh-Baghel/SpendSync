import { useContext } from "react";
import { AppContext } from "@/App";
import AccountBalance from "@/components/AccountBalance";
import InitialDeposit from "@/components/InitialDeposit";
import IncomeAndExpense from "@/components/IncomeAndExpense";
import AddIncomeAndExpense from "@/components/AddIncomeAndExpense";
import { PiCrown as ProIcon } from "react-icons/pi";
import axios from "axios";
import { Button } from "@/components/ui/button";

function Overview() {
  const { userData, setUserData } = useContext(AppContext);

  function handleCheckout() {
    axios
      .post("/pay/checkout")
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
    <div className="bg-primary rounded-[25px] md:w-screen py-6 px-5 sm:px-8 mt-[-100px] md:mt-0">
      <h1 className="text-3xl font-bold text-background mb-5">Overview</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div>
          {userData.user.currentBalance === 0 ? (
            <InitialDeposit />
          ) : (
            <AccountBalance />
          )}
          <h1 className="text-2xl font-bold text-background my-5">
            Income and expense
          </h1>
          {userData.user.hasSetIncomeAndExpense ? (
            <IncomeAndExpense />
          ) : (
            <AddIncomeAndExpense />
          )}
        </div>

        <Button
          onClick={handleCheckout}
          className="w-full md:w-80 h-14 bg-green-600 rounded-[20px] text-lg flex justify-center items-center gap-4 text-white font-semibold hover:bg-green-700"
        >
          <ProIcon className="w-8 h-8" />
          Upgrade to premium
        </Button>
      </div>
    </div>
  );
}

export default Overview;
