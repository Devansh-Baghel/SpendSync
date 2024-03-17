import { useParams } from "react-router-dom";

function SingleTransaction() {
  const { transactionId } = useParams();
  return (
    <div className="bg-primary rounded-[25px] md:w-screen py-6 px-5 sm:px-8 mt-[-100px] md:mt-0 relative">
      <h1 className="text-3xl font-bold text-background mb-5">
        Transaction {transactionId}
      </h1>
    </div>
  );
}

export default SingleTransaction;
