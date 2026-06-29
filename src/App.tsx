/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { ThemeProvider } from './context/ThemeContext';
import { AdminLayout } from './components/layout/AdminLayout';
import { Dashboard } from './pages/Dashboard';
import { Candidates } from './pages/Candidates';
import { Jobs } from './pages/Jobs';
import { Companies } from './pages/Companies';
import { Interviews } from './pages/Interviews';
import { Applications } from './pages/Applications';
import { ApplicationBoard } from './pages/ApplicationBoard';
import { Analytics } from './pages/Analytics';
import { SystemHealth } from './pages/SystemHealth';
import { Security } from './pages/Security';
import { AuditLogs } from './pages/AuditLogs';
import { Settings } from './pages/Settings';
import { CalendarView } from './pages/CalendarView';
import { DocumentCenter } from './pages/DocumentCenter';
import { Reports } from './pages/Reports';
import { ExecutiveDashboard } from './pages/ExecutiveDashboard';

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="hrms-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/executive" element={<ExecutiveDashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/board" element={<ApplicationBoard />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/documents" element={<DocumentCenter />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/health" element={<SystemHealth />} />
            <Route path="/security" element={<Security />} />
            <Route path="/audit" element={<AuditLogs />} />
            <Route path="/settings" element={<Settings />} />
            {/* Catch-all for non-implemented routes in this mock */}
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center h-[60vh]">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-muted-foreground text-lg mb-8">Page not found or under construction.</p>
                <Navigate to="/" replace />
              </div>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
