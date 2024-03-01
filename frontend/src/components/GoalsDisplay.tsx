import { useEffect, useState, useContext } from "react";
import { AppContext } from "@/App";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import AddNewGoal from "./AddNewGoal";
import SingularGoalView from "./SingularGoalView";
import { useParams, useNavigate } from "react-router-dom";

const formatter = new Intl.NumberFormat("en-US");

type GoalType = {
  _id: string;
  title: string;
  description: string;
  category: string;
  currentAmount: number;
  finalAmount: number;
};

function GoalsDisplay() {
  const [goals, setGoals] = useState([]);
  const { selectedGoal, setSelectedGoal } = useContext(AppContext);
  const [isSelected, setIsSelected] = useState(false);
  const { goalId } = useParams();
  const navigate = useNavigate();

  // const {data, error, isError, isLoading} = useQuery("get-goals", () => {
  //   return axios.get("/goals/get-goals")
  // })

  useEffect(() => {
    axios.get("/goals/get-goals").then((res) => {
      setGoals(res.data.data.goals.reverse());
      console.log(res.data);
    });
  }, [selectedGoal]);

  useEffect(() => {
    if (!goalId) setIsSelected(false);
  }, [goalId]);

  // if (isLoading) return <h1>Loading...</h1>

  return (
    <div className="flex gap-6">
      <ScrollArea className="h-[75vh] w-[400px] rounded-xl">
        {goals.map((goal: GoalType) => (
          <Card
            className="mt-4 mr-4 hover:bg-accent hover:cursor-pointer"
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
              <div className="flex justify-center items-center gap-6 font-semibold">
                ${formatter.format(goal.currentAmount)}
                <Progress
                  value={(goal.currentAmount * 100) / goal.finalAmount}
                />
                ${formatter.format(goal.finalAmount)}
              </div>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
      <div className="flex flex-col justify-between flex-1">
        {goalId === selectedGoal._id && goalId !== undefined ? (
          <SingularGoalView />
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
