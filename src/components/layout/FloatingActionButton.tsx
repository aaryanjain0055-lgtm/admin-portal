import React from "react";
import { Plus, User, Briefcase, FileText, BarChart, Settings, Search, Bell } from "lucide-react";
import { useNavigate } from "react-router";
import { cn } from "@/lib/utils";

export function FloatingActionButton() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const actions = [
    { icon: User, label: "Add Candidate", onClick: () => navigate("/candidates") },
    { icon: Briefcase, label: "Create Job", onClick: () => navigate("/jobs") },
    { icon: FileText, label: "AI Analysis", onClick: () => navigate("/analytics") },
    { icon: BarChart, label: "Report", onClick: () => navigate("/reports") },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2">
      {open && (
        <div className="flex flex-col items-end space-y-2 mb-2 animate-in slide-in-from-bottom-5 fade-in-0">
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => {
                setOpen(false);
                action.onClick();
              }}
              className="flex items-center space-x-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-md transition-all hover:bg-slate-50 hover:text-indigo-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-indigo-400"
            >
              <span>{action.label}</span>
              <action.icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-all hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
          open && "rotate-45 bg-slate-800 hover:bg-slate-900"
        )}
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
