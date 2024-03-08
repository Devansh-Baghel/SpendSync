import LogoutButton from "@/components/LogoutButton";
import { Outlet } from "react-router-dom";
import { LuLayoutDashboard as OverviewIcon } from "react-icons/lu";
import { GrTransaction as TransactionsIcon } from "react-icons/gr";
import { FaMoneyBillTransfer as HomeIcon } from "react-icons/fa6";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";
import { TbTargetArrow as GoalsIcon } from "react-icons/tb";
import { IoPerson as AccountIcon } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "@/App";
import HamburgerMenu from "@/components/HamburgerMenu";

function Dashboard() {
  const { showGoals, showTransactions } = useContext(AppContext);

  return (
    <div className="m-5 mt-7 flex flex-col md:flex-row gap-32">
      <HamburgerMenu />
      <aside className="text-accent-foreground md:flex flex-col pl-10 w-52 justify-between h-[90vh] hidden">
        <div className="flex flex-col gap-8">
          <Link to={"/"} className="flex items-center gap-2 mt-5 mb-10">
            <HomeIcon className="w-12 h-12 text-primary" />
            <h2 className="text-xl font-bold">SpendSync</h2>
          </Link>

          <Link to={"/"} className="flex items-center gap-6">
            <OverviewIcon className="w-6 h-6" />
            <h2 className="text-md">Overview</h2>
          </Link>

          {showTransactions ? (
            <Link to={"/transactions"} className="flex items-center gap-6">
              <TransactionsIcon className="w-6 h-6" />
              <h2 className="text-md">Transactions</h2>
            </Link>
          ) : (
            ""
          )}

          {showGoals ? (
            <Link to={"/goals"} className="flex items-center gap-6">
              <GoalsIcon className="w-6 h-6" />
              <h2 className="text-md">Goals</h2>
            </Link>
          ) : (
            ""
          )}

          <Link to={"/account"} className="flex items-center gap-6">
            <AccountIcon className="w-6 h-6" />
            <h2 className="text-md">Account</h2>
          </Link>

          <Link to={"/settings"} className="flex items-center gap-6">
            <SettingsIcon className="w-6 h-6" />
            <h2 className="text-md">Settings</h2>
          </Link>
        </div>
        <LogoutButton />
      </aside>
      <Outlet />
    </div>
  );
}

export default Dashboard;
