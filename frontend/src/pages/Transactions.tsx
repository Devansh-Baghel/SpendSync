import { AppContext } from "@/App";
import TransactionDisplay from "@/components/TransactionDisplay";
import { useContext } from "react";
import { useParams, Outlet } from "react-router-dom";
import NewTransaction from "./NewTransaction";
import useTitle from "@/hooks/useTitle";

function Transactions() {
  useTitle("Transactions");
  const { userData } = useContext(AppContext);
  const { transactionId } = useParams();

  if (transactionId) return <Outlet />;

  if (
    !userData.user?.transactionHistory ||
    userData.user.transactionHistory?.length === 0
  ) {
    return <NewTransaction />;
  }
  return (
    <div className="bg-primary rounded-[25px] md:w-screen py-6 px-5 sm:px-8 mt-[-100px] md:mt-0 relative">
      <h1 className="text-3xl font-bold text-background mb-5">Transactions</h1>
      <TransactionDisplay />
    </div>
  );
}

export default Transactions;
