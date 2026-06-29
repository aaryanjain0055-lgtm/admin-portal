import React, { useState } from "react";
import { Search, Upload, FileText, Download, MoreHorizontal, File, FileImage, FileSpreadsheet, Folder, ChevronRight, Grid, List as ListIcon, ChevronDown, Tag, Clock, Users, ShieldCheck, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const MOCK_DOCS = [
  { id: 1, name: "Employee Handbook 2026.pdf", type: "pdf", size: "2.4 MB", modified: "Oct 24, 2026", owner: "HR Team", tags: ["Policy", "Onboarding"] },
  { id: 2, name: "Q3 Hiring Report.xlsx", type: "excel", size: "1.1 MB", modified: "Oct 15, 2026", owner: "Analytics", tags: ["Report", "Q3"] },
  { id: 3, name: "Offer Letter Template.docx", type: "word", size: "845 KB", modified: "Sep 12, 2026", owner: "Recruitment", tags: ["Template", "Legal"] },
  { id: 4, name: "Company Logo Guidelines.pdf", type: "pdf", size: "4.2 MB", modified: "Aug 05, 2026", owner: "Design", tags: ["Brand", "Design"] },
  { id: 5, name: "Candidate Pipeline.csv", type: "csv", size: "125 KB", modified: "Just now", owner: "System", tags: ["Export", "Data"] },
  { id: 6, name: "Benefits Overview.pptx", type: "presentation", size: "5.6 MB", modified: "Jul 22, 2026", owner: "HR Team", tags: ["Benefits", "Onboarding"] },
];

const FOLDERS = [
  { name: "Resumes & CVs", count: 1245 },
  { name: "Offer Letters", count: 342 },
  { name: "Compliance & Legal", count: 56 },
  { name: "Onboarding Kits", count: 12 },
];

const FOLDER_TREE = [
  { 
    id: "f1", name: "Enterprise HR", isOpen: true, children: [
      { id: "f1-1", name: "Policies & Procedures", children: [] },
      { id: "f1-2", name: "Recruitment", isOpen: true, children: [
        { id: "f1-2-1", name: "Resumes & CVs", active: true, children: [] },
        { id: "f1-2-2", name: "Offer Letters", children: [] },
        { id: "f1-2-3", name: "Interview Rubrics", children: [] },
      ]},
      { id: "f1-3", name: "Compliance & Legal", children: [] },
    ]
  },
  {
    id: "f2", name: "Shared with Me", children: []
  }
];

const POPULAR_TAGS = ["Policy", "Onboarding", "Legal", "Report", "Template"];

export function DocumentCenter() {
  const [view, setView] = useState<"grid" | "list">("list");
  const [search, setSearch] = useState("");

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-8 w-8 text-rose-500" />;
      case 'excel': 
      case 'csv': return <FileSpreadsheet className="h-8 w-8 text-emerald-500" />;
      case 'word': return <FileText className="h-8 w-8 text-blue-500" />;
      case 'presentation': return <FileImage className="h-8 w-8 text-amber-500" />;
      default: return <File className="h-8 w-8 text-slate-500" />;
    }
  };

  const getSmallFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-4 w-4 text-rose-500" />;
      case 'excel': 
      case 'csv': return <FileSpreadsheet className="h-4 w-4 text-emerald-500" />;
      case 'word': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'presentation': return <FileImage className="h-4 w-4 text-amber-500" />;
      default: return <File className="h-4 w-4 text-slate-500" />;
    }
  };

  const renderTree = (nodes: any[], depth = 0) => {
    return (
      <div className="space-y-1">
        {nodes.map(node => (
          <div key={node.id}>
            <div 
              className={`flex items-center gap-1.5 py-1.5 px-2 rounded-md cursor-pointer transition-colors ${node.active ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"}`}
              style={{ paddingLeft: `${depth * 12 + 8}px` }}
            >
              {node.children && node.children.length > 0 ? (
                node.isOpen ? <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-70" /> : <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-70" />
              ) : (
                <div className="w-3.5 shrink-0" />
              )}
              <Folder className={`h-4 w-4 shrink-0 ${node.active ? "text-indigo-500 fill-indigo-200 dark:fill-indigo-900/50" : "text-slate-400 fill-slate-200 dark:text-slate-500 dark:fill-slate-800"}`} />
              <span className="text-sm font-medium truncate">{node.name}</span>
            </div>
            {node.isOpen && node.children && (
              <div>{renderTree(node.children, depth + 1)}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Document Center</h2>
          <p className="text-slate-500">Secure enterprise storage with metadata tagging and smart search.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
            <Upload className="mr-2 h-4 w-4" /> Upload Files
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search documents, folders, or #tags..."
            className="pl-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden sm:flex border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
            <Filter className="mr-2 h-3.5 w-3.5" /> Filter
          </Button>
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-md border border-slate-200 dark:border-slate-700">
            <button 
              onClick={() => setView("list")}
              className={`p-1.5 rounded ${view === "list" ? "bg-white dark:bg-slate-950 shadow-sm text-slate-900 dark:text-slate-100" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
            >
              <ListIcon className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setView("grid")}
              className={`p-1.5 rounded ${view === "grid" ? "bg-white dark:bg-slate-950 shadow-sm text-slate-900 dark:text-slate-100" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
            >
              <Grid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 gap-6 min-h-0 overflow-hidden">
        {/* Sidebar Tree */}
        <div className="w-64 shrink-0 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2 hidden md:flex">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Folders</h4>
            {renderTree(FOLDER_TREE)}
          </div>
          
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Quick Access</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2 py-1.5 px-2 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm">
                <Clock className="h-4 w-4 text-indigo-500" /> Recent Files
              </div>
              <div className="flex items-center gap-2 py-1.5 px-2 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm">
                <Users className="h-4 w-4 text-emerald-500" /> Team Shared
              </div>
              <div className="flex items-center gap-2 py-1.5 px-2 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm">
                <ShieldCheck className="h-4 w-4 text-amber-500" /> Secure Vault
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Popular Tags</h4>
            <div className="flex flex-wrap gap-2 px-2">
              {POPULAR_TAGS.map(tag => (
                <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-normal">
                  <Tag className="mr-1 h-3 w-3 opacity-50" /> {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <Card className="flex-1 overflow-hidden shadow-sm border-slate-200 dark:border-slate-800 flex flex-col min-w-0 bg-white dark:bg-slate-900">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center gap-2">
            <span className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer text-sm font-medium">Enterprise HR</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer text-sm font-medium">Recruitment</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900 dark:text-slate-100 text-sm font-semibold">Resumes & CVs</span>
          </div>
          
          <div className="flex-1 overflow-auto custom-scrollbar">
            {view === "list" ? (
              <Table>
                <TableHeader className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-10 border-b border-slate-200 dark:border-slate-800 shadow-sm">
                  <TableRow className="hover:bg-transparent border-none">
                    <TableHead>Name</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Modified</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_DOCS.map((doc) => (
                    <TableRow key={doc.id} className="group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          {getSmallFileIcon(doc.type)}
                          <span className="text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1.5 flex-wrap">
                          {doc.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-medium px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-500 text-sm">{doc.modified}</TableCell>
                      <TableCell className="text-slate-500 text-sm">{doc.owner}</TableCell>
                      <TableCell className="text-slate-500 text-sm">{doc.size}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {MOCK_DOCS.map((doc) => (
                  <div key={doc.id} className="group relative flex flex-col p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 bg-white dark:bg-slate-900 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-all cursor-pointer shadow-sm hover:shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="transform group-hover:scale-110 transition-transform">
                        {getFileIcon(doc.type)}
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 absolute top-2 right-2">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 w-full mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {doc.name}
                    </h4>
                    
                    <div className="flex flex-wrap gap-1 mt-1 mb-3">
                      {doc.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[9px] font-medium px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                      <span>{doc.modified}</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
