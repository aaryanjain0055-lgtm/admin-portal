import React, { useState, useEffect } from "react";
import { MOCK_CANDIDATES, Candidate, delay } from "@/data/mock";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Download, MoreHorizontal, User, Mail, Phone, MapPin, Briefcase, Calendar, Star, FileText, Checkbox as CheckboxIcon, ChevronLeft, ChevronRight, LayoutGrid, Check, Minus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ExportImportButtons } from "@/components/ui/export-import-buttons";
import { Drawer } from "@/components/ui/drawer";

export function Candidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchCandidates = async () => {
      await delay(1000);
      setCandidates(MOCK_CANDIDATES);
      setLoading(false);
    };
    fetchCandidates();
  }, []);

  const filteredCandidates = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAll = () => {
    if (selectedRows.size === filteredCandidates.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredCandidates.map(c => c.id)));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Candidates Database</h2>
          <p className="text-slate-500">
            Enterprise applicant tracking, AI-driven scoring, and talent pipeline management.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ExportImportButtons data={candidates} filename="candidates" />
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">Add Candidate</Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 min-w-[280px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search candidates by name, role, email..."
            className="pl-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          {selectedRows.size > 0 && (
            <div className="flex items-center gap-2 mr-4 border-r pr-4 border-slate-200 dark:border-slate-700">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{selectedRows.size} selected</span>
              <Button variant="outline" size="sm" className="h-8">Bulk Actions</Button>
            </div>
          )}
          <Button variant="outline" size="icon" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-700">
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
            <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400">2</Badge>
          </Button>
        </div>
      </div>

      <div className="rounded-xl border bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm flex flex-col min-h-[500px] h-[calc(100vh-280px)]">
        <div className="flex-1 overflow-auto custom-scrollbar relative">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur-sm dark:bg-slate-900/95 shadow-sm border-b border-slate-200 dark:border-slate-800">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="w-12 text-center pl-4">
                  <div 
                    className={`h-4 w-4 rounded border flex items-center justify-center cursor-pointer transition-colors ${selectedRows.size > 0 && selectedRows.size === filteredCandidates.length ? "bg-indigo-600 border-indigo-600" : "border-slate-300 dark:border-slate-600 bg-transparent"}`}
                    onClick={toggleAll}
                  >
                    {selectedRows.size > 0 && selectedRows.size === filteredCandidates.length && <Check className="h-3 w-3 text-white" />}
                    {selectedRows.size > 0 && selectedRows.size < filteredCandidates.length && <Minus className="h-3 w-3 text-white" />}
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Candidate Profile</TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Target Role & Dept</TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Pipeline Status</TableHead>
                <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-300">AI Match</TableHead>
                <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-300 pr-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                    <TableCell><Skeleton className="h-10 w-48" /></TableCell>
                    <TableCell><Skeleton className="h-10 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-6 w-12 ml-auto" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : filteredCandidates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <User className="h-8 w-8 text-slate-300 dark:text-slate-700 mb-2" />
                      <p>No candidates match your search filters.</p>
                      <Button variant="link" onClick={() => setSearch("")} className="mt-2 text-indigo-600">Clear Search</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCandidates.map((candidate) => {
                  const isSelected = selectedRows.has(candidate.id);
                  return (
                    <TableRow 
                      key={candidate.id}
                      className={`cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${isSelected ? "bg-indigo-50/50 dark:bg-indigo-900/10" : ""}`}
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      <TableCell className="pl-4" onClick={(e) => e.stopPropagation()}>
                        <div 
                          className={`h-4 w-4 rounded border flex items-center justify-center cursor-pointer transition-colors ${isSelected ? "bg-indigo-600 border-indigo-600" : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"}`}
                          onClick={() => toggleRow(candidate.id)}
                        >
                          {isSelected && <Check className="h-3 w-3 text-white" />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 flex items-center justify-center font-medium shadow-sm">
                            <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${candidate.id}`} alt={candidate.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-slate-100">{candidate.name}</p>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Mail className="h-3 w-3" /> {candidate.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-slate-700 dark:text-slate-200">{candidate.role}</p>
                        <p className="text-xs text-slate-500 mt-0.5 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-sm inline-block">{candidate.department}</p>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={candidate.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className={`inline-flex items-center justify-center font-mono text-sm font-bold rounded-md px-2.5 py-1 ${
                          candidate.atsScore > 90 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                          candidate.atsScore > 75 ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" :
                          "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
                        }`}>
                          {candidate.atsScore}%
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-4">
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20" onClick={(e) => { e.stopPropagation(); setSelectedCandidate(candidate); }}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Mock Pagination Footer */}
        <div className="shrink-0 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4 flex items-center justify-between mt-auto rounded-b-xl">
          <div className="text-sm text-slate-500 font-medium">
            Showing <span className="text-slate-900 dark:text-slate-100">1</span> to <span className="text-slate-900 dark:text-slate-100">{filteredCandidates.length > 10 ? 10 : filteredCandidates.length}</span> of <span className="text-slate-900 dark:text-slate-100">{filteredCandidates.length}</span> candidates
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" size="sm" disabled className="text-slate-400">
               <ChevronLeft className="h-4 w-4 mr-1" /> Previous
             </Button>
             <div className="flex gap-1">
               <Button variant="outline" size="sm" className="bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 h-8 w-8 p-0 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800">1</Button>
               <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500">2</Button>
               <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500">3</Button>
             </div>
             <Button variant="outline" size="sm" className="text-slate-600 dark:text-slate-300">
               Next <ChevronRight className="h-4 w-4 ml-1" />
             </Button>
          </div>
        </div>
      </div>

      <Drawer 
        open={!!selectedCandidate} 
        onClose={() => setSelectedCandidate(null)}
        title="Candidate 360° Profile"
        size="lg"
      >
        {selectedCandidate && (
          <div className="p-6 space-y-8">
            <div className="flex items-start gap-6">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${selectedCandidate.id}`} alt={selectedCandidate.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCandidate.name}</h3>
                  <StatusBadge status={selectedCandidate.status} />
                </div>
                <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400">{selectedCandidate.role}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> {selectedCandidate.email}</div>
                  <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Global / Remote</div>
                  <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Applied: {new Date(selectedCandidate.appliedDate).toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
                <div className="flex items-center gap-2 mb-2 text-slate-500">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-semibold uppercase tracking-wider">ATS Match Score</span>
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-50">{selectedCandidate.atsScore}%</div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-full bg-indigo-500" style={{ width: `${selectedCandidate.atsScore}%` }} />
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
                <div className="flex items-center gap-2 mb-2 text-slate-500">
                  <Briefcase className="h-4 w-4" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Experience</span>
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-50">5 Yrs</div>
                <div className="mt-2 text-sm text-slate-500">Senior Level</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-500" /> AI Executive Summary
              </h4>
              <div className="rounded-xl bg-indigo-50 p-4 text-sm text-indigo-900 dark:bg-indigo-900/20 dark:text-indigo-200 leading-relaxed border border-indigo-100 dark:border-indigo-800/50">
                <p>
                  <strong>{selectedCandidate.name}</strong> is a highly qualified candidate for the <strong>{selectedCandidate.role}</strong> position in the <strong>{selectedCandidate.department}</strong> department. 
                  The AI ATS analysis indicates a strong alignment ({selectedCandidate.atsScore}%) with the core job requirements. Key strengths include extensive experience with modern tech stacks and a proven track record of leadership in previous roles. 
                  Recommendation: Proceed to final technical interview.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 dark:text-white">Recent Activity Timeline</h4>
              <div className="relative border-l border-slate-200 ml-3 space-y-6 pb-4 dark:border-slate-800">
                <div className="relative pl-6">
                  <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-white bg-indigo-500 dark:border-slate-950" />
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Status updated to {selectedCandidate.status}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Today at 10:45 AM</p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-white bg-slate-300 dark:border-slate-950 dark:bg-slate-700" />
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">AI Resume Screening Completed</p>
                  <p className="text-xs text-slate-500 mt-0.5">Yesterday at 2:30 PM</p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-white bg-slate-300 dark:border-slate-950 dark:bg-slate-700" />
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Application Submitted</p>
                  <p className="text-xs text-slate-500 mt-0.5">{new Date(selectedCandidate.appliedDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">Schedule Interview</Button>
              <Button variant="outline" className="flex-1">View Resume</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}

function StatusBadge({ status }: { status: Candidate["status"] }) {
  switch (status) {
    case "Screening":
      return <Badge variant="secondary">Screening</Badge>;
    case "Interviewing":
      return <Badge variant="warning">Interviewing</Badge>;
    case "Offered":
      return <Badge variant="success">Offered</Badge>;
    case "Hired":
      return <Badge variant="default" className="bg-primary text-primary-foreground">Hired</Badge>;
    case "Rejected":
      return <Badge variant="destructive">Rejected</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
