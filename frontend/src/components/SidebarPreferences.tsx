import { Checkbox } from "@/components/ui/checkbox";

function SidebarPreferences() {
  return (
    <div className="flex flex-col mt-6">
      <h3 className="font-semibold mb-3">Sidebar Preferences</h3>
      <div className="flex gap-10">
        <div className="flex items-center gap-2">
          <Checkbox id="goals" />
          <label
            htmlFor="goals"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Goals
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="transactions" />
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
