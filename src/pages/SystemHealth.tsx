import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Database, Server, Cpu, Terminal, Webhook, Zap, Clock, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const API_USAGE_DATA = [
  { time: "00:00", requests: 1240 },
  { time: "04:00", requests: 850 },
  { time: "08:00", requests: 3450 },
  { time: "12:00", requests: 5680 },
  { time: "16:00", requests: 4890 },
  { time: "20:00", requests: 2100 },
  { time: "24:00", requests: 1100 },
];

const WEBHOOKS = [
  { id: 1, name: "Workday Sync", url: "https://api.workday.com/v1/sync", status: "Healthy", lastTriggered: "2 mins ago", successRate: "99.9%" },
  { id: 2, name: "Slack Notifications", url: "https://hooks.slack.com/services/T0...", status: "Healthy", lastTriggered: "15 secs ago", successRate: "100%" },
  { id: 3, name: "Greenhouse Export", url: "https://api.greenhouse.io/v1/export", status: "Failing", lastTriggered: "1 hour ago", successRate: "45.2%" },
];

const MOCK_LOGS = [
  "[2026-10-24 14:32:01] INFO: HTTP POST /api/v1/candidates 201 Created (42ms)",
  "[2026-10-24 14:32:05] WARN: Rate limit approaching for tenant_id: 8f92a",
  "[2026-10-24 14:32:12] INFO: Worker #4 finished job process_resumes (1200ms)",
  "[2026-10-24 14:32:18] ERROR: Webhook delivery failed for Greenhouse Export (Timeout)",
  "[2026-10-24 14:32:22] INFO: Database connection pool scaled to 45 active connections",
];

export function SystemHealth() {
  const [logs, setLogs] = useState<string[]>(MOCK_LOGS);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLogs = [...logs];
      if (newLogs.length > 8) newLogs.shift();
      newLogs.push(`[${new Date().toISOString().replace('T', ' ').substring(0, 19)}] INFO: Heartbeat check OK (${Math.floor(Math.random() * 50) + 10}ms)`);
      setLogs(newLogs);
    }, 3000);
    return () => clearInterval(interval);
  }, [logs]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">System Health</h2>
          <p className="text-slate-500">Monitor enterprise infrastructure, API latency, webhooks, and service status.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
             <RefreshCw className="mr-2 h-4 w-4" /> Run Diagnostics
           </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <HealthCard title="API Gateway" status="Operational" latency="124ms" icon={Activity} color="text-emerald-500" bg="bg-emerald-500/10" border="border-emerald-200 dark:border-emerald-900/50" />
        <HealthCard title="PostgreSQL Main" status="Operational" latency="42ms" icon={Database} color="text-emerald-500" bg="bg-emerald-500/10" border="border-emerald-200 dark:border-emerald-900/50" />
        <HealthCard title="AI Inference Engine" status="Degraded" latency="1450ms" icon={Cpu} color="text-amber-500" bg="bg-amber-500/10" border="border-amber-200 dark:border-amber-900/50" />
        <HealthCard title="Storage Node A" status="Operational" latency="12ms" icon={Server} color="text-emerald-500" bg="bg-emerald-500/10" border="border-emerald-200 dark:border-emerald-900/50" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <CardHeader className="px-0 pt-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2"><Zap className="h-5 w-5 text-indigo-500" /> API Usage (24h)</CardTitle>
                <CardDescription>Global request volume across all regions.</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold font-mono">19,280</div>
                <div className="text-xs text-slate-500">Total Requests</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-0 pb-0 flex-1 min-h-[250px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={API_USAGE_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 500, fontSize: '13px' }}
                />
                <Area type="monotone" dataKey="requests" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRequests)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg">System Metrics</CardTitle>
            <CardDescription>Real-time resource utilization.</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0 space-y-6 mt-4">
            <MetricBar label="CPU Utilization (Global)" value={42} color="bg-indigo-500" />
            <MetricBar label="Memory Usage (Cluster A)" value={78} color="bg-amber-500" />
            <MetricBar label="Storage Capacity (SSD Vol 1)" value={91} color="bg-rose-500" />
            <MetricBar label="Network IO (Inbound)" value={24} color="bg-emerald-500" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
         <Card className="p-0 bg-slate-950 border-slate-900 shadow-lg overflow-hidden flex flex-col font-mono text-xs text-slate-300">
           <div className="flex items-center gap-2 p-3 bg-slate-900 border-b border-slate-800">
             <Terminal className="h-4 w-4 text-slate-400" />
             <span className="font-semibold text-slate-400">Live System Logs</span>
             <div className="ml-auto flex gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
             </div>
           </div>
           <div className="p-4 space-y-2 h-[250px] overflow-y-auto custom-scrollbar flex flex-col justify-end">
             {logs.map((log, i) => (
               <div key={i} className={`${log.includes('ERROR') ? 'text-rose-400' : log.includes('WARN') ? 'text-amber-400' : 'text-slate-300'}`}>
                 {log}
               </div>
             ))}
             <div className="flex items-center gap-2 mt-2">
               <span className="text-emerald-500 animate-pulse">_</span>
             </div>
           </div>
         </Card>

         <Card className="p-0 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
           <div className="flex items-center gap-2 p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
             <Webhook className="h-5 w-5 text-indigo-500" />
             <div>
               <h3 className="font-semibold text-slate-900 dark:text-slate-100">Configured Webhooks</h3>
               <p className="text-xs text-slate-500">Status of external event integrations</p>
             </div>
           </div>
           <div className="p-0 overflow-y-auto custom-scrollbar flex-1">
             <div className="divide-y divide-slate-100 dark:divide-slate-800">
               {WEBHOOKS.map((hook) => (
                 <div key={hook.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                   <div className="flex-1 min-w-0 pr-4">
                     <div className="flex items-center gap-2 mb-1">
                       <h4 className="font-medium text-slate-900 dark:text-slate-100">{hook.name}</h4>
                       <Badge variant={hook.status === 'Healthy' ? 'success' : 'destructive'} className="text-[10px] h-5 px-1.5">{hook.status}</Badge>
                     </div>
                     <p className="text-xs font-mono text-slate-500 truncate">{hook.url}</p>
                     <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                       <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {hook.lastTriggered}</span>
                       <span className="flex items-center gap-1"><Activity className="h-3 w-3" /> {hook.successRate}</span>
                     </div>
                   </div>
                   <Button variant="ghost" size="sm" className="shrink-0 text-indigo-600 dark:text-indigo-400">Edit</Button>
                 </div>
               ))}
             </div>
           </div>
         </Card>
      </div>
    </div>
  );
}

function HealthCard({ title, status, latency, icon: Icon, color, bg, border }: any) {
  return (
    <Card className={`p-5 bg-white dark:bg-slate-900 border ${border || 'border-slate-200 dark:border-slate-800'} shadow-sm relative overflow-hidden group hover:shadow-md transition-all`}>
      <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="h-24 w-24" />
      </div>
      <div className="flex justify-between items-start relative z-10">
        <div className={`p-2 rounded-lg ${bg} ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex flex-col items-end">
          <span className={`text-xs font-bold uppercase ${color}`}>{status}</span>
          <span className="text-xs text-slate-500 mt-1 font-mono">{latency}</span>
        </div>
      </div>
      <div className="mt-4 relative z-10">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      </div>
    </Card>
  );
}

function MetricBar({ label, value, color }: any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-sm font-mono font-bold text-slate-900 dark:text-slate-100">{value}%</span>
      </div>
      <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}
