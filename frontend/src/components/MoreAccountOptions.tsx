import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "@/components/ui/button";
import Feedback from "@/components/Feedback";

function MoreAccountOptions() {
  return (
    <Card className="px-10 pt-6 flex-1">
      <CardTitle className="text-xl font-medium">More Options</CardTitle>
      <CardContent className="flex flex-col ml-0 pl-0 mt-6 gap-6">
        <div className="flex gap-6">
          <Button variant={"outline"}>Update Account Balance</Button>
          <Button variant={"outline"} className="flex-1">
            Export Transactions Data
          </Button>
        </div>
        <div className="flex gap-6">
          <Button variant={"outline"}>Update Income and Expense</Button>
          <Button variant={"outline"} className="flex-1">
            Export Goals Data
          </Button>
        </div>

        <Feedback></Feedback>
      </CardContent>
    </Card>
  );
}

export default MoreAccountOptions;
