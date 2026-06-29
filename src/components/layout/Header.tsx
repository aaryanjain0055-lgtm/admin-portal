import React from "react";
import { Search, Bell, Menu, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-8">
      <div className="flex flex-1 items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        <div className="hidden md:flex w-96 items-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 px-3 py-1.5 transition-colors focus-within:border-indigo-300 dark:focus-within:border-indigo-700 focus-within:ring-1 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-900">
          <Search className="mr-2 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search commands or data (Ctrl + K)"
            className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 outline-none placeholder:text-slate-500 dark:placeholder:text-slate-400"
          />
          <span className="ml-2 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-1.5 py-0.5 text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-widest shadow-sm">
            ⌘K
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></span>
          <span>Sys: Active</span>
        </div>
        <div className="flex space-x-4">
          <button className="relative text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white dark:border-slate-900 bg-rose-500 text-[9px] font-bold text-white">
              4
            </span>
          </button>
          <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
