"use client";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { useState } from "react";
import {

  Menu,
  MoveLeft
} from "lucide-react";
import  "../../app/layout.css"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="h-full relative">
      <button
        className={`fixed left-6 top-10 z-50 ${
          showSidebar ? "text-4xl text-black" : "text-sm text-black"
        }`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <MoveLeft />: <Menu />}
      </button>
      {/*style side bar using tailwind css */}
      {showSidebar && (
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 ">
          <Sidebar showSidebar={showSidebar}  />
        </div>
      )}
      <main className={showSidebar?`ml-60`:`md:max-w-[calc(100%-72px)]`}>
        <Navbar showSidebar={showSidebar}/>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
