import { useContext } from "react";
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
import { Button } from "./ui/button";
import { FaPlus as PlusIcon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TransactionSkeleton from "./TransactionSkeleton";
import { useQuery } from "@tanstack/react-query";

const formatter = new Intl.NumberFormat("en-US");

export type TransactionType = {
  _id: string;
  title: string;
  wallet: string;
  category: string;
  amount: number;
  type: string;
};

function TransactionDisplay() {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  const { data, isPending, error } = useQuery({
    queryKey: ["get-transactions"],
    queryFn: async () => {
      return axios
        .get("/transaction/get-transactions")
        .then((res) => res.data.data.transactions.reverse());
    },
  });

  // Make the table-row-element to behave like a real button, can't use a real Link element or button to wrap the table-row as that messes up default shadcn table styling
  const onKeyDown = (
    event: React.KeyboardEvent<HTMLTableRowElement>,
    id: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      navigate(`/transactions/${id}`);
    }
    return;
  };

  if (error) return "Error";

  return (
    <div className="flex flex-col h-[75vh]">
      <ScrollArea className="rounded-xl bg-background p-5 flex-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="md:w-[150px]">Type</TableHead>
              <TableHead className="md:w-[150px]">Method</TableHead>
              <TableHead className="lg:w-[400px]">Title</TableHead>
              <TableHead className="">Amount</TableHead>
            </TableRow>
          </TableHeader>

          {isPending ? (
            <TransactionSkeleton />
          ) : (
            <TableBody>
              {data.map((transaction: TransactionType) => (
                <TableRow
                  key={transaction._id}
                  onClick={() => navigate(`/transactions/${transaction._id}`)}
                  className="cursor-pointer"
                  role="button"
                  onKeyDown={(e) => onKeyDown(e, transaction._id)}
                  tabIndex={0}
                >
                  <TableCell className="font-medium">
                    {transaction.type}
                  </TableCell>
                  <TableCell>{transaction.wallet}</TableCell>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell className="">
                    {transaction.type === "Expense" ? (
                      <span>&minus; </span>
                    ) : (
                      <span>+ </span>
                    )}
                    {userData.user.currency}
                    {formatter.format(transaction.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </ScrollArea>

      <div className="">
        <Button
          className="font-bold h-14 text-md md:w-72 flex gap-2 w-full mt-6"
          variant={"outline"}
          onClick={() => navigate("/create-transaction")}
        >
          <PlusIcon className="w-5 h-5" />
          New Transaction
        </Button>
      </div>
    </div>
  );
}

export default TransactionDisplay;
