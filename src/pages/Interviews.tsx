import React, { useState, useEffect } from "react";
import { Interview, delay } from "@/data/mock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar as CalendarIcon, MoreHorizontal, Video, Clock, CheckCircle2, UserCircle2, Briefcase, Bot } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ExportImportButtons } from "@/components/ui/export-import-buttons";
import { Drawer } from "@/components/ui/drawer";

// Generate deterministic 100+ interviews
const generateMockInterviews = (): Interview[] => {
  const roles = ["Senior Frontend Engineer", "Product Marketing Manager", "Enterprise Account Executive", "UX Research Lead", "DevOps Specialist", "Director of Engineering"];
  const types = ["Technical", "HR", "Culture Fit", "Final"];
  const statuses = ["Scheduled", "Completed", "Cancelled"];
  const names = ["Sarah Jenkins", "Michael Chang", "Emily Rodriguez", "David Kim", "Jessica Walsh", "Omar Farooq", "Lily Chen", "Marcus Johnson"];
  const interviewers = ["Alex Voss", "Priya Patel", "Samir Desai", "Jordan Lee"];

  const interviews: Interview[] = [];
  let currentDate = new Date();
  
  for (let i = 1; i <= 100; i++) {
    interviews.push({
      id: `INT-${4000 + i}`,
      candidateName: names[i % names.length] + (i > names.length ? ` ${i}` : ''),
      role: roles[i % roles.length],
      interviewer: interviewers[i % interviewers.length],
      date: new Date(currentDate.getTime() + (i % 14) * 86400000 - (7 * 86400000)).toISOString().split('T')[0], // mix of past and future
      time: `${(i % 5) + 9}:00 ${i % 2 === 0 ? 'AM' : 'PM'}`,
      type: types[i % types.length] as any,
      status: statuses[i % statuses.length] as any,
    });
  }
  return interviews;
};

const MOCK_INTERVIEWS_DATA = generateMockInterviews();

export function Interviews() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchInterviews = async () => {
      await delay(600);
      setInterviews(MOCK_INTERVIEWS_DATA);
      setLoading(false);
    };
    fetchInterviews();
  }, []);

  const filteredInterviews = interviews.filter(
    (i) => i.candidateName.toLowerCase().includes(search.toLowerCase()) || i.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleRowClick = (interview: Interview) => {
    setSelectedInterview(interview);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Interviews</h2>
          <p className="text-slate-500">Schedule, track, and manage all candidate interviews across the enterprise.</p>
        </div>
        <div className="flex items-center gap-2">
          <ExportImportButtons data={interviews} filename="interviews" />
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
            <CalendarIcon className="mr-2 h-4 w-4" /> Schedule Interview
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search candidate or role..."
            className="pl-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-240px)] min-h-[500px]">
        <div className="flex-1 overflow-auto custom-scrollbar">
          <Table>
            <TableHeader className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-10 shadow-sm">
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Interviewer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : filteredInterviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-slate-500">No interviews found matching your search.</TableCell>
                </TableRow>
              ) : (
                filteredInterviews.map((interview) => (
                  <TableRow 
                    key={interview.id} 
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                    onClick={() => handleRowClick(interview)}
                  >
                    <TableCell className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 overflow-hidden shrink-0">
                        <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${interview.candidateName}&backgroundColor=e2e8f0,cbf4c9,c7d2fe,fde047`} alt="Avatar" className="w-full h-full object-cover" />
                      </div>
                      {interview.candidateName}
                    </TableCell>
                    <TableCell className="text-slate-600 dark:text-slate-300 font-medium">{interview.role}</TableCell>
                    <TableCell className="text-slate-600 dark:text-slate-400">{interview.interviewer}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium border-slate-200 dark:border-slate-700">
                        {interview.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900 dark:text-slate-100">{new Date(interview.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span className="text-xs text-slate-500">{interview.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={interview.status === "Completed" ? "success" : interview.status === "Cancelled" ? "destructive" : "warning"} className="font-semibold">
                        {interview.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400" onClick={(e) => { e.stopPropagation(); handleRowClick(interview); }}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Drawer
        title="Interview Details"
        description="Review interview logistics, AI prep notes, and candidate context."
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {selectedInterview && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
              <div className="h-16 w-16 rounded-full overflow-hidden shrink-0 border-2 border-white dark:border-slate-800 shadow-sm">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedInterview.candidateName}&backgroundColor=e2e8f0,cbf4c9,c7d2fe,fde047`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">{selectedInterview.candidateName}</h3>
                <div className="text-slate-500 mt-1 flex items-center gap-2 text-sm font-medium">
                  <Briefcase className="h-4 w-4 text-slate-400" />
                  {selectedInterview.role}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant={selectedInterview.status === "Completed" ? "success" : selectedInterview.status === "Cancelled" ? "destructive" : "warning"}>
                    {selectedInterview.status}
                  </Badge>
                  <Badge variant="outline" className="bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300">
                    {selectedInterview.type} Interview
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" /> Date & Time
                </div>
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                  {new Date(selectedInterview.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
                <div className="text-slate-500 text-sm mt-1">{selectedInterview.time} (Duration: 45m)</div>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <UserCircle2 className="h-4 w-4" /> Interviewer
                </div>
                <div className="font-semibold text-slate-900 dark:text-slate-100">{selectedInterview.interviewer}</div>
                <div className="text-slate-500 text-sm mt-1 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Confirmed
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/50 dark:bg-indigo-900/10">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-semibold mb-3">
                <Video className="h-5 w-5" /> Meeting Link
              </div>
              <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-2">
                <code className="text-sm font-mono text-slate-600 dark:text-slate-400 px-2 truncate">
                  https://meet.enterprise.com/v/{selectedInterview.id.toLowerCase()}
                </code>
                <Button size="sm" variant="secondary" className="shrink-0 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300">
                  Copy
                </Button>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-amber-200 dark:border-amber-900/30 bg-amber-50/30 dark:bg-amber-900/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Bot className="h-24 w-24" />
              </div>
              <h4 className="text-sm font-bold text-amber-800 dark:text-amber-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Bot className="h-5 w-5" /> AI Prep Notes
              </h4>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 relative z-10">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                  Candidate has strong React experience but lacks deep Node.js knowledge. Probe on system design.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                  Values mentorship and team culture highly based on resume semantic analysis.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                  Suggested Question: "Describe a time you had to optimize a slow-rendering component."
                </li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">Join Meeting</Button>
              <Button variant="outline" className="flex-1 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">Reschedule</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
