import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "@/components/ui/button";
// @ts-expect-error idk why this next line upsets typescript
import Feedback from "@/components/Feedback";
import UpdateAccountBalance from "./UpdateAccountBalance";
import UpdateIncomeAndExpense from "./UpdateIncomeAndExpense";
import toast from "react-hot-toast";

function MoreAccountOptions() {
  return (
    <Card className="px-10 pt-6 flex-1">
      <CardTitle className="text-xl font-medium">More Options</CardTitle>
      <CardContent className="flex flex-col ml-0 pl-0 mt-6 gap-6">
        <div className="flex gap-6">
          <UpdateAccountBalance />
          <Button
            variant={"outline"}
            className="flex-1"
            onClick={() => toast("Work in progress...")}
          >
            Export Transactions Data
          </Button>
        </div>
        <div className="flex gap-6">
          {/* <Button variant={"outline"}>Update Income and Expense</Button> */}
          <UpdateIncomeAndExpense />
          <Button
            variant={"outline"}
            className="flex-1"
            onClick={() => toast("Work in progress...")}
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
