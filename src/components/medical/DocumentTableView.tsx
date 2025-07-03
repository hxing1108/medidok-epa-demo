import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Document } from "./DocumentThumbnailView";
import { useState } from "react";
import { Check } from "lucide-react";

interface DocumentTableViewProps {
  documents: Document[];
  onDocumentSelect?: (document: Document) => void;
  multiSelectMode?: boolean;
  multiSelectedDocuments?: Set<string>;
  onMultiSelectToggle?: (documentId: string) => void;
  onEnableMultiSelect?: (documentId: string) => void;
}

// Mock data to match the screenshot
const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Patienteneinverständnis...",
    category: "BESC",
    type: "LEI",
    creationDate: "08.11.2021",
    uploadDate: "08.11.2021",
    author: "Dr. Christian Ummerle",
    uploader: "-",
    department: "-"
  },
  {
    id: "2", 
    name: "Patienteneinverständnis...",
    category: "BESC",
    type: "LEI",
    creationDate: "08.11.2021",
    uploadDate: "08.11.2021",
    author: "Dr. Christian Ummerle",
    uploader: "-",
    department: "-"
  },
  {
    id: "3",
    name: "Patienteneinverständnis...",
    category: "BESC", 
    type: "LEI",
    creationDate: "08.11.2021",
    uploadDate: "08.11.2021",
    author: "Dr. Christian Ummerle",
    uploader: "-",
    department: "-"
  },
  {
    id: "4",
    name: "Patienteneinverständnis...",
    category: "BESC",
    type: "LEI", 
    creationDate: "08.11.2021",
    uploadDate: "08.11.2021",
    author: "Dr. Christian Ummerle",
    uploader: "-",
    department: "-"
  },
  {
    id: "5",
    name: "Patienteneinverständnis...",
    category: "BESC",
    type: "LEI",
    creationDate: "08.11.2021", 
    uploadDate: "08.11.2021",
    author: "Dr. Christian Ummerle",
    uploader: "-",
    department: "-"
  },
  {
    id: "6",
    name: "Patienteneinverständnis...",
    category: "BESC",
    type: "LEI",
    creationDate: "08.11.2021",
    uploadDate: "08.11.2021",
    author: "Dr. Christian Ummerle", 
    uploader: "-",
    department: "-"
  }
];

export function DocumentTableView({ documents, onDocumentSelect, multiSelectMode, multiSelectedDocuments, onMultiSelectToggle, onEnableMultiSelect }: DocumentTableViewProps) {
  // Use the actual documents passed as props, fallback to mockDocuments if empty
  const displayDocuments = documents.length > 0 ? documents : mockDocuments;
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

  const handleRowClick = (doc: Document) => {
    setSelectedDocumentId(doc.id);
    onDocumentSelect?.(doc);
  };
  
  return (
    <div className="space-y-4">
      
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="text-xs font-medium text-muted-foreground px-4 py-3">Dokumententitel</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground px-4 py-3">Kategorie</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground px-4 py-3">Dokumenttyp</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground px-4 py-3">Erstellungsdatum</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground px-4 py-3">Autor</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground px-4 py-3">Einsteller</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground px-4 py-3">Fachgruppe</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayDocuments.map((doc, index) => {
              const isRowSelected = selectedDocumentId === doc.id;
              const isMultiSelected = multiSelectedDocuments?.has(doc.id) || false;
              return (
                <TableRow 
                  key={doc.id} 
                  className={`cursor-pointer hover:bg-muted/30 transition-colors group relative ${
                    multiSelectMode && isMultiSelected
                      ? "border-l-4 border-l-blue-500 bg-blue-50/50"
                      : isRowSelected && !multiSelectMode
                      ? "border-l-4 border-l-blue-500 bg-blue-50/50" 
                      : index % 2 === 0 ? "bg-background" : "bg-muted/10"
                  }`}
                  onClick={(e) => {
                    if (multiSelectMode) {
                      onMultiSelectToggle?.(doc.id);
                    } else {
                      handleRowClick(doc);
                    }
                  }}
                >
                <TableCell className="px-4 py-3">
                  <div className="flex items-center space-x-3 relative">
                    {/* Hover Checkbox */}
                    <div className={`absolute -left-2 z-10 transition-opacity ${
                      multiSelectMode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                      <div 
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                          isMultiSelected 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'bg-white border-gray-300 hover:border-blue-400'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (multiSelectMode) {
                            onMultiSelectToggle?.(doc.id);
                          } else {
                            onEnableMultiSelect?.(doc.id);
                          }
                        }}
                      >
                        {isMultiSelected && <Check className="h-3 w-3 text-white" />}
                      </div>
                    </div>
                    <div className="w-6 h-8 bg-card border border-border rounded flex-shrink-0 flex items-center justify-center">
                      <div className="w-4 h-5 bg-muted rounded-sm"></div>
                    </div>
                    <span className="text-sm text-foreground">{doc.name}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-foreground">{doc.category}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-foreground">{doc.type}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-foreground">
                  <div>
                    <div>{doc.creationDate}</div>
                    <div className="text-xs text-muted-foreground">
                      {doc.uploadDate && doc.uploadDate !== doc.creationDate ? doc.uploadDate : "10:14"}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-foreground">{doc.author}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-muted-foreground">{doc.uploader || "-"}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-muted-foreground">{doc.department || "-"}</TableCell>
              </TableRow>
            );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}