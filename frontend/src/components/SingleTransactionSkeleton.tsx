import { Button } from "./ui/button";
import { FaPlus as PlusIcon } from "react-icons/fa";
import { FaArrowLeft as LeftArrow } from "react-icons/fa6";
import { IoReceipt as ReceiptIcon } from "react-icons/io5";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";

function SingleTransactionSkeleton() {
  const navigate = useNavigate();

  return (
    <div className="bg-primary rounded-[25px] md:w-screen py-6 px-5 sm:px-8 mt-[-100px] md:mt-0 relative flex flex-col">
      <Link
        to={"/transactions"}
        className="text-3xl font-bold text-background mb-5"
      >
        <LeftArrow className="inline mb-1" /> Back{" "}
      </Link>

      <div className="flex flex-col gap-6 md:flex-row flex-1">
        <Card className="relative border-0 flex-1">
          <CardHeader>
            <Skeleton className="w-40 h-6" />
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full md:h-80 h-40" />
          </CardContent>
        </Card>

        <Card className="h-52 md:w-[25vw] xl:w-[350px] md:h-full flex justify-center items-center flex-col gap-2">
          <ReceiptIcon className="w-14 h-14 text-primary" />
          <p className="text-primary font-bold">No receipt</p>
        </Card>
      </div>

      <Button
        className="font-bold h-14 text-md md:w-72 flex gap-2 w-full mt-6"
        variant={"outline"}
        onClick={() => navigate("/create-transaction")}
      >
        <PlusIcon className="w-5 h-5" />
        New Transaction
      </Button>
    </div>
  );
}

export default SingleTransactionSkeleton;
