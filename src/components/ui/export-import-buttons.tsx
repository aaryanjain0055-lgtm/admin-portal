import React, { useRef, useState } from 'react';
import { Button } from './button';
import { Download, Upload, FileText, FileSpreadsheet } from 'lucide-react';
import { exportToCSV } from '@/lib/export';

interface ExportImportProps {
  data: any[];
  filename: string;
}

export function ExportImportButtons({ data, filename }: ExportImportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleExportCSV = () => {
    exportToCSV(`${filename}.csv`, data);
  };

  const handleExportPDF = () => {
    // In a real app, we'd use a library like jsPDF. 
    // Here we trigger the browser print dialog which can save as PDF.
    window.print();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImporting(true);
      // Simulate file parsing and upload delay
      setTimeout(() => {
        setImporting(false);
        setImportSuccess(true);
        setTimeout(() => setImportSuccess(false), 3000);
      }, 1500);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input 
        type="file" 
        accept=".csv,.xlsx,.xls" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
      />
      <Button 
        variant="outline" 
        className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
        onClick={handleImportClick}
        disabled={importing}
      >
        <Upload className="mr-2 h-4 w-4" /> 
        {importing ? "Importing..." : importSuccess ? "Imported!" : "Import"}
      </Button>
      <Button 
        variant="outline" 
        className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
        onClick={handleExportCSV}
      >
        <FileSpreadsheet className="mr-2 h-4 w-4" /> Excel / CSV
      </Button>
      <Button 
        variant="outline" 
        className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
        onClick={handleExportPDF}
      >
        <FileText className="mr-2 h-4 w-4" /> PDF
      </Button>
    </div>
  );
}
