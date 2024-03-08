import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppContext } from "@/App";
import { ScrollArea } from "./ui/scroll-area";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { FaPlus as PlusIcon } from "react-icons/fa";

const formatter = new Intl.NumberFormat("en-US");

type TransactionType = {
  _id: string;
  title: string;
  wallet: string;
  category: string;
  amount: number;
  type: string;
};

function TransactionDisplay() {
  const [transactions, setTransactions] = useState([]);
  const { userData } = useContext(AppContext);

  useEffect(() => {
    axios.get("/transaction/get-transactions").then((res) => {
      setTransactions(res.data.data.transactions.reverse());
      console.log(res.data);
    });
  }, []);

  return (
    <div className="flex flex-col h-[75vh]">
      <ScrollArea className="rounded-xl bg-background p-5 max-h-[450px]">
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Type</TableHead>
              <TableHead className="w-[150px]">Method</TableHead>
              <TableHead className="w-[400px]">Title</TableHead>
              <TableHead className="">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction: TransactionType) => (
              <TableRow key={transaction._id}>
                <TableCell className="font-medium">
                  {transaction.type}
                </TableCell>
                <TableCell>{transaction.wallet}</TableCell>
                <TableCell>{transaction.title}</TableCell>
                <TableCell className="">
                  {userData.user.currency}
                  {formatter.format(transaction.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      <div className="absolute bottom-6 right-10">
        <Link to={"/create-transaction"}>
          <Button
            className="font-bold h-14 text-md w-72 flex gap-2"
            variant={"outline"}
          >
            <PlusIcon className="w-5 h-5" />
            New Transaction
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default TransactionDisplay;
