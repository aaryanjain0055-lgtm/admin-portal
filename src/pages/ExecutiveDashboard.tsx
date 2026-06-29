import React from "react";
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Target,
  BrainCircuit,
  BarChart4
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, LineChart, Line, ComposedChart
} from "recharts";

const REVENUE_IMPACT_DATA = [
  { month: "Jan", revenue: 4000, hires: 24, cost: 2400 },
  { month: "Feb", revenue: 3000, hires: 13, cost: 1398 },
  { month: "Mar", revenue: 2000, hires: 98, cost: 9800 },
  { month: "Apr", revenue: 2780, hires: 39, cost: 3908 },
  { month: "May", revenue: 1890, hires: 48, cost: 4800 },
  { month: "Jun", revenue: 2390, hires: 38, cost: 3800 },
  { month: "Jul", revenue: 3490, hires: 43, cost: 4300 },
];

const DEPT_PERFORMANCE = [
  { name: "Engineering", current: 85, target: 100, costPerHire: 12500 },
  { name: "Sales", current: 45, target: 50, costPerHire: 8400 },
  { name: "Marketing", current: 20, target: 30, costPerHire: 6200 },
  { name: "Product", current: 15, target: 20, costPerHire: 11000 },
  { name: "Support", current: 60, target: 60, costPerHire: 4500 },
];

export function ExecutiveDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Executive Dashboard</h2>
          <p className="text-slate-500">High-level KPIs, budget tracking, and recruitment ROI.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800 py-1.5 px-3">
            <BrainCircuit className="mr-2 h-3.5 w-3.5" />
            AI Summary Generated
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Hiring Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">$2.4M</div>
            <p className="text-xs flex items-center mt-1 text-rose-500 font-medium">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +12% from last year
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Cost Per Hire</CardTitle>
            <Target className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">$8,450</div>
            <p className="text-xs flex items-center mt-1 text-emerald-500 font-medium">
              <ArrowDownRight className="mr-1 h-3 w-3" /> -4.3% from last quarter
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Offer Acceptance</CardTitle>
            <Users className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">78.5%</div>
            <p className="text-xs flex items-center mt-1 text-emerald-500 font-medium">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +2.1% from last quarter
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Time to Hire</CardTitle>
            <Briefcase className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">34 Days</div>
            <p className="text-xs flex items-center mt-1 text-rose-500 font-medium">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +3 days from last year
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <CardTitle>Recruitment ROI & Cost</CardTitle>
            <CardDescription>Estimated revenue impact vs total recruitment cost</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={REVENUE_IMPACT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-slate-200)" className="dark:stroke-slate-800" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--color-slate-500)" }} dy={10} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--color-slate-500)" }} tickFormatter={(val) => `$${val/1000}k`} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--color-slate-500)" }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-slate-200)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '12px' }}
                    labelStyle={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--color-slate-900)' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                  <Bar yAxisId="left" dataKey="revenue" name="Est. Revenue ($)" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={30} />
                  <Line yAxisId="left" type="monotone" dataKey="cost" name="Cost ($)" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, fill: "#f43f5e" }} />
                  <Area yAxisId="right" type="monotone" dataKey="hires" name="Total Hires" fill="#10b981" stroke="#10b981" fillOpacity={0.1} strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Hiring target progress by business unit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {DEPT_PERFORMANCE.map((dept) => {
                const progress = (dept.current / dept.target) * 100;
                return (
                  <div key={dept.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-900 dark:text-slate-100">{dept.name}</span>
                      <span className="text-slate-500">{dept.current} / {dept.target} hires</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div 
                        className={cn("h-full rounded-full transition-all duration-1000 ease-in-out", 
                          progress > 80 ? "bg-emerald-500" : progress > 40 ? "bg-indigo-500" : "bg-amber-500"
                        )}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Avg Cost: ${dept.costPerHire.toLocaleString()}</span>
                      <span>{Math.round(progress)}% of Target</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-indigo-950 border-indigo-900 shadow-md text-indigo-50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="p-3 bg-indigo-900 rounded-xl">
              <BrainCircuit className="h-8 w-8 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">AI Executive Summary</h3>
              <p className="text-sm text-indigo-200 leading-relaxed">
                Overall recruitment health is strong, with <strong>Engineering</strong> leading in hiring velocity. 
                However, <strong>cost per hire in Product</strong> is tracking 15% above the industry average. 
                The AI model predicts that increasing remote roles for Sales could reduce time-to-hire by 12 days and lower costs by 20%. 
                Offer acceptance rate remains high (78.5%), primarily driven by competitive compensation adjustments made in Q1.
              </p>
              <div className="mt-4 flex gap-3">
                <Badge variant="outline" className="border-indigo-700 bg-indigo-900 text-indigo-300 hover:bg-indigo-800 cursor-pointer">
                  View Cost Analysis
                </Badge>
                <Badge variant="outline" className="border-indigo-700 bg-indigo-900 text-indigo-300 hover:bg-indigo-800 cursor-pointer">
                  View Compensation Report
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
