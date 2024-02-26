import { useContext } from "react";
import { AppContext } from "@/App";

function Account() {
  const { userData } = useContext(AppContext);

  return (
    <div className="bg-primary rounded-[25px] w-screen h-[92vh] py-8 px-12">
      <h1 className="text-3xl font-bold text-background mb-5">Account</h1>
    </div>
  );
}

export default Account;
