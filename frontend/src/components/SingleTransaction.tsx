import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { FaPlus as PlusIcon } from "react-icons/fa";
import { FaArrowLeft as LeftArrow } from "react-icons/fa6";
import { TbError404 as NotFoundIcon } from "react-icons/tb";
import { IoReceipt as ReceiptIcon } from "react-icons/io5";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatter } from "@/utils/formatter";
import { AppContext } from "@/App";
import { useQuery } from "@tanstack/react-query";

function SingleTransaction() {
  const { transactionId } = useParams();
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  const { data, isPending, error } = useQuery({
    queryKey: [transactionId],
    queryFn: async () => {
      return axios
        .post("/transaction/get-transaction", { transactionId })
        .then((res) => res.data.data.transaction);
    },
  });

  if (isPending) return "Pending";
  if (error) return "Error";

  return (
    <div className="bg-primary rounded-[25px] md:w-screen py-6 px-5 sm:px-8 mt-[-100px] md:mt-0 relative flex flex-col">
      <Link
        to={"/transactions"}
        className="text-3xl font-bold text-background mb-5"
      >
        <LeftArrow className="inline mb-1" /> Back{" "}
      </Link>

      <div className="flex flex-col gap-6 md:flex-row flex-1">
        <Card className="mt-4 relative border-0 flex-1">
          <CardHeader>
            <CardTitle className="text-xl mt-1">{data?.title}</CardTitle>
            <CardDescription>
              {new Date(data?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data?.type === "Expense" ? (
              <div
                className="bg-red-500 text-stone-900 font-bold px-4 text-center absolute top-[-16px] left-0 w-full"
                style={{ borderRadius: "20px 20px 0 0" }}
              >
                <p>{data?.type}</p>
              </div>
            ) : (
              <div
                className="bg-green-600 text-stone-800 font-bold px-4 text-center absolute top-[-16px] left-0 w-full"
                style={{ borderRadius: "20px 20px 0 0" }}
              >
                <p>{data?.type}</p>
              </div>
            )}

            <Badge>Wallet: {data?.wallet}</Badge>
            <br />
            {data?.category ? (
              <Badge>Category: {data?.category}</Badge>
            ) : (
              <span></span>
            )}
            <Badge className="block w-40 h-10 text-xl text-center pt-1 mt-4">
              {data?.type === "Expense" ? (
                <span className="">&minus; </span>
              ) : (
                <span className="">+ </span>
              )}
              {userData.user.currency}
              {formatter.format(data?.amount)}
            </Badge>
          </CardContent>
          <CardFooter>{/* Delete goal button will go here */}</CardFooter>
        </Card>

        {data?.receipt ? (
          <Card className="h-52 xl:w-[350px] md:h-full p-2">
            <a href={data.receipt} target="_blank">
              <img
                src={data.receipt}
                alt=""
                className="h-full rounded-[20px]"
              />
            </a>
          </Card>
        ) : (
          <Card className="h-52 xl:w-[350px] md:h-full flex justify-center items-center flex-col gap-2">
            <ReceiptIcon className="w-14 h-14 text-primary" />
            <p className="text-primary font-bold">No receipt</p>
          </Card>
        )}
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

export default SingleTransaction;
