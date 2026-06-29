import React, { useState, useEffect } from "react";
import { MOCK_JOBS, Job, delay } from "@/data/mock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, MoreHorizontal, Plus, Briefcase, MapPin, Users, Target, Clock, BrainCircuit, Wand2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ExportImportButtons } from "@/components/ui/export-import-buttons";
import { Drawer } from "@/components/ui/drawer";

export function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      await delay(800);
      setJobs(MOCK_JOBS);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (j) => j.title.toLowerCase().includes(search.toLowerCase()) || j.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Jobs & Requisitions</h2>
          <p className="text-slate-500">Manage job postings, track applicant pipelines, and adjust hiring requirements.</p>
        </div>
        <div className="flex items-center gap-2">
          <ExportImportButtons data={jobs} filename="jobs" />
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="mr-2 h-4 w-4" /> Post Job
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by title or department..."
            className="pl-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden h-[calc(100vh-280px)] min-h-[400px] flex flex-col">
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur-sm dark:bg-slate-900/95 shadow-sm border-b border-slate-200 dark:border-slate-800">
              <TableRow className="hover:bg-transparent">
                <TableHead>Job Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Applicants</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-6 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-6 w-10 ml-auto" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : filteredJobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Briefcase className="h-8 w-8 text-slate-300 dark:text-slate-700 mb-2" />
                      <p>No jobs found.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredJobs.map((job) => (
                  <TableRow 
                    key={job.id}
                    className="cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    onClick={() => setSelectedJob(job)}
                  >
                    <TableCell className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                        <Briefcase className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span>{job.title}</span>
                        <span className="text-xs text-slate-500 font-normal">{job.id}</span>
                      </div>
                    </TableCell>
                    <TableCell>{job.department}</TableCell>
                    <TableCell>
                      <span className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <MapPin className="mr-1 h-3 w-3" />
                        {job.location}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={job.status === "Open" ? "success" : job.status === "Closed" ? "destructive" : "secondary"}>
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="font-mono bg-slate-50 dark:bg-slate-900">
                        {job.applicants}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" onClick={(e) => { e.stopPropagation(); setSelectedJob(job); }}>
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
        open={!!selectedJob} 
        onClose={() => setSelectedJob(null)}
        title="Job Requisition Details"
        size="lg"
      >
        {selectedJob && (
          <div className="p-6 space-y-8 h-full overflow-y-auto custom-scrollbar">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
                  <Briefcase className="h-8 w-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedJob.title}</h3>
                    <Badge variant={selectedJob.status === "Open" ? "success" : "secondary"} className="text-xs uppercase tracking-wider">
                      {selectedJob.status}
                    </Badge>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5"><Target className="h-4 w-4" /> {selectedJob.department}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {selectedJob.location}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> Posted 12 days ago</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center">
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-50">{selectedJob.applicants}</div>
                <div className="mt-1 text-sm text-slate-500 flex items-center gap-1">Total Applicants</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center">
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-50">{Math.floor(selectedJob.applicants * 0.15)}</div>
                <div className="mt-1 text-sm text-slate-500 flex items-center gap-1">In Pipeline</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center">
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-50">3</div>
                <div className="mt-1 text-sm text-slate-500 flex items-center gap-1">Final Stage</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-emerald-500" /> AI Job Description Optimization
              </h4>
              <div className="rounded-xl bg-slate-50 p-5 text-sm border border-slate-200 dark:bg-slate-900/50 dark:border-slate-800 space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Wand2 className="h-24 w-24" />
                </div>
                <p className="relative z-10 leading-relaxed text-slate-600 dark:text-slate-300">
                  The current job description has a readability score of 65/100. AI suggests simplifying the "Requirements" section to attract 20% more diverse applicants. 
                  Also, adding explicit salary bands based on market data for <strong>{selectedJob.location}</strong> will improve click-through rates.
                </p>
                <div className="relative z-10 flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="bg-white dark:bg-slate-950 text-indigo-600 border-indigo-200 hover:bg-indigo-50 dark:border-indigo-900 dark:text-indigo-400 dark:hover:bg-indigo-950">
                    <Wand2 className="mr-2 h-3 w-3" /> Auto-Rewrite JD
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Hiring Team</h4>
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-800 flex items-center justify-center shadow-sm overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=Recruiter${i}${selectedJob.id}`} alt="Recruiter" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="h-10 w-10 rounded-full border-2 border-white dark:border-slate-950 bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-sm text-xs font-medium text-slate-500">
                  +2
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-slate-200 dark:border-slate-800 pb-8">
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">View Candidates</Button>
              <Button variant="outline" className="flex-1">Edit Posting</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
