import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Search, Plus, MoreHorizontal, Calendar, Star, Paperclip, MessageSquare, Clock, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExportImportButtons } from "@/components/ui/export-import-buttons";
import { MOCK_CANDIDATES } from "@/data/mock";

const INITIAL_COLUMNS = {
  applied: {
    id: "applied",
    title: "Applied",
    candidateIds: MOCK_CANDIDATES.slice(0, 4).map(c => c.id),
  },
  screening: {
    id: "screening",
    title: "Resume Screening",
    candidateIds: MOCK_CANDIDATES.slice(4, 7).map(c => c.id),
  },
  interview: {
    id: "interview",
    title: "Technical Interview",
    candidateIds: MOCK_CANDIDATES.slice(7, 9).map(c => c.id),
  },
  offer: {
    id: "offer",
    title: "Offer",
    candidateIds: MOCK_CANDIDATES.slice(9, 10).map(c => c.id),
  },
};

const COLUMN_ORDER = ["applied", "screening", "interview", "offer"];

// Helpers for mock details
const getPriorityColor = (score: number) => {
  if (score > 90) return "text-rose-500 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20";
  if (score > 80) return "text-amber-500 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20";
  return "text-slate-500 bg-slate-50 dark:bg-slate-500/10 border-slate-200 dark:border-slate-500/20";
};

const getPriorityLabel = (score: number) => {
  if (score > 90) return "High";
  if (score > 80) return "Medium";
  return "Normal";
};

export function ApplicationBoard() {
  const [columns, setColumns] = useState(INITIAL_COLUMNS);
  const [search, setSearch] = useState("");

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceCol = columns[source.droppableId as keyof typeof columns];
    const destCol = columns[destination.droppableId as keyof typeof columns];

    if (sourceCol === destCol) {
      const newCandidateIds = Array.from(sourceCol.candidateIds);
      newCandidateIds.splice(source.index, 1);
      newCandidateIds.splice(destination.index, 0, draggableId);

      setColumns({
        ...columns,
        [sourceCol.id]: {
          ...sourceCol,
          candidateIds: newCandidateIds,
        },
      });
      return;
    }

    // Moving from one list to another
    const startCandidateIds = Array.from(sourceCol.candidateIds);
    startCandidateIds.splice(source.index, 1);
    const newStart = {
      ...sourceCol,
      candidateIds: startCandidateIds,
    };

    const finishCandidateIds = Array.from(destCol.candidateIds);
    finishCandidateIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...destCol,
      candidateIds: finishCandidateIds,
    };

    setColumns({
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    });
  };

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Kanban Board</h2>
          <p className="text-slate-500">Visual pipeline management with drag-and-drop support.</p>
        </div>
        <div className="flex items-center gap-2">
          <ExportImportButtons data={MOCK_CANDIDATES} filename="board-export" />
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search candidate name or role..."
            className="pl-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-slate-500 ml-auto">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-500"></span> High Priority</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500"></span> Medium Priority</span>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 h-full items-start">
            {COLUMN_ORDER.map((columnId) => {
              const column = columns[columnId as keyof typeof columns];
              const columnCandidates = column.candidateIds
                .map((candidateId) => MOCK_CANDIDATES.find((c) => c.id === candidateId)!)
                .filter(c => c && (c.name.toLowerCase().includes(search.toLowerCase()) || c.role.toLowerCase().includes(search.toLowerCase())));

              return (
                <div key={column.id} className="flex flex-col w-[340px] shrink-0 h-full max-h-full">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wider">{column.title}</h3>
                    <Badge variant="secondary" className="rounded-full bg-slate-200 dark:bg-slate-800 font-mono">
                      {columnCandidates.length}
                    </Badge>
                  </div>

                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 overflow-y-auto p-2 rounded-xl transition-colors custom-scrollbar ${
                          snapshot.isDraggingOver ? "bg-slate-200/50 dark:bg-slate-800/50" : "bg-slate-100/50 dark:bg-slate-900/50"
                        }`}
                      >
                        <div className="space-y-3">
                          {columnCandidates.map((candidate, index) => {
                            // Generate mock data deterministic from ID
                            const cIdNum = parseInt(candidate.id.replace(/\D/g, '')) || index;
                            const priorityColor = getPriorityColor(candidate.atsScore);
                            const label = cIdNum % 3 === 0 ? "Remote" : cIdNum % 2 === 0 ? "Urgent" : "Internal";
                            const comments = cIdNum % 5;
                            const attachments = cIdNum % 3 + 1;
                            
                            return (
                            <Draggable key={candidate.id} draggableId={candidate.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`p-4 rounded-xl border bg-white dark:bg-slate-950 shadow-sm group cursor-grab active:cursor-grabbing ${
                                    snapshot.isDragging ? "border-indigo-500 shadow-xl rotate-3 scale-105 z-50 ring-2 ring-indigo-500/20" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                                  } transition-all duration-200`}
                                >
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex flex-wrap gap-1.5 mb-1">
                                      <Badge variant="outline" className={`text-[9px] uppercase tracking-wider py-0 h-4 ${priorityColor}`}>
                                        {getPriorityLabel(candidate.atsScore)}
                                      </Badge>
                                      <Badge variant="outline" className="text-[9px] uppercase tracking-wider py-0 h-4 bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400">
                                        {label}
                                      </Badge>
                                    </div>
                                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                                      <MoreHorizontal className="h-4 w-4 text-slate-400" />
                                    </button>
                                  </div>

                                  <div className="flex gap-3 items-center mb-3">
                                    <div className="h-10 w-10 rounded-full overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center border-2 border-white dark:border-slate-950 shadow-sm">
                                      <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${candidate.id}`} alt={candidate.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                      <h4 className="font-semibold text-sm leading-none mb-1 text-slate-900 dark:text-slate-100 truncate">{candidate.name}</h4>
                                      <p className="text-xs text-slate-500 truncate">{candidate.role}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/50">
                                    <div className="flex items-center gap-3 text-xs text-slate-400">
                                      <div className="flex items-center gap-1 tooltip-trigger" title="Comments">
                                        <MessageSquare className="h-3.5 w-3.5" />
                                        <span>{comments}</span>
                                      </div>
                                      <div className="flex items-center gap-1 tooltip-trigger" title="Attachments">
                                        <Paperclip className="h-3.5 w-3.5" />
                                        <span>{attachments}</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center text-[11px] font-medium text-slate-500 bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded-md">
                                      <Clock className="h-3 w-3 mr-1" />
                                      Due in {cIdNum % 14 + 1}d
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          )})}
                          {provided.placeholder}
                        </div>
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
