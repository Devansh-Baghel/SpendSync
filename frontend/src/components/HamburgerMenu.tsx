import { useState } from "react";
import { Link } from "react-router-dom";
import { LuLayoutDashboard as OverviewIcon } from "react-icons/lu";
import { GrTransaction as TransactionsIcon } from "react-icons/gr";
import { FaMoneyBillTransfer as HomeIcon } from "react-icons/fa6";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";
import { TbTargetArrow as GoalsIcon } from "react-icons/tb";
import { IoPerson as AccountIcon } from "react-icons/io5";
import { IoIosMenu as MenuIcon } from "react-icons/io";
import { IoClose as CloseIcon } from "react-icons/io5";
import LogoutButton from "./LogoutButton";
import { useContext } from "react";
import { AppContext } from "@/App";

function HamburgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { showGoals, showTransactions } = useContext(AppContext);

  if (menuOpen) {
    return (
      <div className="text-xl bg-main_yellow gap-8 flex flex-col md:hidden">
        <Link to={"/"} className="flex items-center gap-2 mt-1 ml-6">
          <HomeIcon className="w-12 h-12 text-primary" />
          <h2 className="text-xl font-bold">SpendSync</h2>
        </Link>
        <button
          className="absolute top-8 right-4"
          onClick={() => {
            setMenuOpen(false);
          }}
        >
          <CloseIcon className="w-12 h-12 text-primary" />
        </button>
        <nav className="text-accent-foreground flex flex-col pl-6 w-52 justify-between">
          <div className="flex flex-col gap-8">
            <Link
              to={"/"}
              className="flex items-center gap-6"
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              <OverviewIcon className="w-6 h-6" />
              <h2 className="text-md">Overview</h2>
            </Link>

            {showTransactions ? (
              <Link
                to={"/transactions"}
                className="flex items-center gap-6"
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                <TransactionsIcon className="w-6 h-6" />
                <h2 className="text-md">Transactions</h2>
              </Link>
            ) : (
              ""
            )}

            {showGoals ? (
              <Link
                to={"/goals"}
                className="flex items-center gap-6"
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                <GoalsIcon className="w-6 h-6" />
                <h2 className="text-md">Goals</h2>
              </Link>
            ) : (
              ""
            )}

            <Link
              to={"/account"}
              className="flex items-center gap-6"
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              <AccountIcon className="w-6 h-6" />
              <h2 className="text-md">Account</h2>
            </Link>

            <Link
              to={"/settings"}
              className="flex items-center gap-6 mb-10"
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              <SettingsIcon className="w-6 h-6" />
              <h2 className="text-md">Settings</h2>
            </Link>
          </div>
          <LogoutButton />
        </nav>
      </div>
    );
  } else {
    return (
      <div className="md:hidden">
        <Link to={"/"} className="flex items-center gap-2 mt-1 ml-6">
          <HomeIcon className="w-12 h-12 text-primary" />
          <h2 className="text-xl font-bold">SpendSync</h2>
        </Link>
        <button
          className="absolute top-8 right-4"
          onClick={() => {
            setMenuOpen(true);
          }}
        >
          <MenuIcon className="w-12 h-12 text-primary" />
        </button>
      </div>
    );
  }
}

export default HamburgerMenu;
