import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ExportImportButtons } from "@/components/ui/export-import-buttons";

// Generate 100+ mock audit logs deterministically
const generateMockAuditLogs = () => {
  const events = [
    { event: "Role Updated", severity: "medium", detailTemplate: "User ID: {id} → Role: {role}" },
    { event: "Export Triggered", severity: "low", detailTemplate: "{file} downloaded" },
    { event: "Login Successful", severity: "info", detailTemplate: "{user} via JWT Auth" },
    { event: "Failed Login Attempt", severity: "high", detailTemplate: "Invalid credentials provided {n} times" },
    { event: "Job Posted", severity: "info", detailTemplate: "{job} (ID: JOB-{id})" },
    { event: "Permission Denied", severity: "medium", detailTemplate: "Attempted to access {path}" },
    { event: "System Backup", severity: "info", detailTemplate: "Automated daily pg_dump completed" },
    { event: "API Key Generated", severity: "medium", detailTemplate: "Key generated for {user}" },
    { event: "Candidate Rejected", severity: "low", detailTemplate: "Candidate {id} status changed to Rejected" },
    { event: "Password Reset", severity: "medium", detailTemplate: "Password reset flow initiated for {user}" }
  ];
  const users = ["Alexander Voss", "Marcus Chen", "System (Agent)", "Unknown", "Linda Grey", "Sarah Miller", "System", "David Kim", "Emily Clark", "Michael Owen"];
  const ips = ["192.168.1.45", "10.0.0.12", "172.16.0.4", "45.22.11.9", "192.168.1.104", "10.0.1.55", "localhost", "192.168.2.11", "8.8.8.8"];

  const logs = [];
  let time = new Date("2026-10-24T14:21:05");
  
  for (let i = 1; i <= 105; i++) {
    const eventType = events[i % events.length];
    const user = users[i % users.length];
    let details = eventType.detailTemplate;
    
    // Simple template replacement
    details = details.replace("{id}", `00${4800 + i}`);
    details = details.replace("{role}", i % 2 === 0 ? "HR_MANAGER" : "RECRUITER");
    details = details.replace("{file}", i % 2 === 0 ? "Candidate_Data.csv" : "Diversity_Report.pdf");
    details = details.replace("{user}", user);
    details = details.replace("{n}", String((i % 5) + 1));
    details = details.replace("{job}", "Senior Software Engineer");
    details = details.replace("{path}", i % 2 === 0 ? "/api/v1/billing" : "/api/v1/users/delete");

    logs.push({
      id: `LOG-${i.toString().padStart(3, '0')}`,
      time: time.toISOString().substring(11, 19),
      date: time.toISOString().substring(0, 10),
      event: eventType.event,
      user: user,
      details: details,
      severity: eventType.severity,
      ip: ips[i % ips.length]
    });
    
    // Decrement time by random amount of minutes (1-15)
    time = new Date(time.getTime() - (Math.floor(Math.random() * 15) + 1) * 60000);
  }
  return logs;
};

const MOCK_AUDIT_LOGS = generateMockAuditLogs();

export function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLogs = MOCK_AUDIT_LOGS.filter(log => 
    log.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.ip.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Audit Logs</h2>
          <p className="text-slate-500">Immutable chronological record of system events, access, and modifications.</p>
        </div>
        <ExportImportButtons data={MOCK_AUDIT_LOGS} filename="audit-logs" />
      </div>

      <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[calc(100vh-200px)] min-h-[600px]">
        <CardHeader className="px-0 pt-0 pb-4 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Event Stream</CardTitle>
            <CardDescription>Showing all recorded events across the platform.</CardDescription>
          </div>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search logs, IPs, users..." 
              className="pl-9 h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0 overflow-auto flex-1 mt-4 custom-scrollbar">
          <Table>
            <TableHeader className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-10 shadow-sm">
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="w-[120px]">Date/Time</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead className="text-right">Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <TableCell className="font-mono text-xs font-semibold text-slate-500">{log.id}</TableCell>
                  <TableCell>
                    <div className="font-mono text-xs text-slate-500">{log.time}</div>
                    <div className="text-[10px] text-slate-400">{log.date}</div>
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900 dark:text-slate-100">{log.event}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell className="text-slate-500 font-mono text-xs max-w-[300px] truncate" title={log.details}>{log.details}</TableCell>
                  <TableCell className="font-mono text-xs text-slate-400">{log.ip}</TableCell>
                  <TableCell className="text-right">
                    <SeverityBadge severity={log.severity} />
                  </TableCell>
                </TableRow>
              ))}
              {filteredLogs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-slate-500">
                    No logs found matching "{searchQuery}"
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  switch (severity) {
    case "high": return <Badge variant="destructive">High</Badge>;
    case "medium": return <Badge variant="warning">Medium</Badge>;
    case "low": return <Badge variant="secondary">Low</Badge>;
    default: return <Badge variant="outline" className="bg-slate-50 dark:bg-slate-800">Info</Badge>;
  }
}
