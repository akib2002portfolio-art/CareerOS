import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-zinc-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Sticky Header */}
        <Header />

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mx-auto w-full max-w-[1600px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}