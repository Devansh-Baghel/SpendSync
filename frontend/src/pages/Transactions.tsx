import { AppContext } from "@/App";
import TransactionDisplay from "@/components/TransactionDisplay";
import { useContext, useEffect } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";

function Transactions() {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  const { transactionId } = useParams();

  console.log(userData.user);

  useEffect(() => {
    if (
      !userData.user?.transactionHistory ||
      userData.user.transactionHistory?.length === 0
    ) {
      navigate("/create-transaction");
    }
  }, []);

  if (transactionId) return <Outlet />;

  return (
    <div className="bg-primary rounded-[25px] md:w-screen py-6 px-5 sm:px-8 mt-[-100px] md:mt-0 relative">
      <h1 className="text-3xl font-bold text-background mb-5">Transactions</h1>
      <TransactionDisplay />
    </div>
  );
}

export default Transactions;
