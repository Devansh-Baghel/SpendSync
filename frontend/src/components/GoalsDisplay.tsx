import { useEffect, useState, useContext } from "react";
import { AppContext } from "@/App";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import AddNewGoal from "./AddNewGoal";
import SingularGoalView from "./SingularGoalView";
import GoalsSkeleton from "./GoalsSkeleton";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { formatter } from "@/utils/formatter";

type GoalType = {
  _id: string;
  title: string;
  description: string;
  category: string;
  currentAmount: number;
  finalAmount: number;
};

function GoalsDisplay() {
  const { userData, selectedGoal, setSelectedGoal } = useContext(AppContext);
  const [isSelected, setIsSelected] = useState(false);
  const { goalId } = useParams();
  const navigate = useNavigate();

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["get-goals"],
    queryFn: async () => {
      return axios
        .get("/goals/get-goals")
        .then((res) => res.data.data.goals.reverse());
    },
  });

  useEffect(() => {
    refetch();
  }, [selectedGoal]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!goalId) setIsSelected(false);
  }, [goalId]);

  if (error) return "Error";

  return (
    <div className="flex gap-6 flex-col md:flex-row">
      {isPending ? (
        <GoalsSkeleton />
      ) : (
        <ScrollArea className="h-[75vh] sm:w-[400px] rounded-xl">
          {data.map((goal: GoalType) => (
            <Card
              className="mt-4 sm:mr-4 hover:bg-accent hover:cursor-pointer"
              key={goal._id}
              onClick={() => {
                setSelectedGoal(goal);
                setIsSelected(true);
                navigate(`/goals/${goal._id}`);
              }}
            >
              <CardHeader>
                <CardTitle className="text-lg">{goal.title}</CardTitle>
                <div>
                  <Badge className="text-xs">{goal.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center items-center gap-2 sm:gap-6 font-semibold">
                  {userData.user.currency}
                  {formatter.format(goal.currentAmount)}
                  <Progress
                    value={(goal.currentAmount * 100) / goal.finalAmount}
                  />
                  {userData.user.currency}
                  {formatter.format(goal.finalAmount)}
                </div>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      )}
      <div className="flex flex-col justify-between flex-1">
        {goalId === selectedGoal._id && goalId !== undefined ? (
          <SingularGoalView setIsSelected={setIsSelected} />
        ) : (
          <div className="flex flex-col justify-center items-center gap-6 flex-1">
            <h2 className="text-2xl text-primary-foreground font-bold">
              Select a goal to view
            </h2>
            <h2 className="text-xl font-bold text-primary-foreground">or</h2>
            <AddNewGoal />
          </div>
        )}

        {isSelected ? (
          <div className="flex justify-end">
            <AddNewGoal />
          </div>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
}

export default GoalsDisplay;
