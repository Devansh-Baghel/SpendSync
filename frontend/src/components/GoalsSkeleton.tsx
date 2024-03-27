import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";
import { useContext } from "react";
import { AppContext } from "@/App";

function GoalsSkeleton() {
  const { userData } = useContext(AppContext);
  return (
    <div className="h-[75vh] sm:w-[400px]">
      {userData.user.goals.map((goalId: string) => (
        <Card
          className="mt-4 sm:mr-4 hover:bg-accent hover:cursor-pointer"
          key={goalId}
        >
          <CardHeader>
            <CardTitle className="text-lg">
              <Skeleton className="h-6 max-w-44" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-14" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default GoalsSkeleton;
