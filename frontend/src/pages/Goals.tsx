import FirstGoal from "@/components/FirstGoal";
import { useContext } from "react";
import { AppContext } from "@/App";
import GoalsDisplay from "@/components/GoalsDisplay";

function Goals() {
  const { userData } = useContext(AppContext);

  console.log(userData, userData.user, userData.user.goals);

  return (
    <div className="bg-primary rounded-[25px] md:w-screen py-6 px-5 sm:px-8 mt-[-100px] md:mt-0">
      <h1 className="text-3xl font-bold text-background mb-5">Goals</h1>
      {userData.user.goals.length === 0 ? <FirstGoal /> : <GoalsDisplay />}
    </div>
  );
}

export default Goals;
