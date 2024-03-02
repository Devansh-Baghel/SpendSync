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
import { toast } from "react-hot-toast";
import { FormEvent, useState } from "react";
import axios from "axios";

function UpdatePassword() {
  const [oldPassword, setOldPasword] = useState<string>();
  const [password, setPassword] = useState<string>();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!password || !oldPassword) {
      toast.error("Password can't be empty");
      return;
    }

    if (password === oldPassword) {
      toast.error("New password can't be the same as your old password");
      return;
    }

    const toastPromise = axios.post("/users/update-password", {
      oldPassword,
      newPassword: password,
    });

    toast.promise(toastPromise, {
      loading: "Updating password",
      success: "Updated password",
      error: "Invalid old password",
    });
  }

  return (
    <Card className="max-w-[350px]">
      <form onSubmit={handleSubmit}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Update Password</CardTitle>
          <CardDescription>
            Enter your old password and create a new password to update.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label>Old Password</Label>
            <Input
              id="old-password"
              type="password"
              required
              onChange={(e) => setOldPasword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>New Password</Label>
            <Input
              id="password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" type="submit">
            Update Password
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default UpdatePassword;
