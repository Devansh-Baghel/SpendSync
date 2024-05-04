import { useContext } from "react";
import { AppContext } from "./App";
import HiddenStats from "./components/stats/HiddenStats";
import CheckoutButton from "./components/CheckoutButton";
import useTitle from "./hooks/useTitle";

function Statistics() {
  useTitle("Statistics");
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
        <div className="relative" id="hidden-stats">
          <HiddenStats />
          <div className="absolute w-full top-40 left-0 flex justify-center items-center flex-col">
            <div className="bg-primary rounded-[20px] p-6 flex justify-center items-center flex-col gap-6 border-4 border-background shadow-inner">
              <h3 className="text-2xl text-background font-bold">
                This is a premium feature
              </h3>
              <div className="md:w-80">
                <CheckoutButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Statistics;
