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
import { FormEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "@/App";
import { ToastAction } from "@radix-ui/react-toast";
import { useToast } from "@/components/ui/use-toast";
import DemoLoginButton from "@/components/DemoLoginButton";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, setIsLoggedIn, setUserData } = useContext(AppContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    axios
      .post("/users/login", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("userStatus", "loggedIn");
        setIsLoggedIn(true);
        localStorage.setItem("userData", JSON.stringify(response.data.data));
        setUserData(response.data.data);
        navigate("/");
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          toast({
            title: "User does not exist",
            description: "Did you mean to sign up?",
            action: (
              <ToastAction
                altText="register"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Sign up
              </ToastAction>
            ),
          });
        }

        if (error.response?.status === 401) {
          toast({ description: "Incorrect password" });
        }
      });
  }

  return (
    <form
      className="flex justify-center items-center h-screen mx-4"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Card className="max-w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <DemoLoginButton />
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
            <Label>Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Password</Label>
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
            Login
          </Button>
          <CardDescription>
            Don't have an account?{" "}
            <Link to={"/register"} className="text-accent-foreground underline">
              Sign up
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </form>
  );
}

export default Login;
