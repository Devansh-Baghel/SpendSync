import { FormEvent, useContext, useState } from "react";
import { AppContext } from "@/App";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import DatePicker from "@/components/DatePicker";
import SidebarPreferences from "@/components/SidebarPreferences";
import MoreAccountOptions from "@/components/MoreAccountOptions";
import axios from "axios";
import useTitle from "@/hooks/useTitle";

const getAvatarFallback = (name: string) =>
  name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

function Account() {
  useTitle("Account");
  const { userData, setUserData } = useContext(AppContext);
  const [name, setName] = useState<string>(userData.user.fullName);
  const [bio, setBio] = useState<string>(userData.user.bio || undefined);
  const [avatar, setAvatar] = useState(userData.user.avatar);

  function updateUserDetails() {
    if (name === userData.user.fullName && bio === userData.user.bio) {
      if (avatar !== userData.user.avatar) return;
      toast.error("Nothing changed", {
        id: "nothing-changed",
        icon: "📌",
      });
      return;
    }

    const toastPromise = axios
      .post("/users/update-details", { name, bio })
      .then((res) => {
        localStorage.setItem("userData", JSON.stringify(res.data.data));
        setUserData(res.data.data);
      });

    toast.promise(toastPromise, {
      loading: "Saving user details",
      success: "Saved user details",
      error: "Error when fetching",
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name) {
      toast.error("Full name is required");
      return;
    }

    if (avatar !== userData.user.avatar) {
      if (!["image/jpeg", "image/png"].includes(avatar?.type)) {
        toast.error("Only jpeg and png files are allowed");
        return;
      }

      const formData = new FormData();
      formData.append("avatar", avatar);

      const toastPromise = axios
        .post("/users/upload-avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          localStorage.setItem("userData", JSON.stringify(res.data.data));
          setUserData(res.data.data);
          setAvatar(userData.user.avatar);
        });

      toast.promise(
        toastPromise,
        {
          loading: "Saving Avatar",
          success: "Saved Avatar",
          error: "Eror when fetching",
        },
        {
          id: "saving-avatar",
        }
      );

      updateUserDetails();
      return;
    }
    updateUserDetails();
  }

  return (
    <div className="bg-primary rounded-[25px] md:w-screen py-5 px-5 sm:px-8 mt-[-100px] md:mt-0">
      <h1 className="text-3xl font-bold text-background mb-5">Account</h1>
      <div className="flex flex-1 gap-6 md:flex-row flex-col">
        <Card className="md:max-w-[350px] px-5 md:px-0 flex flex-col items-center">
          <form
            className="max-w-[350px] md:w-[350px] py-8 flex flex-col items-center gap-5"
            onSubmit={handleSubmit}
          >
            <Avatar className="w-32 h-32">
              <a href={userData.user.avatar} target="_blank">
                <AvatarImage src={userData.user.avatar} />
              </a>
              <AvatarFallback className="text-3xl">
                {getAvatarFallback(userData.user.fullName)}
              </AvatarFallback>
            </Avatar>
            {!userData.user.avatar ? (
              <div className="flex flex-col gap-1.5 w-full md:w-[290px]">
                <Label htmlFor="avatar" className="tex-md">
                  Upload Avatar
                </Label>
                <Input
                  id="avatar"
                  type="file"
                  name="avatar"
                  className="file:text-primary h-10 file:mt-1 cursor-pointer"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    if (!e.target.files) return;
                    setAvatar(e.target.files[0]);
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-1.5 w-full md:w-[290px]">
                <Label htmlFor="avatar" className="text-md">
                  Change Avatar
                </Label>
                <Input
                  id="avatar"
                  type="file"
                  name="avatar"
                  className="file:text-primary h-12 file:mt-2"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    if (!e.target.files) return;
                    setAvatar(e.target.files[0]);
                  }}
                />
              </div>
            )}

            <div className="w-full md:w-[290px] flex flex-col gap-1.5">
              <Label htmlFor="fullName" className="txt-md">
                Full Name
              </Label>
              <Input
                type="text"
                id="fullName"
                placeholder="Jhon Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={30}
              />
            </div>

            <div className="w-full md:w-[290px] flex flex-col gap-1.5">
              <Label htmlFor="bio" className="txt-md">
                Bio
              </Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                className=""
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={80}
              />
            </div>

            <Button
              className="mt-2 self-center w-full md:w-[290px]"
              type="submit"
            >
              Save Changes
            </Button>
          </form>
        </Card>
        <div className="flex-1 flex flex-col gap-6">
          <Card className="sm:p-10 py-6 px-5">
            <DatePicker />
            <SidebarPreferences />
          </Card>
          <MoreAccountOptions />
        </div>
      </div>
    </div>
  );
}

export default Account;
