import { Checkbox } from "@/components/ui/checkbox";
import { useContext } from "react";
import { AppContext } from "@/App";

function SidebarPreferences() {
  const { showGoals, setShowGoals, showTransactions, setShowTransactions } =
    useContext(AppContext);

  function changeGoalState() {
    if (showGoals) {
      setShowGoals(false);
      localStorage.setItem("showGoals", "false");
    } else {
      setShowGoals(true);
      localStorage.setItem("showGoals", "true");
    }
  }

  function changeTransactionsState() {
    if (showTransactions) {
      setShowTransactions(false);
      localStorage.setItem("showTransactions", "false");
    } else {
      setShowTransactions(true);
      localStorage.setItem("showTransactions", "true");
    }
  }

  return (
    <div className="flex flex-col mt-6">
      <h3 className="font-semibold mb-3 text-sm">Sidebar Preferences</h3>
      <div className="flex gap-10">
        <div className="flex items-center gap-2">
          <Checkbox id="goals" onClick={changeGoalState} checked={showGoals} />
          <label
            htmlFor="goals"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Goals
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="transactions"
            onClick={changeTransactionsState}
            checked={showTransactions}
          />
          <label
            htmlFor="transactions"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Transactions
          </label>
        </div>
      </div>
    </div>
  );
}

export default SidebarPreferences;
