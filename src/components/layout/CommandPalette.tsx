import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, User, Briefcase, Building, FileText, Settings, Activity, ShieldCheck, FileKey, X, LayoutDashboard, BrainCircuit, Calendar, BarChart, Database, Sparkles, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { cn } from "@/lib/utils";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    setSearch("");
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh]">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={() => setOpen(false)}
      />
      <div className="relative z-[101] w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950">
        <Command className="flex h-full w-full flex-col overflow-hidden bg-transparent" shouldFilter={true}>
          <div className="flex items-center border-b border-slate-200 px-4 dark:border-slate-800">
            <Search className="mr-3 h-5 w-5 shrink-0 opacity-50" />
            <Command.Input 
              autoFocus
              value={search}
              onValueChange={setSearch}
              className="flex h-14 w-full rounded-md bg-transparent py-3 text-base outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-50"
              placeholder="Search candidates, companies, jobs, recruiters, reports..."
            />
            <div className="flex items-center gap-2">
              <kbd className="hidden rounded bg-slate-100 px-2 py-0.5 text-xs font-light text-slate-500 dark:bg-slate-800 dark:text-slate-400 sm:block">
                ESC
              </kbd>
              <button
                onClick={() => setOpen(false)}
                className="ml-2 rounded-full p-1 opacity-70 ring-offset-background transition-colors hover:bg-slate-100 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
          </div>
          <Command.List className="max-h-[60vh] overflow-y-auto overflow-x-hidden p-2 custom-scrollbar">
            <Command.Empty className="py-12 text-center text-sm">
              <div className="flex flex-col items-center justify-center space-y-3">
                <Search className="h-8 w-8 text-slate-300 dark:text-slate-700" />
                <p className="text-slate-500">No results found for "{search}"</p>
                <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                  <Sparkles className="h-4 w-4" /> Ask AI to search globally
                </button>
              </div>
            </Command.Empty>
            
            {!search && (
              <Command.Group heading="Recent Searches" className="px-2 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                <Command.Item
                  onSelect={() => runCommand(() => navigate("/candidates"))}
                  className="relative flex cursor-default select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50"
                >
                  <Clock className="mr-3 h-4 w-4 text-slate-400" />
                  <span>Senior Frontend Engineers in SF</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => navigate("/jobs"))}
                  className="relative flex cursor-default select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50"
                >
                  <Clock className="mr-3 h-4 w-4 text-slate-400" />
                  <span>Product Manager Openings</span>
                </Command.Item>
              </Command.Group>
            )}

            {search.length > 2 && (
              <Command.Group heading="AI Suggestions" className="px-2 py-1.5 text-xs font-medium text-indigo-500 dark:text-indigo-400">
                <Command.Item
                  onSelect={() => runCommand(() => navigate("/candidates"))}
                  className="relative flex cursor-default select-none items-center rounded-md px-2 py-2.5 text-sm outline-none bg-indigo-50/50 aria-selected:bg-indigo-100/50 aria-selected:text-indigo-900 dark:bg-indigo-950/20 dark:aria-selected:bg-indigo-900/30 dark:aria-selected:text-indigo-100"
                >
                  <Sparkles className="mr-3 h-4 w-4 text-indigo-500" />
                  <span>Find candidates with high ATS scores matching "{search}"</span>
                  <ArrowRight className="ml-auto h-4 w-4 text-indigo-400 opacity-50" />
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => navigate("/reports"))}
                  className="relative flex cursor-default select-none items-center rounded-md px-2 py-2.5 text-sm outline-none bg-indigo-50/50 aria-selected:bg-indigo-100/50 aria-selected:text-indigo-900 dark:bg-indigo-950/20 dark:aria-selected:bg-indigo-900/30 dark:aria-selected:text-indigo-100 mt-1"
                >
                  <Sparkles className="mr-3 h-4 w-4 text-indigo-500" />
                  <span>Generate report for "{search}" performance</span>
                  <ArrowRight className="ml-auto h-4 w-4 text-indigo-400 opacity-50" />
                </Command.Item>
              </Command.Group>
            )}

            <Command.Group heading="Quick Actions" className="px-2 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
              <Command.Item
                onSelect={() => runCommand(() => navigate("/"))}
                className="relative flex cursor-default select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50"
              >
                <LayoutDashboard className="mr-3 h-4 w-4" />
                <span>Dashboard</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate("/executive"))}
                className="relative flex cursor-default select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50"
              >
                <BarChart className="mr-3 h-4 w-4" />
                <span>Executive Analytics</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate("/candidates"))}
                className="relative flex cursor-default select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50"
              >
                <User className="mr-3 h-4 w-4" />
                <span>Candidates</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate("/jobs"))}
                className="relative flex cursor-default select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50"
              >
                <Briefcase className="mr-3 h-4 w-4" />
                <span>Jobs</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate("/companies"))}
                className="relative flex cursor-default select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50"
              >
                <Building className="mr-3 h-4 w-4" />
                <span>Companies</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate("/applications"))}
                className="relative flex cursor-default select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50"
              >
                <FileText className="mr-3 h-4 w-4" />
                <span>Applications & Board</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate("/analytics"))}
                className="relative flex cursor-default select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50"
              >
                <BrainCircuit className="mr-3 h-4 w-4" />
                <span>AI Command Center</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="System" className="px-2 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
               <Command.Item
                onSelect={() => runCommand(() => navigate("/health"))}
                className="relative flex cursor-default select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50"
              >
                <Activity className="mr-3 h-4 w-4" />
                <span>System Health</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
