import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import UpdateGoal from "./UpdateGoal";
import { useContext } from "react";
import { AppContext } from "@/App";
import AddMoneyToGoal from "./AddMoneyToGoal";
import { MdDeleteForever as DeleteIcon } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const formatter = new Intl.NumberFormat("en-US");

type PropTypes = {
  setIsSelected?: React.Dispatch<React.SetStateAction<boolean>>;
};

function SingularGoalView({ setIsSelected }: PropTypes) {
  const { userData, selectedGoal, setUserData, setSelectedGoal } =
    useContext(AppContext);

  async function deleteGoal() {
    if (!selectedGoal) return;

    await axios
      .post("/goals/delete-goal", {
        goalId: selectedGoal._id,
        goalCurrentAmount: selectedGoal.currentAmount,
      })
      .then((res) => {
        setUserData(res.data.data);
        localStorage.setItem("userData", JSON.stringify(res.data.data));
        setSelectedGoal({});
        if (!setIsSelected) return;
        setIsSelected(false);
      });
  }

  return (
    <Card className="flex-1 mb-6 sm:mt-3 flex flex-col relative">
      <CardHeader>
        <CardTitle className="text-lg flex justify-between">
          {selectedGoal.title}
          <AlertDialog>
            <AlertDialogTrigger>
              <DeleteIcon className="w-8 h-8 text-destructive cursor-pointer" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your goal, and all it's money will be added to your account
                  balance.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteGoal}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardTitle>
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
        <div className="flex justify-center items-center gap-2 sm:gap-6 font-semibold mb-4">
          {userData.user.currency}
          {formatter.format(selectedGoal.currentAmount)}
          <Progress
            value={
              (selectedGoal.currentAmount * 100) / selectedGoal.finalAmount
            }
          />
          {userData.user.currency}
          {formatter.format(selectedGoal.finalAmount)}
        </div>
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-bold text-primary">Final Target: </span>
            {userData.user.currency}
            {formatter.format(selectedGoal.finalAmount)}
          </p>
          <p>
            <span className="font-bold text-primary">
              Current Saved Amount:{" "}
            </span>
            {userData.user.currency}
            {formatter.format(selectedGoal.currentAmount)}
          </p>
          <p>
            <span className="font-bold text-primary">Date of Completion: </span>
            {!selectedGoal.date ? <span>Not Set</span> : selectedGoal.date}
          </p>
          <p>
            <span className="font-bold text-primary">Description: </span>
            {!selectedGoal.description ? (
              <span>Not Set</span>
            ) : (
              selectedGoal.description
            )}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4 md:justify-self-end md:self-end bottom-0 flex-col md:flex-row items-start md:items-end h-full">
        <UpdateGoal />
        <AddMoneyToGoal />
      </CardFooter>
    </Card>
  );
}

export default SingularGoalView;
