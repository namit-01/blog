"use client";
import SideBar from "@/components/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAppData } from "@/context/AppProvider";
import React, { ReactNode } from "react";

const HomeLayout = ({ children }) => {
  const { sidebarOpen } = useAppData();
  return (
    <div>
      <SidebarProvider>
        <SideBar />{" "}
        <main
          className={`min-h-screen w-full transition-all duration-300 ${
            sidebarOpen ? "ml-72" : "ml-20"
          }`}
        >
          <div className="w-full min-h-[calc(100vh-45)] px-4">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default HomeLayout;
