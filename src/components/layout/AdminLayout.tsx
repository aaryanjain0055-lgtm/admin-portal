import React, { useState } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { CommandPalette } from "./CommandPalette";
import { FloatingActionButton } from "./FloatingActionButton";
import { AiChatAssistant } from "./AiChatAssistant";
import { cn } from "@/lib/utils";

export function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className={cn("flex flex-col min-h-screen transition-all duration-300", sidebarCollapsed ? "pl-20" : "pl-64")}>
        <Header />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
      <CommandPalette />
      <FloatingActionButton />
      <AiChatAssistant />
    </div>
  );
}
