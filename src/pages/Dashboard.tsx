import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Briefcase,
  DollarSign,
  Calendar,
  Activity,
  ArrowUpRight,
  TrendingUp,
  BrainCircuit,
  Target
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Cell
} from "recharts";
import {
  MOCK_DASHBOARD_STATS,
  MOCK_REVENUE_DATA,
  MOCK_HIRING_TRENDS,
  delay,
} from "@/data/mock";
import { formatCurrency, formatNumber, cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

const AI_INSIGHTS = [
  { subject: "Engineering", A: 120, B: 110, fullMark: 150 },
  { subject: "Product", A: 98, B: 130, fullMark: 150 },
  { subject: "Sales", A: 86, B: 130, fullMark: 150 },
  { subject: "Marketing", A: 99, B: 100, fullMark: 150 },
  { subject: "Design", A: 85, B: 90, fullMark: 150 },
  { subject: "HR", A: 65, B: 85, fullMark: 150 },
];

export function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await delay(800); // Fake latency
      setLoading(false);
    };
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Global Dashboard</h2>
          <p className="text-slate-500">
            Overview of your enterprise HR metrics and recruitment activities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800 py-1.5 px-3 cursor-pointer hover:bg-indigo-100 transition-colors">
            <Activity className="mr-2 h-3.5 w-3.5" />
            Live Sync Active
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={itemVariants}>
          <StatCard
            loading={loading}
            title="Total Revenue Impact"
            icon={DollarSign}
            value={formatCurrency(MOCK_DASHBOARD_STATS.totalRevenue)}
            change={MOCK_DASHBOARD_STATS.revenueChange}
            progress={85}
            progressColor="bg-emerald-500"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            loading={loading}
            title="Total Candidates"
            icon={Users}
            value={formatNumber(MOCK_DASHBOARD_STATS.totalCandidates)}
            change={MOCK_DASHBOARD_STATS.candidatesChange}
            progress={65}
            progressColor="bg-indigo-500"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            loading={loading}
            title="Open Jobs"
            icon={Briefcase}
            value={formatNumber(MOCK_DASHBOARD_STATS.openJobs)}
            change={MOCK_DASHBOARD_STATS.jobsChange}
            progress={42}
            progressColor="bg-amber-500"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            loading={loading}
            title="Interviews Scheduled"
            icon={Calendar}
            value={formatNumber(MOCK_DASHBOARD_STATS.interviewsScheduled)}
            change={MOCK_DASHBOARD_STATS.interviewsChange}
            progress={78}
            progressColor="bg-blue-500"
          />
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <motion.div variants={itemVariants} className="lg:col-span-4">
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recruitment Velocity</CardTitle>
                  <CardDescription>Monthly hires vs interview pipeline.</CardDescription>
                </div>
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800" variant="outline">
                  <TrendingUp className="mr-1 h-3 w-3" /> +14.2% MoM
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-[300px] w-full" />
              ) : (
                <div className="h-[300px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={MOCK_REVENUE_DATA}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-slate-200)" className="dark:stroke-slate-800" />
                      <XAxis dataKey="name" stroke="var(--color-slate-400)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                      <YAxis stroke="var(--color-slate-400)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "var(--color-slate-950)", borderRadius: "8px", border: "none", color: "white" }}
                        itemStyle={{ color: "#a5b4fc" }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-3">
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm h-full">
            <CardHeader className="pb-2">
              <CardTitle>Talent Radar</CardTitle>
              <CardDescription>AI skill gap analysis vs market demand.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-[300px] w-full" />
              ) : (
                <div className="h-[300px] w-full mt-4 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={AI_INSIGHTS}>
                      <PolarGrid stroke="var(--color-slate-200)" className="dark:stroke-slate-800" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-slate-500)', fontSize: 11 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                      <Radar name="Internal Talent" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} strokeWidth={2} />
                      <Radar name="Market Demand" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.3} strokeWidth={2} />
                      <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                      <Tooltip contentStyle={{ backgroundColor: "var(--color-slate-950)", borderRadius: "8px", border: "none", color: "white" }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
         <motion.div variants={itemVariants}>
           <Card className="bg-slate-950 border-slate-900 shadow-md text-slate-50 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <BrainCircuit className="h-40 w-40 text-indigo-500" />
            </div>
            <CardContent className="p-8 relative z-10">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <Badge variant="outline" className="border-indigo-500/30 bg-indigo-500/10 text-indigo-300 mb-4 px-3 py-1">
                    AI Predictor
                  </Badge>
                  <h3 className="text-2xl font-bold text-white mb-2">Hiring Target at Risk</h3>
                  <p className="text-slate-400 leading-relaxed max-w-md">
                    Based on current pipeline velocity and historical drop-off rates, the <strong>Q3 Engineering hiring target</strong> is at 74% risk of being missed by 5 headcount.
                  </p>
                </div>
                <div className="mt-8 flex gap-3">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
                    View Mitigation Plan
                  </button>
                  <button className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors border border-slate-700">
                    See Data
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
         </motion.div>
         
         <motion.div variants={itemVariants}>
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm h-full">
            <CardHeader>
              <CardTitle>Department Hiring Trends</CardTitle>
            </CardHeader>
            <CardContent>
               {loading ? (
                <Skeleton className="h-[200px] w-full" />
              ) : (
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MOCK_HIRING_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-slate-200)" className="dark:stroke-slate-800" />
                      <XAxis dataKey="name" stroke="var(--color-slate-400)" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="var(--color-slate-400)" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip
                        cursor={{ fill: "var(--color-slate-100)", className: "dark:fill-slate-800" }}
                        contentStyle={{ backgroundColor: "var(--color-slate-950)", borderRadius: "8px", border: "none", color: "white" }}
                      />
                      <Bar dataKey="hired" name="Hired" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
                      <Bar dataKey="open" name="Open" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={20} className="dark:fill-slate-800" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
         </motion.div>
      </div>
    </motion.div>
  );
}

function StatCard({ title, icon: Icon, value, change, loading, progress = 75, progressColor = "bg-indigo-500" }: any) {
  return (
    <Card className="p-5 border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 relative overflow-hidden group hover:shadow-md transition-shadow">
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-1 w-full" />
        </div>
      ) : (
        <>
          <div className="absolute top-0 right-0 p-4 opacity-5 transition-opacity group-hover:opacity-10">
            <Icon className="h-16 w-16" />
          </div>
          <div className="relative z-10 flex justify-between items-start">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</p>
            <span className={cn(
              "text-xs font-bold px-2 py-1 rounded-md flex items-center",
              change.startsWith("+") ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400" : "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400"
            )}>
              {change.startsWith("+") ? <TrendingUp className="h-3 w-3 mr-1" /> : null}
              {change}
            </span>
          </div>
          <p className="text-3xl font-bold mt-3 text-slate-900 dark:text-slate-50 relative z-10">{value}</p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 mt-5 rounded-full overflow-hidden relative z-10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className={cn("h-full rounded-full", progressColor)} 
            />
          </div>
        </>
      )}
    </Card>
  );
}
