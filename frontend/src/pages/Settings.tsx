import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
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
        <Card className="max-w-[350px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Update Password</CardTitle>
            <CardDescription>
              Enter your old password and create a new password to update.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="old-password">Old Password</Label>
              <Input
                id="old-password"
                type="password"
                required
                // onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                required
                // onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit">
              Update Password
            </Button>
          </CardFooter>
        </Card>

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
