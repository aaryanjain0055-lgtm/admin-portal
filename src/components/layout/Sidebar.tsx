import React from "react";
import { NavLink } from "react-router";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Building2, 
  Settings, 
  BarChart3,
  FileText,
  MessageSquare,
  Activity,
  ShieldCheck,
  ScrollText,
  KanbanSquare,
  Calendar,
  FolderOpen,
  PieChart,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const CORE_ITEMS = [
  { icon: LayoutDashboard, label: "Global Dashboard", href: "/" },
  { icon: BarChart3, label: "Executive Analytics", href: "/executive" },
  { icon: KanbanSquare, label: "Kanban Board", href: "/board" },
  { icon: Users, label: "Talent Pool", href: "/candidates" },
  { icon: Briefcase, label: "Jobs", href: "/jobs" },
  { icon: MessageSquare, label: "Interviews", href: "/interviews" },
  { icon: FileText, label: "Applications", href: "/applications" },
  { icon: Building2, label: "Companies", href: "/companies" },
];

const ANALYTICS_ITEMS = [
  { icon: BarChart3, label: "AI Command Center", href: "/analytics" },
  { icon: PieChart, label: "Report Builder", href: "/reports" },
];

const PRODUCTIVITY_ITEMS = [
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: FolderOpen, label: "Document Center", href: "/documents" },
];

const INFRA_ITEMS = [
  { icon: Activity, label: "System Health", href: "/health" },
  { icon: ShieldCheck, label: "RBAC Security", href: "/security" },
  { icon: ScrollText, label: "Audit Logs", href: "/audit" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-20 flex flex-col border-r border-slate-800 bg-slate-900 text-slate-300 transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className={cn("flex p-6 items-center bg-slate-950 transition-all duration-300", collapsed ? "justify-center" : "space-x-3")}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-indigo-500 font-bold text-white shadow-lg shadow-indigo-500/20">
          Σ
        </div>
        {!collapsed && <span className="text-lg font-semibold tracking-tight text-white whitespace-nowrap overflow-hidden">STRATUM HR</span>}
      </div>
      
      <button 
        onClick={onToggle}
        className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-30"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-6 custom-scrollbar">
        <nav className="space-y-1">
          <div className={cn("mb-2 px-2 text-xs font-bold uppercase tracking-widest text-slate-500 transition-all", collapsed ? "text-center opacity-0 h-0" : "opacity-100")}>
            {!collapsed && "Core"}
          </div>
          {CORE_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                cn(
                  "flex items-center rounded-md px-2 py-2.5 text-sm font-medium transition-colors hover:bg-slate-800",
                  isActive ? "border-l-2 border-indigo-500 bg-indigo-600/10 text-indigo-400" : "border-l-2 border-transparent",
                  collapsed ? "justify-center" : "space-x-3"
                )
              }
            >
              <item.icon className="w-5 shrink-0 text-center h-4" />
              {!collapsed && <span className="whitespace-nowrap overflow-hidden">{item.label}</span>}
            </NavLink>
          ))}

          <div className={cn("mb-2 mt-6 px-2 text-xs font-bold uppercase tracking-widest text-slate-500 transition-all", collapsed ? "text-center opacity-0 h-0" : "opacity-100")}>
            {!collapsed && "Intelligence"}
          </div>
          {ANALYTICS_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                cn(
                  "flex items-center rounded-md px-2 py-2.5 text-sm font-medium transition-colors hover:bg-slate-800",
                  isActive ? "border-l-2 border-indigo-500 bg-indigo-600/10 text-indigo-400" : "border-l-2 border-transparent",
                  collapsed ? "justify-center" : "space-x-3"
                )
              }
            >
              <item.icon className="w-5 shrink-0 text-center h-4" />
              {!collapsed && <span className="whitespace-nowrap overflow-hidden">{item.label}</span>}
            </NavLink>
          ))}

          <div className={cn("mb-2 mt-6 px-2 text-xs font-bold uppercase tracking-widest text-slate-500 transition-all", collapsed ? "text-center opacity-0 h-0" : "opacity-100")}>
            {!collapsed && "Productivity"}
          </div>
          {PRODUCTIVITY_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                cn(
                  "flex items-center rounded-md px-2 py-2.5 text-sm font-medium transition-colors hover:bg-slate-800",
                  isActive ? "border-l-2 border-indigo-500 bg-indigo-600/10 text-indigo-400" : "border-l-2 border-transparent",
                  collapsed ? "justify-center" : "space-x-3"
                )
              }
            >
              <item.icon className="w-5 shrink-0 text-center h-4" />
              {!collapsed && <span className="whitespace-nowrap overflow-hidden">{item.label}</span>}
            </NavLink>
          ))}

          <div className={cn("mb-2 mt-6 px-2 text-xs font-bold uppercase tracking-widest text-slate-500 transition-all", collapsed ? "text-center opacity-0 h-0" : "opacity-100")}>
            {!collapsed && "Infrastructure"}
          </div>
          {INFRA_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                cn(
                  "flex items-center rounded-md px-2 py-2.5 text-sm font-medium transition-colors hover:bg-slate-800",
                  isActive ? "border-l-2 border-indigo-500 bg-indigo-600/10 text-indigo-400" : "border-l-2 border-transparent",
                  collapsed ? "justify-center" : "space-x-3"
                )
              }
            >
              <item.icon className="w-5 shrink-0 text-center h-4" />
              {!collapsed && <span className="whitespace-nowrap overflow-hidden">{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className={cn("flex items-center border-t border-slate-800 p-4 shrink-0 bg-slate-900 transition-all", collapsed ? "justify-center" : "space-x-3")}>
        <div className="h-8 w-8 shrink-0 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white">AV</div>
        {!collapsed && (
          <>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-xs font-semibold text-white">Alexander Voss</p>
              <p className="truncate text-[10px] text-slate-500">Super Admin (Level 4)</p>
            </div>
            <span className="text-xs text-slate-500">⌄</span>
          </>
        )}
      </div>
    </aside>
  );
}
