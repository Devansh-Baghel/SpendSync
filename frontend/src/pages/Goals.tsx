import FirstGoal from "@/components/FirstGoal";
import { useContext } from "react";
import { AppContext } from "@/App";

function Goals() {
  const { userData } = useContext(AppContext);

  return (
    <div className="bg-primary rounded-[25px] w-screen h-[92vh] py-8 px-12">
      <h1 className="text-3xl font-bold text-background mb-5">Goals</h1>
      {userData.user.goals.length === 0 ? (
        <FirstGoal />
      ) : (
        <h2>Here are your goals</h2>
      )}
    </div>
  );
}

export default Goals;
