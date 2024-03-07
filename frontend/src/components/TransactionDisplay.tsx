import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppContext } from "@/App";

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
    <div>
      <div className="rounded-xl bg-background p-5">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Type</TableHead>
              <TableHead className="w-[150px]">Method</TableHead>
              <TableHead className="w-[400px]">Title</TableHead>
              <TableHead className="">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow>
                <TableCell className="font-medium">
                  {transaction.type}
                </TableCell>
                <TableCell>{transaction.wallet}</TableCell>
                <TableCell>{transaction.title}</TableCell>
                <TableCell className="">
                  {userData.user.currency}
                  {transaction.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default TransactionDisplay;
