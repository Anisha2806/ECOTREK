import React from 'react';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { EnergyInput } from '@/types';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import autoTable from 'jspdf-autotable';


interface DataExportProps {
  data: EnergyInput[];
}

const DataExport: React.FC<DataExportProps> = ({ data }) => {
  const exportCSV = () => {
    if (data.length === 0) {
      toast({
        title: "No Data",
        description: "There is no data to export",
        variant: "destructive"
      });
      return;
    }
    
    const headers = ['Date', 'Energy Source', 'Type', 'Value', 'Unit', 'Vehicle Type'];
    
    const csvContent = [
      headers.join(','),
      ...data.map(item => [
        item.date,
        item.sourceName,
        item.sourceType,
        item.value,
        item.unit,
        item.vehicleType
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `energy-data-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Successful",
      description: "Your data has been exported as CSV"
    });
  };
  
  const exportPDF = () => {
    if (data.length === 0) {
      toast({
        title: "No Data",
        description: "There is no data to export",
        variant: "destructive"
      });
      return;
    }
  
    const doc = new jsPDF();
    doc.text("Energy Data Export", 14, 10);
  
    const tableColumn = ["Date", "Energy Source", "Type", "Value", "Unit", "Vehicle Type"];
    const tableRows = data.map(item => [
      item.date,
      item.sourceName,
      item.sourceType,
      item.value,
      item.unit,
      item.vehicleType
    ]);
  
    // Explicitly call autoTable function
    autoTable(doc, { head: [tableColumn], body: tableRows });
  
    doc.save(`energy-data-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
  
    toast({
      title: "Export Successful",
      description: "Your data has been exported as PDF"
    });
  };
  return (
    <div className="dashboard-card p-6 animate-scale-up">
      <h2 className="text-lg font-medium mb-4">Export Data</h2>
      
      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={exportCSV}
          className="btn-outline flex items-center justify-center gap-2 py-3"
        >
          <FileSpreadsheet className="h-4 w-4" />
          <span>Export as CSV</span>
        </button>
        
        <button
          onClick={exportPDF}
          className="btn-outline flex items-center justify-center gap-2 py-3"
        >
          <FileText className="h-4 w-4" />
          <span>Export as PDF</span>
        </button>
      </div>
      
      <p className="text-xs text-muted-foreground mt-4">
        Export your energy usage data for record-keeping and further analysis
      </p>
    </div>
  );
};

export default DataExport;
