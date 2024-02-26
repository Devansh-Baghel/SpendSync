import { useContext } from "react";
import { AppContext } from "@/App";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "@/components/DatePicker";
import SidebarPreferences from "@/components/SidebarPreferences";

const getAvatarFallback = (name: string) =>
  name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

function Account() {
  const { userData } = useContext(AppContext);

  return (
    <div className="bg-primary rounded-[25px] w-screen h-[92vh] py-8 px-12 flex flex-col">
      <h1 className="text-3xl font-bold text-background mb-5">Account</h1>
      <div className="flex flex-1 gap-6">
        <Card className="w-[350px] py-8 flex flex-col items-center gap-5">
          <Avatar className="w-32 h-32">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="text-3xl">
              {getAvatarFallback(userData.user.fullName)}
            </AvatarFallback>
          </Avatar>
          {!userData.user.avatar ? (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="avatar" className="tex-md">
                Upload Avatar
              </Label>
              <Input
                id="avatar"
                type="file"
                className="file:text-primary h-10 file:mt-1 cursor-pointer"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="avatar" className="text-md">
                Change Avatar
              </Label>
              <Input
                id="avatar"
                type="file"
                className="file:text-primary h-12 file:mt-2"
              />
            </div>
          )}

          <div className="w-[290px] flex flex-col gap-1.5">
            <Label htmlFor="fullName" className="txt-md">
              Full Name
            </Label>
            <Input type="text" id="fullName" placeholder="Jhon Doe" />
          </div>

          <div className="w-[290px] flex flex-col gap-1.5">
            <Label htmlFor="bio" className="txt-md">
              Bio
            </Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              className=""
            />
          </div>

          <Button className="mt-2 self-center w-[290px]">Save Changes</Button>
        </Card>
        <div className="flex-1 flex flex-col gap-6">
          <Card className="p-10">
            <DatePicker />
            <SidebarPreferences />
          </Card>
          <Card className="p-10 flex-1">
            <DatePicker />
            <SidebarPreferences />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Account;
