import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "@/components/ui/button";

function MoreAccountOptions() {
  return (
    <Card className="px-10 pt-6 flex-1">
      <CardTitle className="text-xl font-medium">More Options</CardTitle>
      <CardContent className="flex flex-col ml-0 pl-0 mt-6 gap-6">
        <div className="flex gap-6">
          <Button>Update Account Balance</Button>
          <Button className="flex-1">Export Transactions Data</Button>
        </div>
        <div className="flex gap-6">
          <Button>Update Income and Expense</Button>
          <Button className="flex-1">Export Goals Data</Button>
        </div>
        <Button variant={"outline"} className="h-10">Give Feedback</Button>
      </CardContent>
    </Card>
  );
}

export default MoreAccountOptions;
