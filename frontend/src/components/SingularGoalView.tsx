import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import UpdateGoal from "./UpdateGoal";
import { useContext } from "react";
import { AppContext } from "@/App";
import AddMoneyToGoal from "./AddMoneyToGoal";

const formatter = new Intl.NumberFormat("en-US");

function SingularGoalView() {
  const { selectedGoal } = useContext(AppContext);

  return (
    <Card className="flex-1 mb-6 mt-3 flex flex-col relative">
      <CardHeader>
        <CardTitle className="text-lg">{selectedGoal.title}</CardTitle>
        <div>
          <Badge>{selectedGoal.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-center mb-2">
          You have saved{" "}
          <span className="font-bold text-primary">
            {(
              (selectedGoal.currentAmount * 100) /
              selectedGoal.finalAmount
            ).toFixed(1)}
            %
          </span>{" "}
          of your goal, keep going!
        </h3>
        <div className="flex justify-center items-center gap-6 font-semibold mb-4">
          ${formatter.format(selectedGoal.currentAmount)}
          <Progress
            value={
              (selectedGoal.currentAmount * 100) / selectedGoal.finalAmount
            }
          />
          ${formatter.format(selectedGoal.finalAmount)}
        </div>
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-bold text-primary">Final Target: </span>$
            {formatter.format(selectedGoal.finalAmount)}
          </p>
          <p>
            <span className="font-bold text-primary">
              Current Saved Amount:{" "}
            </span>
            ${formatter.format(selectedGoal.currentAmount)}
          </p>
          <p>
            <span className="font-bold text-primary">Date of Completion: </span>
            {selectedGoal?.date === undefined ? (
              <span>Not Set</span>
            ) : (
              selectedGoal.date
            )}
          </p>
          <p>
            <span className="font-bold text-primary">Description: </span>
            {selectedGoal.description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4 justify-self-end self-end absolute bottom-0">
        <UpdateGoal />
        <AddMoneyToGoal />
      </CardFooter>
    </Card>
  );
}

export default SingularGoalView;
