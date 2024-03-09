import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExpenseTransactionCard from "@/components/ExpenseTransactionCard";
import IncomeTransactionCard from "@/components/IncomeTransactionCard";

function NewTransaction() {
  return (
    <div className="bg-primary rounded-[25px] md:w-screen py-6 px-5 sm:px-8 mt-[-100px] md:mt-0">
      <h1 className="text-3xl font-bold text-background mb-5">
        Create a New Transaction
      </h1>

      <Tabs defaultValue="expense" className="sm:w-[400px]">
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
