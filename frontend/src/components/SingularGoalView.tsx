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
        <div className="flex justify-center items-center gap-6 font-semibold mb-4">
          $728
          <Progress value={56} />
          $1300
        </div>
        <p>{goalData.description}</p>
      </CardContent>
      <CardFooter className="flex gap-4 justify-self-end self-end absolute bottom-0">
        <Button variant={"outline"}>Update This Goal</Button>
        <Button>Add Money to This Goal</Button>
      </CardFooter>
    </Card>
  );
}

export default SingularGoalView;
