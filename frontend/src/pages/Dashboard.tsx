import LogoutButton from "@/components/LogoutButton";
import { Outlet } from "react-router-dom";
import { LuLayoutDashboard as OverviewIcon } from "react-icons/lu";
import { GrTransaction as TransactionsIcon } from "react-icons/gr";
import { FaMoneyBillTransfer as HomeIcon } from "react-icons/fa6";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";
import { VscGraph as StatsIcon } from "react-icons/vsc";
import { PiCrown as ProIcon } from "react-icons/pi";
import { TbTargetArrow as GoalsIcon } from "react-icons/tb";
import { IoPerson as AccountIcon } from "react-icons/io5";
import { FaCodeBranch as CodeIcon } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "@/App";
import HamburgerMenu from "@/components/HamburgerMenu";
import Command from "@/components/Command";

function Dashboard() {
  const { showGoals, showTransactions, userData } = useContext(AppContext);

  return (
    <Command>
      <div className="m-5 mt-7 flex flex-col md:flex-row gap-32">
        <HamburgerMenu />
        <aside className="text-accent-foreground md:flex flex-col pl-10 w-52 justify-between h-[90vh] hidden">
          <div className="flex flex-col gap-7">
            <Link to={"/"} className="flex items-center gap-2 mt-5 mb-5">
              <HomeIcon className="w-14 h-14 text-primary" />
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

            <Link
              to={"/"}
              className="flex items-center gap-6 hover:text-primary"
            >
              <OverviewIcon className="w-6 h-6" />
              <h2 className="text-md">Overview</h2>
            </Link>

            {showTransactions ? (
              <Link
                to={"/transactions"}
                className="flex items-center gap-6 hover:text-primary"
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
                className="flex items-center gap-6 hover:text-primary"
              >
                <GoalsIcon className="w-6 h-6" />
                <h2 className="text-md">Goals</h2>
              </Link>
            ) : (
              ""
            )}

            <Link
              to={"/statistics"}
              className="flex items-center gap-6 hover:text-primary"
            >
              <StatsIcon className="w-6 h-6" />
              <h2 className="text-md">Statistics</h2>
            </Link>

            <Link
              to={"/account"}
              className="flex items-center gap-6 hover:text-primary"
            >
              <AccountIcon className="w-6 h-6" />
              <h2 className="text-md">Account</h2>
            </Link>

            <Link
              to={"/settings"}
              className="flex items-center gap-6 hover:text-primary"
            >
              <SettingsIcon className="w-6 h-6" />
              <h2 className="text-md">Settings</h2>
            </Link>
            <a
              href="https://github.com/Devansh-Baghel/SpendSync"
              target="_blank"
              className="flex items-center gap-6 hover:text-primary"
            >
              <CodeIcon className="w-6 h-6" />
              <h2 className="text-md">Source Code</h2>
            </a>
          </div>
          <LogoutButton />
        </aside>
        <Outlet />
      </div>
    </Command>
  );
}

export default Dashboard;
