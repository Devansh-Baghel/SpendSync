import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "react-hot-toast";

function Feedback() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [rating, setRating] = useState<string>();
  const [description, setDescription] = useState<string>();

  async function submitFeedback(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!rating) return;

    await axios
      .post("/feedback/create-feedback", { rating, description })
      .then(() => {
        setDrawerOpen(false);
        toast.success("Thank you for your feedback!");
      })
      .catch(() => {
        setDrawerOpen(false);
        toast.error("Something went wrong");
      });
  }

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <Button className="h-10" onClick={() => setDrawerOpen(true)}>
        Give Feedback
      </Button>
      <DrawerContent className="">
        <form onSubmit={(e) => submitFeedback(e)}>
          <DrawerHeader className="">
            <DrawerTitle className="w-[400px] mx-auto text-xl">
              Your feedback is valuable to us!
            </DrawerTitle>
          </DrawerHeader>
          <div className="w-[400px] mx-auto mb-4">
            <Label>Rating</Label>
            <Select required onValueChange={(value) => setRating(value)}>
              <SelectTrigger className="h-9 data-[placeholder]:text-muted-foreground">
                <SelectValue placeholder="Your Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-star">⭐</SelectItem>
                <SelectItem value="2-star">⭐⭐</SelectItem>
                <SelectItem value="3-star">⭐⭐⭐</SelectItem>
                <SelectItem value="4-star">⭐⭐⭐⭐</SelectItem>
                <SelectItem value="5-star">⭐⭐⭐⭐⭐</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-[400px] mx-auto mb-6">
            <Label htmlFor="feedback" className="">
              Feedback
            </Label>
            <Textarea
              id="feedback"
              placeholder="Optional description here"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          <DrawerFooter className="flex">
            <Button className="w-[400px] mx-auto" type="submit">
              Submit
            </Button>
            <Button
              variant="outline"
              type="button"
              className="w-[400px] mx-auto"
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              Cancel
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

export default Feedback;
