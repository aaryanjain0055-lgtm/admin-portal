import React, { useState, useEffect } from "react";
import { MOCK_CANDIDATES, Candidate, delay } from "@/data/mock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, MoreHorizontal, FileText, Bot, ExternalLink, Mail, Phone, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ExportImportButtons } from "@/components/ui/export-import-buttons";
import { Drawer } from "@/components/ui/drawer";

export function Applications() {
  const [applications, setApplications] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedApp, setSelectedApp] = useState<Candidate | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      await delay(600);
      setApplications(MOCK_CANDIDATES); // Reusing candidates data for applications for demo
      setLoading(false);
    };
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleRowClick = (app: Candidate) => {
    setSelectedApp(app);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Applications</h2>
          <p className="text-slate-500">Track and review all candidate applications across the hiring pipeline.</p>
        </div>
        <div className="flex items-center gap-2">
          <ExportImportButtons data={applications} filename="applications" />
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search candidate name or role applied..."
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
                <TableHead>Role Applied For</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>ATS Match</TableHead>
                <TableHead>Pipeline Stage</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-6 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-slate-500">No applications found matching your criteria.</TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((app) => (
                  <TableRow 
                    key={app.id} 
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                    onClick={() => handleRowClick(app)}
                  >
                    <TableCell className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                       <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 overflow-hidden shrink-0">
                        <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${app.name}&backgroundColor=e2e8f0,cbf4c9,c7d2fe,fde047`} alt="Avatar" className="w-full h-full object-cover" />
                      </div>
                      {app.name}
                    </TableCell>
                    <TableCell className="text-slate-600 dark:text-slate-300 font-medium">{app.role}</TableCell>
                    <TableCell className="text-slate-500 font-mono text-sm">{new Date(app.appliedDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold ring-1 ring-inset ${
                        app.atsScore > 85 ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400' : 
                        app.atsScore > 70 ? 'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400' : 
                        'bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-500/10 dark:text-rose-400'
                      }`}>
                        {app.atsScore}%
                      </span>
                    </TableCell>
                    <TableCell>
                       <Badge variant={
                          app.status === "Hired" ? "success" : 
                          app.status === "Rejected" ? "destructive" : 
                          app.status === "Offered" ? "success" : 
                          "warning"
                        }>
                          {app.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400" onClick={(e) => { e.stopPropagation(); handleRowClick(app); }}>
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
        title="Application Review"
        description="Review candidate application, resume, and AI screening notes."
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {selectedApp && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
               <div className="h-16 w-16 rounded-full overflow-hidden shrink-0 border-2 border-white dark:border-slate-800 shadow-sm">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedApp.name}&backgroundColor=e2e8f0,cbf4c9,c7d2fe,fde047`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 truncate">{selectedApp.name}</h3>
                  <Badge variant={
                    selectedApp.status === "Hired" ? "success" : 
                    selectedApp.status === "Rejected" ? "destructive" : 
                    selectedApp.status === "Offered" ? "success" : 
                    "warning"
                  }>
                    {selectedApp.status}
                  </Badge>
                </div>
                <div className="text-slate-500 mt-1 flex items-center gap-2 text-sm font-medium">
                  Applying for: <strong className="text-slate-700 dark:text-slate-300">{selectedApp.role}</strong>
                </div>
                <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {selectedApp.email}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Applied {new Date(selectedApp.appliedDate).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><ExternalLink className="h-3.5 w-3.5 text-indigo-500" /> <a href="#" className="text-indigo-600 hover:underline">LinkedIn Profile</a></span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-none border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50">
                 <div className="p-4 flex flex-col items-center text-center">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">ATS Score</div>
                    <div className={`text-3xl font-bold ${selectedApp.atsScore > 80 ? 'text-emerald-600' : selectedApp.atsScore > 60 ? 'text-amber-500' : 'text-rose-500'}`}>
                      {selectedApp.atsScore}%
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Based on JD semantic match</div>
                 </div>
              </Card>
              <Card className="shadow-none border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer group">
                 <div className="p-4 flex flex-col items-center text-center justify-center h-full">
                    <FileText className="h-8 w-8 text-indigo-500 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="font-semibold text-slate-900 dark:text-slate-100">View Resume (PDF)</div>
                 </div>
              </Card>
            </div>

             <div className="p-5 rounded-xl border border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/50 dark:bg-indigo-900/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Bot className="h-32 w-32" />
              </div>
              <h4 className="text-sm font-bold text-indigo-800 dark:text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Bot className="h-5 w-5" /> AI Screening Summary
              </h4>
              <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 relative z-10">
                <p>
                  <strong>Strengths:</strong> Strong background in {selectedApp.department}. Shows progressive leadership experience and clear impact in previous roles. Skills align perfectly with requirements.
                </p>
                <p>
                  <strong>Weaknesses:</strong> Short tenure at last two companies (average 1.2 years). May need to probe on retention and long-term career goals during interview.
                </p>
                <div className="p-3 bg-white/60 dark:bg-slate-950/60 rounded-md border border-indigo-100 dark:border-indigo-800 mt-2">
                  <span className="font-semibold text-indigo-900 dark:text-indigo-300 block mb-1">AI Recommendation:</span>
                  Advance to Recruiter Screen. Candidate shows high promise for {selectedApp.role}.
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">Advance Stage</Button>
              <Button variant="outline" className="flex-1 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-400">Reject Candidate</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
