import UpdatePassword from "@/components/UpdatePassword";
import UpdateCurrency from "@/components/UpdateCurrency";
import useTitle from "@/hooks/useTitle";

function Settings() {
  useTitle("Settings");
  return (
    <div className="bg-primary rounded-[25px] md:w-screen py-6 px-5 sm:px-8 mt-[-100px] md:mt-0">
      <h1 className="text-3xl font-bold text-background mb-5">Settings</h1>

      <div className="flex flex-col gap-6">
        <UpdatePassword />
        <UpdateCurrency />
      </div>
    </div>
  );
}

export default Settings;
