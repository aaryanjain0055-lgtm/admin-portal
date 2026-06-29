import React, { useState, useEffect } from "react";
import { MOCK_COMPANIES, Company, delay } from "@/data/mock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, MoreHorizontal, Plus, Building2, MapPin, Users, Activity, TrendingUp, TrendingDown, Target, BrainCircuit } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ExportImportButtons } from "@/components/ui/export-import-buttons";
import { Drawer } from "@/components/ui/drawer";

export function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      await delay(800);
      setCompanies(MOCK_COMPANIES);
      setLoading(false);
    };
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Companies</h2>
          <p className="text-slate-500">Manage partner organizations, clients, and internal business units.</p>
        </div>
        <div className="flex items-center gap-2">
          <ExportImportButtons data={companies} filename="companies" />
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add Company
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by company name or industry..."
            className="pl-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 dark:bg-slate-900/50 dark:hover:bg-slate-900/50">
              <TableHead>Company Name</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Employees</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-6 w-40" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : filteredCompanies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-slate-500">No companies found.</TableCell>
              </TableRow>
            ) : (
              filteredCompanies.map((company) => (
                <TableRow 
                  key={company.id}
                  className="cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  onClick={() => setSelectedCompany(company)}
                >
                  <TableCell className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                      <Building2 className="h-4 w-4" />
                    </div>
                    {company.name}
                  </TableCell>
                  <TableCell>{company.industry}</TableCell>
                  <TableCell>{company.employees.toLocaleString()}</TableCell>
                  <TableCell>{company.location}</TableCell>
                  <TableCell>
                    <Badge variant={company.status === "Active" ? "success" : company.status === "Inactive" ? "destructive" : "warning"}>
                      {company.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" onClick={(e) => { e.stopPropagation(); setSelectedCompany(company); }}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Drawer 
        open={!!selectedCompany} 
        onClose={() => setSelectedCompany(null)}
        title="Company Profile"
        size="lg"
      >
        {selectedCompany && (
          <div className="p-6 space-y-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                  <Building2 className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCompany.name}</h3>
                  <div className="mt-1 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {selectedCompany.location}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {selectedCompany.employees.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <Badge variant={selectedCompany.status === "Active" ? "success" : "warning"} className="text-sm">
                {selectedCompany.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
                <div className="flex items-center gap-2 mb-2 text-slate-500">
                  <Target className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Open Positions</span>
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-50">{Math.floor(Math.random() * 40) + 5}</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
                <div className="flex items-center gap-2 mb-2 text-slate-500">
                  <Activity className="h-4 w-4 text-indigo-500" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Hiring Velocity</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-slate-900 dark:text-slate-50">High</div>
                  <span className="text-xs font-medium text-emerald-500 flex items-center"><TrendingUp className="h-3 w-3 mr-1"/> +15%</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-indigo-500" /> AI Company Score & Insights
              </h4>
              <div className="rounded-xl bg-indigo-50 p-5 text-sm text-indigo-900 dark:bg-indigo-900/20 dark:text-indigo-200 border border-indigo-100 dark:border-indigo-800/50 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 shrink-0 rounded-full border-4 border-indigo-200 dark:border-indigo-800 flex items-center justify-center bg-white dark:bg-slate-950">
                    <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">92</span>
                  </div>
                  <div>
                    <h5 className="font-semibold">Exceptional Employer Brand</h5>
                    <p className="text-indigo-700/80 dark:text-indigo-300/80 text-xs mt-1">High retention rate predicted.</p>
                  </div>
                </div>
                <p className="leading-relaxed border-t border-indigo-200/50 dark:border-indigo-800/50 pt-4">
                  <strong>{selectedCompany.name}</strong> shows a strong hiring trajectory in the <strong>{selectedCompany.industry}</strong> sector. 
                  Recent sentiment analysis on job postings suggests a strategic shift towards AI and Machine Learning roles. 
                  Recommended action: Proactively source candidates with specialized ML engineering skills to meet upcoming demand.
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">View Jobs</Button>
              <Button variant="outline" className="flex-1">Edit Details</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
