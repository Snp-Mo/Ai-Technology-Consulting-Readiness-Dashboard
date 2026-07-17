import { Outlet } from "react-router-dom";
import { DashboardProvider } from "./context/DashboardContext.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";

export default function App() {
  return (
    <DashboardProvider>
      <Sidebar />
      <main className="ml-[168px] min-h-screen px-8 py-7">
        <Outlet />
      </main>
    </DashboardProvider>
  );
}
