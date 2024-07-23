"use client";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { useState } from "react";
import { Menu, MoveLeft } from "lucide-react";
import "../../app/layout.css";

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
        {showSidebar ? <MoveLeft /> : <Menu />}
      </button>
      {/*style side bar using tailwind css */}
      {showSidebar && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" onClick={() => setShowSidebar(false)}>
          <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-lg">
            <Sidebar showSidebar={showSidebar} />
          </div>
        </div>
      )}
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
        <Sidebar showSidebar={showSidebar} />
      </div>
      <main className={showSidebar ? `ml-0 md:ml-72` : `ml-0`}>
        <Navbar showSidebar={showSidebar} />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
