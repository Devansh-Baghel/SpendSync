import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/App";
import HiddenStats from "../components/stats/HiddenStats";
import CheckoutButton from "../components/CheckoutButton";
import useTitle from "../hooks/useTitle";
import FixedIncomeExpenseGraph from "../components/stats/FixedIncomeExpenseGraph";
import TimeRangeIncomeAndExpense from "../components/stats/TimeRangeIncomeAndExpense";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";

function Statistics() {
  useTitle("Statistics");
  const { userData } = useContext(AppContext);
  const { data, isLoading } = useQuery({
    queryKey: ["time-range-income-expense"],
    queryFn: () => {
      return axios
        .get("/stats/get-income-expense-by-time-range")
        .then((res) => res.data.data);
    },
  });

  console.log(data);

  return (
    <div className="bg-primary rounded-[25px] md:w-screen py-5 px-5 sm:px-5 mt-[-100px] md:mt-0">
      <h1 className="text-3xl font-bold text-background mb-5">Statistics</h1>

      <ScrollArea className="">
        {userData.user.isPaidUser ? (
          <div className="flex flex-col gap-4 max-h-[75vh]">
            <FixedIncomeExpenseGraph />

            <h2 className="text-2xl font-semibold text-background">
              Income and expense by week / month / year
            </h2>
            {isLoading ? (
              // TODO: Add loading skeletons here
              <p>Data loading...</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                <TimeRangeIncomeAndExpense timeRange="week" data={data.week} />
                <TimeRangeIncomeAndExpense
                  timeRange="month"
                  data={data.month}
                />
                <TimeRangeIncomeAndExpense timeRange="year" data={data.year} />
              </div>
            )}
            {/* // TODO: Display stats */}
          </div>
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
      </ScrollArea>
    </div>
  );
}

export default Statistics;
