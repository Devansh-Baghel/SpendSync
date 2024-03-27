import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TransactionType } from "./TransactionDisplay";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "./ui/card";
import { useNavigate, Link } from "react-router-dom";
import { formatter } from "@/utils/formatter";
import { useContext } from "react";
import { AppContext } from "@/App";

function RecentTransactions() {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["recent-transactions"],
    queryFn: async () => {
      return axios
        .get("/transaction/recent-transactions")
        .then((res) => res.data.data.transactions);
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

  if (isLoading) return "loading";
  if (error) return "error";
  return (
    <Card className="rounded-xl bg-background">
      <CardHeader className="text-lg">
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="md:w-[150px]">Type</TableHead>
              <TableHead className="lg:w-[250px]">Title</TableHead>
              <TableHead className="lg:w-[150px]">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="text-xs sm:text-sm">
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
        </Table>
      </CardContent>

      <CardFooter>
        <Link to="/transactions" className="font-bold text-sm text-primary">
          View all transactions
        </Link>
      </CardFooter>
    </Card>
  );
}

export default RecentTransactions;
