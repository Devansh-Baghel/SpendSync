import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function Feedback() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <Button
        // variant={""}
        className="h-10"
        onClick={() => setDrawerOpen(true)}
      >
        Give Feedback
      </Button>
      <DrawerContent className="">
        <DrawerHeader className="">
          <DrawerTitle className="w-[400px] mx-auto text-xl">
            Your feedback is valuable to us!
          </DrawerTitle>
          {/* <DrawerDescription className="w-[400px] mx-auto">
            This action cannot be undone.
          </DrawerDescription> */}
        </DrawerHeader>
        <div className="w-[400px] mx-auto mb-4">
          <Label>Rating</Label>
          <Select required>
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
            // onChange={(e) => {
            //   setDescription(e.target.value);
            // }}
          />
        </div>

        <DrawerFooter className="flex">
          <Button className="w-[400px] mx-auto">Submit</Button>
          <Button variant="outline" className="w-[400px] mx-auto">
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Feedback;
