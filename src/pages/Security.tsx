import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ShieldCheck, UserCog, Lock, Key, Smartphone, AlertTriangle, Fingerprint, BrainCircuit, Globe, RefreshCcw, MapPin } from "lucide-react";
import { motion } from "motion/react";

const ROLES = [
  { id: "R1", name: "Super Admin", level: 4, users: 2, description: "Full system access including infrastructure settings." },
  { id: "R2", name: "HR Manager", level: 3, users: 14, description: "Manage jobs, companies, and view all applications." },
  { id: "R3", name: "Recruiter", level: 2, users: 45, description: "Manage specific pipelines, schedule interviews." },
  { id: "R4", name: "Interviewer", level: 1, users: 120, description: "View assigned candidate profiles and submit feedback." },
];

const ACTIVE_SESSIONS = [
  { id: "S1", user: "Sarah Connor (HR Manager)", device: "MacBook Pro 16\"", location: "San Francisco, US (IP: 192.168.1.45)", browser: "Chrome 120.0", status: "Active Now", risk: "Low" },
  { id: "S2", user: "John Smith (Recruiter)", device: "iPhone 14 Pro", location: "New York, US (IP: 10.0.4.12)", browser: "Safari Mobile", status: "Active Now", risk: "Low" },
  { id: "S3", user: "Admin Account", device: "Unknown Device", location: "St. Petersburg, RU (IP: 45.33.22.1)", browser: "Firefox 115.0", status: "Terminated", risk: "Critical" },
];

export function Security() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="show">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Security & RBAC Command Center</h2>
          <p className="text-slate-500">Manage Role-Based Access Control, JWT architecture, and AI threat detection.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-slate-600 dark:text-slate-300">
            <RefreshCcw className="mr-2 h-4 w-4" /> Rotate Keys
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
            <UserCog className="mr-2 h-4 w-4" /> Create New Role
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={itemVariants}>
          <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <ShieldCheck className="h-24 w-24" />
            </div>
            <ShieldCheck className="h-6 w-6 text-emerald-500 mb-3 relative z-10" />
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider relative z-10">MFA Enforcement</h3>
            <div className="mt-2 flex items-center justify-between relative z-10">
              <Badge variant="success" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">Strict</Badge>
              <p className="text-xs text-slate-400 font-medium">Req. Level 3+</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Key className="h-24 w-24" />
            </div>
            <Key className="h-6 w-6 text-indigo-500 mb-3 relative z-10" />
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider relative z-10">JWT Architecture</h3>
            <div className="mt-2 flex items-center justify-between relative z-10">
              <p className="text-xl font-bold font-mono">15m / 7d</p>
              <p className="text-xs text-slate-400 font-medium">Access / Refresh</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Lock className="h-24 w-24" />
            </div>
            <Lock className="h-6 w-6 text-blue-500 mb-3 relative z-10" />
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider relative z-10">Session Timeout</h3>
            <div className="mt-2 flex items-center justify-between relative z-10">
              <p className="text-xl font-bold font-mono">45 Mins</p>
              <p className="text-xs text-slate-400 font-medium">Idle Auto-Logout</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-5 bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity text-rose-500">
              <BrainCircuit className="h-24 w-24" />
            </div>
            <div className="flex items-center gap-2 mb-3 relative z-10">
              <BrainCircuit className="h-6 w-6 text-rose-500" />
              <div className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse"></div>
            </div>
            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-400 uppercase tracking-wider relative z-10">AI Threat Monitor</h3>
            <div className="mt-2 flex items-center justify-between relative z-10">
              <p className="text-xl font-bold text-rose-700 dark:text-rose-300">1 Anomaly</p>
              <p className="text-xs text-rose-500 font-medium border-b border-rose-500 cursor-pointer">View Logs</p>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={itemVariants}>
          <Card className="h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-indigo-500" /> Defined Roles & Access Levels
              </CardTitle>
              <CardDescription>Current role hierarchy deployed in the enterprise environment.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto custom-scrollbar">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ROLES.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-semibold text-slate-900 dark:text-slate-100">{role.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono bg-slate-50 dark:bg-slate-800">L{role.level}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{role.users}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="text-indigo-600 dark:text-indigo-400">Manage</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-indigo-500" /> Active Device Sessions
              </CardTitle>
              <CardDescription>AI-monitored device sessions and geolocation tracking.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto custom-scrollbar">
              <div className="space-y-4">
                {ACTIVE_SESSIONS.map((session) => (
                  <div key={session.id} className={`p-4 rounded-xl border ${session.risk === 'Critical' ? 'bg-rose-50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/50' : 'bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">{session.user}</div>
                      <Badge variant={session.risk === 'Critical' ? 'destructive' : 'outline'} className={session.risk === 'Critical' ? '' : 'bg-white dark:bg-slate-900'}>
                        {session.risk === 'Critical' ? 'Critical Risk' : session.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5"><Smartphone className="h-3.5 w-3.5" /> {session.device}</div>
                      <div className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> {session.browser}</div>
                      <div className="flex items-center gap-1.5 col-span-2"><MapPin className="h-3.5 w-3.5" /> {session.location}</div>
                    </div>
                    {session.risk === 'Critical' && (
                      <div className="mt-3 pt-3 border-t border-rose-200 dark:border-rose-900/50 flex items-center justify-between">
                        <div className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" /> Impossible travel anomaly detected.
                        </div>
                        <Button size="sm" variant="destructive" className="h-7 text-xs">Revoke Session</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
