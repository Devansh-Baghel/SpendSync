import { useState, useEffect } from "react";
import { LuLayoutDashboard as OverviewIcon } from "react-icons/lu";
import { GrTransaction as TransactionsIcon } from "react-icons/gr";
// import { FaMoneyBillTransfer as HomeIcon } from "react-icons/fa6";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";
import { TbTargetArrow as GoalsIcon } from "react-icons/tb";
import { IoPerson as AccountIcon } from "react-icons/io5";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  // CommandSeparator,
  // CommandShortcut,
} from "@/components/ui/command";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Command({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  function handleSelect(page: string) {
    navigate(page);
    setOpen(false);
  }

  return (
    <>
      {children}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => handleSelect("/")}>
              <OverviewIcon className="mr-2 h-4 w-4" />
              <span>Overview</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("/transactions")}>
              <TransactionsIcon className="mr-2 h-4 w-4" />
              <span>Transactions</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("/goals")}>
              <GoalsIcon className="mr-2 h-4 w-4" />
              <span>Goals</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("/account")}>
              <AccountIcon className="mr-2 h-4 w-4" />
              <span>Account</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("/settings")}>
              <SettingsIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
          {/* <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <PersonIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
              <span>Mail</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <GearIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup> */}
        </CommandList>
      </CommandDialog>
    </>
  );
}
