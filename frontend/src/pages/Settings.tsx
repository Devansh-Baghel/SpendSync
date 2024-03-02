import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import UpdatePassword from "@/components/UpdatePassword";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Settings() {
  return (
    <div className="bg-primary rounded-[25px] w-screen h-[92vh] py-8 px-12">
      <h1 className="text-3xl font-bold text-background mb-5">Settings</h1>

      <div className="flex flex-col gap-6">
        <UpdatePassword />
        <Card className="max-w-[350px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Change Currency</CardTitle>
          </CardHeader>
          <CardFooter className="flex gap-4">
            <Select>
              <SelectTrigger className="h-9 data-[placeholder]:text-muted-foreground">
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="U. S. Doller">$ USD</SelectItem>
                <SelectItem value="Euro">€ EUR</SelectItem>
                <SelectItem value="Japanese Yen">¥ JPY</SelectItem>
                <SelectItem value="Indian Rupee">₹ INR</SelectItem>
                <SelectItem value="Australian Dollar">A$ AUD</SelectItem>
                <SelectItem value="Canadian Dollar">C$ CAD</SelectItem>
              </SelectContent>
            </Select>

            <Button className="" type="submit">
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Settings;
