import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExpenseTransactionCard from "@/components/ExpenseTransactionCard";
import IncomeTransactionCard from "@/components/IncomeTransactionCard";

function NewTransaction() {
  return (
    <div className="bg-primary rounded-[25px] w-screen h-[92vh] py-8 px-12">
      <h1 className="text-3xl font-bold text-background mb-5">
        Create a New Transaction
      </h1>

      <Tabs defaultValue="expense" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="expense">Expense</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
        </TabsList>
        <TabsContent value="expense">
          <ExpenseTransactionCard />
        </TabsContent>
        <TabsContent value="income">
          <IncomeTransactionCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default NewTransaction;
