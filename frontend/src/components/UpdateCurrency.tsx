import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FormEvent, useContext, useState } from "react";
import { AppContext } from "@/App";

function UpdateCurrency() {
  const [currency, setCurrency] = useState<string>();
  const { userData, setUserData } = useContext(AppContext);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!currency) {
      toast.error("Currency is required");
      return;
    }

    if (currency === userData.user?.currency) {
      toast.error("Nothing changed", {
        id: "nothing-changed",
        icon: "📌",
      });
      return;
    }

    const toastPromise = axios
      .post("/users/update-currency", { newCurrency: currency })
      .then((res) => {
        localStorage.setItem("userData", JSON.stringify(res.data.data));
        setUserData(res.data.data);
      });

    toast.promise(toastPromise, {
      loading: "Saving",
      success: "Saved",
      error: "Error when fetching",
    });
  }
  return (
    <Card className="max-w-[350px]">
      <form onSubmit={handleSubmit}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Change Currency</CardTitle>
        </CardHeader>
        <CardFooter className="flex gap-4 flex-col sm:flex-row">
          <Select onValueChange={(item) => setCurrency(item)}>
            <SelectTrigger className="h-9 data-[placeholder]:text-muted-foreground">
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="$">$ USD</SelectItem>
              <SelectItem value="€">€ EUR</SelectItem>
              <SelectItem value="¥">¥ JPY</SelectItem>
              <SelectItem value="₹">₹ INR</SelectItem>
              <SelectItem value="A$">A$ AUD</SelectItem>
              <SelectItem value="C$">C$ CAD</SelectItem>
            </SelectContent>
          </Select>

          <Button className="w-full sm:w-32" type="submit">
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default UpdateCurrency;
