import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "./ui/button";
import AddNewGoal from "./AddNewGoal";

function GoalsDisplay() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    axios.get("/goals/get-goals").then((res) => {
      setGoals(res.data.data.goals);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="flex gap-6">
    <ScrollArea className="h-[75vh] w-[500px] rounded-xl">
      {goals.map((goal) => (
        <Card className="mt-4" key={goal._id}>
          <CardHeader>
            <CardTitle className="text-lg">{goal.title}</CardTitle>
            <div><Badge className="text-xs">{goal.category}</Badge></div>
          </CardHeader>
          <CardContent>
            {/* <p>Current Amount: ${goal.currentAmount}</p> */}
            {/* <p>Final Amount: ${goal.finalAmount}</p> */}
            <div className="flex justify-center items-center gap-6 font-semibold">
              $728
              <Progress value={56} />
              $1300
            </div>
          </CardContent>
          {/* <CardFooter> */}
          {/*   <p></p> */}
          {/* </CardFooter> */}
        </Card>
      ))}
    </ScrollArea>

    <div className="flex flex-col justify-end">
        <Card className="h-24 w-96 mb-2 flex items-center justify-center gap-6">
          <AddNewGoal />
          <Button className="font-bold">Add Money to a Goal</Button>
        </Card>
    </div>
    </div>
  );
}

export default GoalsDisplay;
