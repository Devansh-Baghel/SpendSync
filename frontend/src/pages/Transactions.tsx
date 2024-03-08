import { AppContext } from "@/App";
import TransactionDisplay from "@/components/TransactionDisplay";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Transactions() {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !userData.user?.transactionHistory ||
      userData.user.transactionHistory?.length === 0
    ) {
      navigate("/create-transaction");
    }
  }, []);

  return (
    <div className="bg-primary rounded-[25px] w-screen h-[92vh] py-8 px-12 relative">
      <h1 className="text-3xl font-bold text-background mb-5">Transactions</h1>

      {/*  */}
      {/* <h1 className="text-3xl font-bold text-background mb-5 text-center mt-56">
        Work in Progress here <br /> ¯\_(ツ)_/¯
      </h1> */}
      <TransactionDisplay />

      {/*  */}
    </div>
  );
}

export default Transactions;
