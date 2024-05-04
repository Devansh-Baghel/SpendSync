import { useContext } from "react";
import { AppContext } from "./App";
import HiddenStats from "./components/stats/HiddenStats";

function Statistics() {
  const { userData } = useContext(AppContext);

  return (
    <div className="bg-primary rounded-[25px] md:w-screen py-5 px-5 sm:px-8 mt-[-100px] md:mt-0">
      <h1 className="text-3xl font-bold text-background mb-5">Statistics</h1>

      {userData.user.isPaidUser ? (
        <h2>
          Here are your stats
          {/* // TODO: Display stats */}
        </h2>
      ) : (
        <div className="flex flex-wrap gap-6">
          {/* You aren't a premium member */}
          {/* TODO: Blur the bg and show the button to get premium*/}
          <HiddenStats />
          <HiddenStats />
          <HiddenStats />
          <HiddenStats />
          <HiddenStats />
          <HiddenStats />
        </div>
      )}
    </div>
  );
}

export default Statistics;
