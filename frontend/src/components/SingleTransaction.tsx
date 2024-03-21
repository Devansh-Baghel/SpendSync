import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { FaPlus as PlusIcon } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TransactionType = {
  amount: number;
  category: string;
  date: string;
  receipt: string;
  title: string;
  type: string;
  wallet: string;
  createdAt: string;
  updatedAt: string;
};

function SingleTransaction() {
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState<TransactionType>();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("/transaction/get-transaction", { transactionId })
      .then((res) => {
        setTransaction(res.data.data.transaction);
        console.log(res.data);
      });
  }, []);

  return (
    <div className="bg-primary rounded-[25px] md:w-screen py-6 px-5 sm:px-8 mt-[-100px] md:mt-0 relative flex flex-col">
      <h1 className="text-3xl font-bold text-background mb-5">
        Transaction: {transaction?.title}
      </h1>

      {transaction?.receipt ? (
        <a href={transaction.receipt} target="_blank">
          <img src={transaction.receipt} alt="" />
        </a>
      ) : (
        <span>Nothing here</span>
      )}

      <Card className="mt-10 relative border-0 flex-1">
        <CardHeader>
          <CardTitle className="text-xl mt-1">{transaction?.title}</CardTitle>
          <CardDescription>
            {new Date(transaction?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {transaction?.type === "Expense" ? (
            <div
              className="bg-red-500 text-stone-900 font-bold px-4 text-center absolute top-[-16px] left-0 w-full"
              style={{ borderRadius: "20px 20px 0 0" }}
            >
              <p>{transaction?.type}</p>
            </div>
          ) : (
            <div
              className="bg-green-600 text-stone-800 font-bold px-4 text-center absolute top-[-16px] left-0 w-full"
              style={{ borderRadius: "20px 20px 0 0" }}
            >
              <p>{transaction?.type}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>

      <Button
        className="font-bold h-14 text-md md:w-72 flex gap-2 w-full mt-6"
        variant={"outline"}
        onClick={() => navigate("/create-transaction")}
      >
        <PlusIcon className="w-5 h-5" />
        New Transaction
      </Button>
    </div>
  );
}

export default SingleTransaction;
