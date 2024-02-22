import { useContext, useEffect } from "react";
import { AppContext } from "@/App";

function Overview() {
  const { userData } = useContext(AppContext);

  console.log(userData)

  return (
    <div>
      <h1 className="text-3xl font-bold">Overview</h1>
    </div>
  );
}

export default Overview;
