import UpdatePassword from "@/components/UpdatePassword";
import UpdateCurrency from "@/components/UpdateCurrency";

function Settings() {
  return (
    <div className="bg-primary rounded-[25px] w-screen h-[92vh] py-8 px-12">
      <h1 className="text-3xl font-bold text-background mb-5">Settings</h1>

      <div className="flex flex-col gap-6">
        <UpdatePassword />
        <UpdateCurrency />
      </div>
    </div>
  );
}

export default Settings;
