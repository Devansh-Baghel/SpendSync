import { FcOk as CheckIcon } from "react-icons/fc";
import { Button } from "../ui/button";
import { PiCrown as ProIcon } from "react-icons/pi";
import { Link } from "react-router-dom";

function PaymentSuccess() {
  return (
    <div className="bg-primary rounded-[25px] md:w-screen py-5 px-5 sm:px-8 mt-[-100px] md:mt-0">
      <h1 className="text-3xl font-bold text-background mb-5">Payment</h1>
      <div className="bg-card w-96 p-10 rounded-[20px] flex flex-col justify-center items-center gap-3 m-auto mt-6 border-t-[10px] border-t-green-500 shadow-2xl">
        <CheckIcon className="w-24 h-24" />
        <h3 className="text-3xl text-center font-medium">
          Your payment was successful
        </h3>
        <p className="text-center text-lg">
          You are a{" "}
          <span className="text-yellow-400">
            <ProIcon className="w-6 h-6 inline mr-1" />
            premium
          </span>{" "}
          member now!
        </p>
        <Link to={"/"}>
          <Button className="mt-4">Continue to Dashboard</Button>
        </Link>
        <Link to={"/statistics"}>
          <Button variant="outline">Continue to Statistics</Button>
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;
