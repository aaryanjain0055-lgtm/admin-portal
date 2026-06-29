import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { delay } from "@/data/mock";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const markers = [
  { markerOffset: -15, name: "San Francisco (HQ)", coordinates: [-122.4194, 37.7749] },
  { markerOffset: 15, name: "New York Hub", coordinates: [-74.0060, 40.7128] },
  { markerOffset: -15, name: "London Office", coordinates: [-0.1276, 51.5072] },
  { markerOffset: 15, name: "Berlin Hub", coordinates: [13.4050, 52.5200] },
  { markerOffset: -15, name: "Tokyo Office", coordinates: [139.6917, 35.6895] },
];

const ATS_DATA = [
  { name: 'Jan', score: 65, volume: 400 },
  { name: 'Feb', score: 70, volume: 550 },
  { name: 'Mar', score: 68, volume: 480 },
  { name: 'Apr', score: 75, volume: 600 },
  { name: 'May', score: 82, volume: 750 },
  { name: 'Jun', score: 85, volume: 820 },
];

const SKILL_GAP_DATA = [
  { name: 'React', current: 70, required: 90 },
  { name: 'Node.js', current: 65, required: 85 },
  { name: 'Cloud', current: 50, required: 80 },
  { name: 'System Design', current: 40, required: 75 },
];

const AI_RECOMMENDATION_DATA = [
  { name: 'Strong Match', value: 400 },
  { name: 'Good Match', value: 300 },
  { name: 'Potential Match', value: 300 },
  { name: 'Poor Match', value: 200 },
];
const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#ef4444'];

export function Analytics() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      await delay(1000);
      setLoading(false);
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">AI Command Center</h2>
          <p className="text-slate-500">Advanced AI-driven insights, talent pool matching, and global pipeline metrics.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm md:col-span-2">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg">Global Hiring Distribution</CardTitle>
            <CardDescription>Interactive map showing candidate and office locations worldwide.</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0 flex justify-center">
             {loading ? <Skeleton className="h-[400px] w-full" /> : (
              <div className="h-[400px] w-full max-w-4xl bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <ComposableMap projectionConfig={{ scale: 140 }}>
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="var(--color-slate-200)"
                          stroke="var(--color-slate-300)"
                          className="dark:fill-slate-800 dark:stroke-slate-700"
                        />
                      ))
                    }
                  </Geographies>
                  {markers.map(({ name, coordinates, markerOffset }) => (
                    <Marker key={name} coordinates={coordinates as [number, number]}>
                      <circle r={6} fill="#6366f1" stroke="#fff" strokeWidth={2} />
                      <text
                        textAnchor="middle"
                        y={markerOffset}
                        style={{ fontFamily: "Inter", fill: "var(--color-slate-700)", fontSize: "10px", fontWeight: "bold" }}
                        className="dark:fill-slate-300"
                      >
                        {name}
                      </text>
                    </Marker>
                  ))}
                </ComposableMap>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg">ATS Score Trend</CardTitle>
            <CardDescription>Average AI-assigned ATS match scores over time.</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            {loading ? <Skeleton className="h-[300px] w-full" /> : (
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ATS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-slate-200)" className="dark:stroke-slate-800" />
                    <XAxis dataKey="name" stroke="var(--color-slate-400)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="left" stroke="var(--color-slate-400)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="right" orientation="right" stroke="var(--color-slate-400)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "#020617", borderColor: "#1e293b", borderRadius: "8px", color: "white" }} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="score" name="Avg ATS Score" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line yAxisId="right" type="monotone" dataKey="volume" name="Application Volume" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg">AI Recommendation Distribution</CardTitle>
            <CardDescription>Categorization of candidates based on AI matching algorithms.</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            {loading ? <Skeleton className="h-[300px] w-full" /> : (
              <div className="h-[300px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={AI_RECOMMENDATION_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {AI_RECOMMENDATION_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#020617", borderColor: "#1e293b", borderRadius: "8px", color: "white" }} />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm md:col-span-2">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg">Skill Gap Analysis</CardTitle>
            <CardDescription>Current talent pool capability vs. enterprise requirements.</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
             {loading ? <Skeleton className="h-[300px] w-full" /> : (
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SKILL_GAP_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-slate-200)" className="dark:stroke-slate-800" />
                    <XAxis type="number" stroke="var(--color-slate-400)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis type="category" dataKey="name" stroke="var(--color-slate-400)" fontSize={12} tickLine={false} axisLine={false} width={100} />
                    <Tooltip contentStyle={{ backgroundColor: "#020617", borderColor: "#1e293b", borderRadius: "8px", color: "white" }} cursor={{fill: 'var(--color-slate-100)', opacity: 0.4}} className="dark:!fill-slate-800"/>
                    <Legend />
                    <Bar dataKey="current" name="Current Pool Capability" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
                    <Bar dataKey="required" name="Required Capability" fill="#f43f5e" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
