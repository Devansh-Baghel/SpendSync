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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "./ui/button";

const formatter = new Intl.NumberFormat("en-US");

function SingularGoalView({ goalData }) {
  return (
    <Card className="flex-1 mb-6 mt-3 flex flex-col relative">
      <CardHeader>
        <CardTitle className="text-lg">{goalData.title}</CardTitle>
        <div>
          <Badge>{goalData.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-center mb-2">You have saved <span className="font-bold text-primary">{((goalData.currentAmount*100)/goalData.finalAmount).toFixed(1)}%</span> of your goal, keep going!</h3>
        <div className="flex justify-center items-center gap-6 font-semibold mb-4">
          $728
          <Progress value={56} />
          $1300
        </div>
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-bold text-primary">Final Target: </span>$
            {formatter.format(goalData.finalAmount)}
          </p>
          <p>
            <span className="font-bold text-primary">
              Current Saved Amount:{" "}
            </span>
            ${formatter.format(goalData.currentAmount)}
          </p>
          <p>
            <span className="font-bold text-primary">Date of Completion: </span>
            {goalData?.date === undefined ? (
              <span>Not Set</span>
            ) : (
              goalData.date
            )}
          </p>
          <p>
            <span className="font-bold text-primary">Description: </span>
            {goalData.description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4 justify-self-end self-end absolute bottom-0">
        <Button variant={"outline"}>Update This Goal</Button>
        <Button>Add Money to This Goal</Button>
      </CardFooter>
    </Card>
  );
}

export default SingularGoalView;
