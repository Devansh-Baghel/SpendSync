import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
// import { Icons } from "@/components/icons"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (name.trim() === "") return;
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    axios.post("/users/register", {
      email,
      password,
      fullName: name,
      currentBalance: 123,
    });

    navigate("/login");
  }

  return (
    <form
      className="flex justify-center items-center h-screen"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* <div className="grid grid-cols-2 gap-6"> */}
          {/*   <Button variant="outline"> */}
          {/*     <Icons.gitHub className="mr-2 h-4 w-4" /> */}
          {/*     Github */}
          {/*   </Button> */}
          {/*   <Button variant="outline"> */}
          {/*     <Icons.google className="mr-2 h-4 w-4" /> */}
          {/*     Google */}
          {/*   </Button> */}
          {/* </div> */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            {/* @ts-ignore */}
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Your Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            {/* @ts-ignore */}
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            {/* @ts-ignore */}
            <Label htmlFor="password">Password</Label>
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
            Create account
          </Button>
          <CardDescription>
            Already have an account?{" "}
            <Link to={"/login"} className="text-accent-foreground underline">
              Sign in
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </form>
  );
}

export default Register;
