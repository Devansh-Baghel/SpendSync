import { useState } from "react";
import { Link } from "react-router-dom";
import { LuLayoutDashboard as OverviewIcon } from "react-icons/lu";
import { GrTransaction as TransactionsIcon } from "react-icons/gr";
import { FaMoneyBillTransfer as HomeIcon } from "react-icons/fa6";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";
import { VscGraph as StatsIcon } from "react-icons/vsc";
import { TbTargetArrow as GoalsIcon } from "react-icons/tb";
import { PiCrown as ProIcon } from "react-icons/pi";
import { IoPerson as AccountIcon } from "react-icons/io5";
import { IoIosMenu as MenuIcon } from "react-icons/io";
import { IoClose as CloseIcon } from "react-icons/io5";
import { FaCodeBranch as CodeIcon } from "react-icons/fa6";
import LogoutButton from "./LogoutButton";
import { useContext } from "react";
import { AppContext } from "@/App";

function HamburgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { showGoals, showTransactions, userData } = useContext(AppContext);

  if (menuOpen) {
    return (
      <div className="text-xl bg-main_yellow gap-8 flex flex-col md:hidden">
        <Link to={"/"} className="flex items-center gap-2 mt-1 ml-6">
          <HomeIcon className="w-12 h-12 text-primary" />
          <h2 className="text-xl font-bold">
            SpendSync
            {userData.user.isPaidUser && (
              <div className="flex gap-2 items-center text-yellow-300">
                <ProIcon className="w-6 h-6" />
                <span className="text-sm font-semibold">Premium</span>
              </div>
            )}
          </h2>
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
              to={"/statistics"}
              className="flex items-center gap-6"
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              <StatsIcon className="w-6 h-6" />
              <h2 className="text-md">Statistics</h2>
            </Link>

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
              className="flex items-center gap-6"
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              <SettingsIcon className="w-6 h-6" />
              <h2 className="text-md">Settings</h2>
            </Link>

            <a
              href="https://github.com/Devansh-Baghel/SpendSync"
              target="_blank"
              className="flex items-center gap-6 hover:text-primary mb-10"
            >
              <CodeIcon className="w-6 h-6" />
              <h2 className="text-md">Source Code</h2>
            </a>
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
          <h2 className="text-xl font-bold">
            SpendSync
            {userData.user.isPaidUser && (
              <div className="flex gap-2 items-center text-yellow-300">
                <ProIcon className="w-6 h-6" />
                <span className="text-sm font-semibold">Premium</span>
              </div>
            )}
          </h2>
        </Link>
        <button
          className="absolute top-8 right-4"
          onClick={() => {
            setMenuOpen(true);
            window.scrollTo(0, 0);
          }}
        >
          <MenuIcon className="w-12 h-12 text-primary" />
        </button>
      </div>
    );
  }
}

export default HamburgerMenu;
