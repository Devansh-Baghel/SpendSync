import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "@/components/ui/button";
import Feedback from "@/components/Feedback";
import UpdateAccountBalance from "./UpdateAccountBalance";
import UpdateIncomeAndExpense from "./UpdateIncomeAndExpense";
import toast from "react-hot-toast";
import { json2csv } from "json-2-csv";
import axios from "axios";

function MoreAccountOptions() {
  function downloadTransactions() {
    const transactions = axios
      .get("/transaction/get-transactions")
      .then((res: { data: { data: { transactions: [] } } }) => {
        const csv = json2csv(res.data.data.transactions.reverse());
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "transactions.csv");
        document.body.appendChild(link);
        link.click();
        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });

    toast.promise(transactions, {
      success: "Downloaded transactions data",
      loading: "Downloading transactions data",
      error: "Failed to download transactions data",
    });
  }

  function downloadGoals() {
    const goals = axios
      .get("/goals/get-goals")
      .then((res: { data: { data: { goals: [] } } }) => {
        const csv = json2csv(res.data.data.goals.reverse());
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "goals.csv");
        document.body.appendChild(link);
        link.click();
        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });

    toast.promise(goals, {
      success: "Downloaded goals data",
      loading: "Downloading goals data",
      error: "Failed to download goals data",
    });
  }

  return (
    <Card className="sm:px-10 pt-6 flex-1 pl-5">
      <CardTitle className="text-xl font-medium">More Options</CardTitle>
      <CardContent className="flex flex-col ml-0 pl-0 mt-6 gap-6">
        <div className="flex gap-6 flex-col sm:flex-row">
          <UpdateAccountBalance />
          <Button
            variant={"outline"}
            className="flex-1"
            onClick={downloadTransactions}
          >
            Export Transactions Data
          </Button>
        </div>
        <div className="flex gap-6 flex-col sm:flex-row">
          <UpdateIncomeAndExpense />
          <Button
            variant={"outline"}
            className="flex-1"
            onClick={downloadGoals}
          >
            Export Goals Data
          </Button>
        </div>

        <Feedback />
      </CardContent>
    </Card>
  );
}

export default MoreAccountOptions;
