import { useContext, useState } from "react";
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

const getAvatarFallback = (name: string) =>
  name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

function Account() {
  const { userData, setUserData } = useContext(AppContext);
  const [name, setName] = useState(userData.user.fullName);
  const [bio, setBio] = useState(userData.user.bio || undefined);
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

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      toast.error("Full name is required");
      return;
    }

    if (avatar !== userData.user.avatar) {
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
          error: "Nothing changed",
        },
        {
          id: "saving-avatar",
          error: {
            icon: "📌",
          },
        }
      );

      updateUserDetails();
      return;
    }
    updateUserDetails();
  }

  return (
    <div className="bg-primary rounded-[25px] w-screen h-[92vh] py-8 px-12 flex flex-col">
      <h1 className="text-3xl font-bold text-background mb-5">Account</h1>
      <div className="flex flex-1 gap-6">
        <Card className="">
          <form
            className="w-[350px] py-8 flex flex-col items-center gap-5"
            onSubmit={handleSubmit}
          >
            <Avatar className="w-32 h-32">
              <AvatarImage src={userData.user.avatar} />
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
                  name="avatar"
                  className="file:text-primary h-10 file:mt-1 cursor-pointer"
                  onChange={(e) => setAvatar(e.target.files[0])}
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
                  name="avatar"
                  className="file:text-primary h-12 file:mt-2"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
              </div>
            )}

            <div className="w-[290px] flex flex-col gap-1.5">
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

            <div className="w-[290px] flex flex-col gap-1.5">
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

            <Button className="mt-2 self-center w-[290px]" type="submit">
              Save Changes
            </Button>
          </form>
        </Card>
        <div className="flex-1 flex flex-col gap-6">
          <Card className="p-10">
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
