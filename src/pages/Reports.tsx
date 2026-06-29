import React, { useState } from "react";
import { Download, FileText, PieChart as PieChartIcon, Filter, Calendar, Users, BarChart2, TrendingUp, Search, Save, LayoutGrid, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const HIRING_DATA = [
  { name: "Jan", applicants: 400, interviewed: 240, hired: 24 },
  { name: "Feb", applicants: 300, interviewed: 139, hired: 22 },
  { name: "Mar", applicants: 200, interviewed: 980, hired: 22 },
  { name: "Apr", applicants: 278, interviewed: 390, hired: 20 },
  { name: "May", applicants: 189, interviewed: 480, hired: 21 },
  { name: "Jun", applicants: 239, interviewed: 380, hired: 25 },
  { name: "Jul", applicants: 349, interviewed: 430, hired: 21 },
];

const DIVERSITY_DATA = [
  { name: 'Engineering', female: 45, male: 50, nonbinary: 5 },
  { name: 'Product', female: 60, male: 35, nonbinary: 5 },
  { name: 'Design', female: 70, male: 25, nonbinary: 5 },
  { name: 'Sales', female: 50, male: 45, nonbinary: 5 },
];

const PERFORMANCE_DATA = [
  { name: 'Time to Hire', value: 24, label: 'Days' },
  { name: 'Offer Acceptance', value: 85, label: '%' },
  { name: 'Cost per Hire', value: 4500, label: '$' },
  { name: 'Retention 1Y', value: 92, label: '%' },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function Reports() {
  const [reportType, setReportType] = useState("hiring");
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(true); // Default to true for demo purposes

  const handleGenerate = () => {
    setIsGenerating(true);
    setReportGenerated(false);
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
    }, 1500);
  };

  const renderReportContent = () => {
    if (isGenerating) {
      return (
        <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8 space-y-4">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Crunching Data...</h3>
          <p className="text-sm text-slate-500 max-w-sm">Our AI is aggregating millions of data points across your enterprise infrastructure to build this custom report.</p>
        </div>
      );
    }

    if (!reportGenerated) {
      return (
        <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8 max-w-md mx-auto">
          <div className="mx-auto w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
            <LayoutGrid className="h-10 w-10 text-indigo-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">Custom Report Builder</h3>
          <p className="text-slate-500 mb-8 leading-relaxed">Select your data source, apply advanced filters, and click generate to build a dynamic enterprise report.</p>
          <Button size="lg" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700" onClick={handleGenerate}>
            Generate Live Report
          </Button>
        </div>
      );
    }

    if (reportType === "hiring") {
      return (
        <div className="p-6 space-y-8 animate-in fade-in duration-500">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Enterprise Hiring Pipeline</h3>
              <p className="text-sm text-slate-500 mt-1">Generated on {new Date().toLocaleDateString()} • {dateRange}</p>
            </div>
            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800/50">
              <TrendingUp className="mr-1.5 h-3 w-3" /> +14% YoY
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-slate-50 dark:bg-slate-900/50 border-none shadow-none p-4">
              <div className="text-sm font-medium text-slate-500 mb-1">Total Applicants</div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">2,054</div>
              <div className="text-xs text-emerald-600 mt-1">↑ 12% vs previous period</div>
            </Card>
            <Card className="bg-slate-50 dark:bg-slate-900/50 border-none shadow-none p-4">
              <div className="text-sm font-medium text-slate-500 mb-1">Interviews Conducted</div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">845</div>
              <div className="text-xs text-emerald-600 mt-1">↑ 8% vs previous period</div>
            </Card>
            <Card className="bg-slate-50 dark:bg-slate-900/50 border-none shadow-none p-4">
              <div className="text-sm font-medium text-slate-500 mb-1">Offers Accepted</div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">134</div>
              <div className="text-xs text-emerald-600 mt-1">↑ 24% vs previous period</div>
            </Card>
          </div>

          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HIRING_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorApplicants" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHired" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 500, fontSize: '13px' }}
                />
                <Area type="monotone" dataKey="applicants" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorApplicants)" />
                <Area type="monotone" dataKey="hired" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorHired)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead className="text-right">Applicants</TableHead>
                    <TableHead className="text-right">Interviews</TableHead>
                    <TableHead className="text-right">Hires</TableHead>
                    <TableHead className="text-right">Conversion Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {HIRING_DATA.slice(-4).map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell className="text-right font-mono text-sm text-slate-600">{row.applicants.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-mono text-sm text-slate-600">{row.interviewed.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-mono text-sm text-slate-600">{row.hired.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-mono text-sm font-semibold text-indigo-600">
                        {((row.hired / row.applicants) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </h4>
          </div>
        </div>
      );
    }
    
    if (reportType === "diversity") {
      return (
        <div className="p-6 space-y-8 animate-in fade-in duration-500">
           <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Diversity & Inclusion Breakdown</h3>
              <p className="text-sm text-slate-500 mt-1">Generated on {new Date().toLocaleDateString()} • {dateRange}</p>
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DIVERSITY_DATA} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#0f172a', fontWeight: 500}} width={100} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Legend />
                <Bar dataKey="female" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} name="Female (%)" />
                <Bar dataKey="male" stackId="a" fill="#94a3b8" radius={[0, 0, 0, 0]} name="Male (%)" />
                <Bar dataKey="nonbinary" stackId="a" fill="#10b981" radius={[0, 4, 4, 0]} name="Non-Binary (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6 h-full flex items-center justify-center text-slate-500">
        Report visualization for {reportType} is not fully configured yet.
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Report Builder</h2>
          <p className="text-slate-500">Generate, customize, and export advanced HR analytics reports.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            <Save className="mr-2 h-4 w-4" /> Save Template
          </Button>
          <Button variant="outline" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
            <FileText className="mr-2 h-4 w-4" /> Generate PDF Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-1 space-y-4">
          <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800/50">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <LayoutGrid className="h-4 w-4" /> Data Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 pt-4">
              <Button 
                variant="ghost" 
                className={`w-full justify-start font-medium ${reportType === 'hiring' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}`}
                onClick={() => setReportType('hiring')}
              >
                <Users className="mr-2 h-4 w-4" /> Hiring Pipeline
                {reportType === 'hiring' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600"></div>}
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start font-medium ${reportType === 'diversity' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}`}
                onClick={() => setReportType('diversity')}
              >
                <PieChartIcon className="mr-2 h-4 w-4" /> Diversity & Inclusion
                {reportType === 'diversity' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600"></div>}
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start font-medium ${reportType === 'performance' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}`}
                onClick={() => setReportType('performance')}
              >
                <BarChart2 className="mr-2 h-4 w-4" /> Recruiter Performance
                {reportType === 'performance' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600"></div>}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800/50 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" /> Query Builder
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Date Range</label>
                <div className="relative">
                  <select 
                    className="appearance-none flex h-9 w-full items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-sm font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>This Quarter</option>
                    <option>This Year</option>
                    <option>Custom Range</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Department</label>
                <div className="relative">
                  <select className="appearance-none flex h-9 w-full items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-sm font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100">
                    <option>All Departments</option>
                    <option>Engineering</option>
                    <option>Product</option>
                    <option>Design</option>
                    <option>Sales</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Location</label>
                <div className="relative">
                  <select className="appearance-none flex h-9 w-full items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-sm font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100">
                    <option>Global (All)</option>
                    <option>San Francisco, CA</option>
                    <option>New York, NY</option>
                    <option>London, UK</option>
                    <option>Remote</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="pt-2">
                <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200 shadow-sm" onClick={handleGenerate}>
                  Apply Filters & Refresh
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-3">
          <Card className="h-full shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-[600px] flex flex-col overflow-hidden">
            {renderReportContent()}
          </Card>
        </div>
      </div>
    </div>
  );
}
