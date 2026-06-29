import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, Users, Building, Video, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Drawer } from "@/components/ui/drawer";

// Generate deterministic mock events
const generateMockEvents = () => {
  const events = [];
  const baseDate = new Date();
  baseDate.setHours(10, 0, 0, 0);

  const titles = [
    "Technical Interview - Sarah Chen",
    "HR Screening - Marcus Johnson",
    "Engineering Sync",
    "Final Round - Emily Davis",
    "Q3 Hiring Planning",
    "Portfolio Review - David Kim",
    "Culture Fit - Alex Voss",
    "Leadership Sync",
    "Candidate Debrief",
    "Onboarding - New Cohort"
  ];

  const types = ["interview", "screening", "internal", "interview", "event", "interview", "interview", "internal", "internal", "event"];

  for (let i = -15; i <= 30; i++) {
    // 0-3 events per day
    const numEvents = Math.floor(Math.abs(Math.sin(i * 12.34)) * 4);
    
    for (let j = 0; j < numEvents; j++) {
      const eventDate = new Date(baseDate);
      eventDate.setDate(eventDate.getDate() + i);
      eventDate.setHours(9 + Math.floor(Math.abs(Math.cos(i * j)) * 8), (j % 2 === 0) ? 0 : 30, 0, 0);
      
      const titleIndex = (Math.abs(i) + j) % titles.length;
      
      events.push({
        id: `EVT-${Math.abs(i * 100 + j)}`,
        title: titles[titleIndex],
        time: `${eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(eventDate.getTime() + 60*60*1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        type: types[titleIndex],
        date: eventDate,
        attendees: ["You", `Guest ${j+1}`, `Recruiter ${j}`],
        description: `Scheduled discussion regarding ${titles[titleIndex].split('-')[0].trim()}`
      });
    }
  }
  return events;
};

const EVENTS = generateMockEvents();

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const getEventsForDay = (day: number) => {
    return EVENTS.filter(e => 
      e.date.getDate() === day && 
      e.date.getMonth() === currentDate.getMonth() && 
      e.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const handleEventClick = (e: React.MouseEvent, event: any) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Calendar</h2>
          <p className="text-slate-500">Manage interviews, meetings, and recruitment events.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-white dark:bg-slate-900" onClick={() => setCurrentDate(new Date())}>
            Today
          </Button>
          <div className="flex items-center rounded-md border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <Button variant="ghost" size="icon" onClick={prevMonth} className="h-9 w-9 rounded-none border-r border-slate-200 dark:border-slate-800">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={nextMonth} className="h-9 w-9 rounded-none">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white ml-2">
            <Plus className="mr-2 h-4 w-4" /> New Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-4 shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <h3 className="font-semibold mb-4 flex items-center text-slate-900 dark:text-slate-100">
              <CalendarIcon className="h-4 w-4 mr-2 text-indigo-500" /> Upcoming
            </h3>
            <div className="space-y-4">
              {EVENTS.filter(e => e.date >= new Date()).slice(0, 4).map((event, i) => (
                <div key={i} className="flex gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 -mx-2 rounded-md transition-colors" onClick={(e) => handleEventClick(e, event)}>
                  <div className="flex flex-col items-center justify-center bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-2 min-w-[50px] text-center border border-indigo-100 dark:border-indigo-800/50">
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase">{event.date.toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-lg font-bold text-indigo-700 dark:text-indigo-300 leading-none mt-0.5">{event.date.getDate()}</span>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{event.title}</h4>
                    <div className="flex items-center mt-1 text-xs text-slate-500 font-medium">
                      <Clock className="h-3 w-3 mr-1 shrink-0" />
                      <span className="truncate">{event.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <h3 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">Calendars</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" defaultChecked className="peer appearance-none w-4 h-4 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 checked:bg-indigo-500 checked:border-indigo-500 transition-all cursor-pointer" />
                  <CheckCircle2 className="h-3 w-3 text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none" />
                </div>
                <span className="text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">Interviews</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" defaultChecked className="peer appearance-none w-4 h-4 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 checked:bg-emerald-500 checked:border-emerald-500 transition-all cursor-pointer" />
                  <CheckCircle2 className="h-3 w-3 text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none" />
                </div>
                <span className="text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">Team Meetings</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" defaultChecked className="peer appearance-none w-4 h-4 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 checked:bg-amber-500 checked:border-amber-500 transition-all cursor-pointer" />
                  <CheckCircle2 className="h-3 w-3 text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none" />
                </div>
                <span className="text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">Events & Holidays</span>
              </label>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="shadow-sm border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[calc(100vh-180px)] min-h-[600px] bg-white dark:bg-slate-900">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-md">
                <button className="px-3 py-1 text-xs font-semibold bg-white dark:bg-slate-950 rounded shadow-sm text-slate-900 dark:text-slate-100">Month</button>
                <button className="px-3 py-1 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Week</button>
                <button className="px-3 py-1 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Day</button>
              </div>
            </div>
            <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="py-2.5 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 flex-1 bg-slate-200 dark:bg-slate-800 gap-[1px]">
              {blanks.map((blank) => (
                <div key={`blank-${blank}`} className="bg-slate-50 dark:bg-slate-900/50 p-2 opacity-50"></div>
              ))}
              {days.map((day) => {
                const dayEvents = getEventsForDay(day);
                const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
                
                return (
                  <div key={day} className="bg-white dark:bg-slate-950 p-2 flex flex-col hover:bg-slate-50 dark:hover:bg-slate-900/80 transition-colors cursor-pointer relative group h-full min-h-[100px]">
                    <div className="flex justify-between items-start mb-1.5">
                      <span className={cn(
                        "text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full transition-colors",
                        isToday ? "bg-indigo-600 text-white" : "text-slate-700 dark:text-slate-300 group-hover:bg-slate-100 dark:group-hover:bg-slate-800"
                      )}>
                        {day}
                      </span>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                      {dayEvents.map((event) => (
                        <div 
                          key={event.id} 
                          onClick={(e) => handleEventClick(e, event)}
                          className={cn(
                            "px-2 py-1 text-[10px] font-semibold rounded truncate border-l-2 cursor-pointer transition-all hover:brightness-95 dark:hover:brightness-110",
                            event.type === 'interview' ? "bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400" :
                            event.type === 'internal' ? "bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" :
                            "bg-amber-50 border-amber-500 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                          )}
                          title={event.title}
                        >
                          {event.time.split(' ')[0]} {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              {/* Fill remaining spaces to complete grid */}
              {Array.from({ length: (7 - ((blanks.length + days.length) % 7)) % 7 }).map((_, i) => (
                <div key={`end-blank-${i}`} className="bg-slate-50 dark:bg-slate-900/50 p-2 opacity-50"></div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Drawer
        title="Event Details"
        description="View event logistics and attendee information."
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {selectedEvent && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">{selectedEvent.title}</h3>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="outline" className={cn(
                    "font-semibold",
                    selectedEvent.type === 'interview' ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-800/50 dark:text-indigo-400" :
                    selectedEvent.type === 'internal' ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-800/50 dark:text-emerald-400" :
                    "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-800/50 dark:text-amber-400"
                  )}>
                    {selectedEvent.type.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" /> Date
                </div>
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                  {selectedEvent.date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Time
                </div>
                <div className="font-semibold text-slate-900 dark:text-slate-100">{selectedEvent.time}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" /> Attendees
              </div>
              <div className="flex -space-x-2 overflow-hidden">
                {selectedEvent.attendees.map((attendee: string, i: number) => (
                  <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 bg-slate-200 dark:bg-slate-800 relative overflow-hidden" title={attendee}>
                    <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${attendee}&backgroundColor=e2e8f0,cbf4c9,c7d2fe,fde047`} alt={attendee} className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-500 z-10">
                  +{selectedEvent.attendees.length}
                </div>
              </div>
            </div>

             <div className="p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/50 dark:bg-indigo-900/10">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-semibold mb-3">
                <Video className="h-5 w-5" /> Meeting Link
              </div>
              <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-2">
                <code className="text-sm font-mono text-slate-600 dark:text-slate-400 px-2 truncate">
                  https://meet.enterprise.com/v/{selectedEvent.id.toLowerCase()}
                </code>
                <Button size="sm" variant="secondary" className="shrink-0 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300">
                  Copy
                </Button>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">Join Meeting</Button>
              <Button variant="outline" className="flex-1 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">Edit Event</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
