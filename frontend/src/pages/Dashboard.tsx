import LogoutButton from "@/components/LogoutButton";
import { Outlet } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";

function Dashboard() {
  return (
    <div>
      This is a logged in user Dashboard
      <LuLayoutDashboard />
      <LogoutButton />
      <Outlet />
    </div>
  );
}

export default Dashboard;
