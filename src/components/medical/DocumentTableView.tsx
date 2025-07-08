import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Document } from "./DocumentThumbnailView";
import { useState } from "react";
import { Check, FileText } from "lucide-react";
import dokumentenklasseData from "@/data/dokumentenklasse.json";
import consentFormPreview from '@/assets/consent-form-preview.jpg';
import labResultsPreview from '@/assets/lab-results-preview.jpg';

interface DocumentTableViewProps {
  documents: Document[];
  onDocumentSelect?: (document: Document) => void;
  isFromEPA?: boolean;
  localDocuments?: Document[]; // For checking import status
  importedEpaDocumentIds?: Set<string>; // IDs of ePA documents that have been imported
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

export function DocumentTableView({ documents, onDocumentSelect, isFromEPA, localDocuments, importedEpaDocumentIds, multiSelectMode, multiSelectedDocuments, onMultiSelectToggle, onEnableMultiSelect }: DocumentTableViewProps) {
  // Use the actual documents passed as props, fallback to mockDocuments if empty
  const displayDocuments = documents.length > 0 ? documents : mockDocuments;
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

  // Helper function to get thumbnail URL for downloaded ePA documents
  const getDownloadedThumbnailUrl = (document: Document): string | undefined => {
    // If it's an ePA document that has been downloaded, get the thumbnail from local documents
    if (isFromEPA && importedEpaDocumentIds?.has(document.id)) {
      const localVersion = localDocuments?.find(local => local.id === document.id && local.importedFromEPA);
      if (localVersion?.thumbnailUrl) {
        return localVersion.thumbnailUrl;
      }
      
      // Fallback: map specific documents to their preview images by ID
      switch (document.id) {
        case 'epa1':
          return consentFormPreview;
        case 'epa2':
          return labResultsPreview;
        case 'epa3':
          return '/lovable-uploads/8cae94e0-2f38-4e68-8c3a-892c27d9737d.png';
        case 'epa4':
          return '/lovable-uploads/ab9f6edf-0cba-4d66-91a9-bc06361442ab.png';
        case 'epa5':
          return '/lovable-uploads/6f562a21-8024-4997-af46-2b5ab9795ab5.png';
        case 'epa6':
          return '/lovable-uploads/12077eaa-68d7-48ce-b4cc-abf50d07abbb.png';
        case 'epa7':
          return '/lovable-uploads/e193902b-cc7a-47da-b505-65107a38930e.png';
        case 'epa8':
          return '/lovable-uploads/62f8033e-7725-4828-b0d5-1265c6405663.png';
        default:
          return undefined;
      }
    }
    return document.thumbnailUrl;
  };

  const handleRowClick = (doc: Document) => {
    setSelectedDocumentId(doc.id);
    onDocumentSelect?.(doc);
  };

  // Function to get category display text based on context
  const getCategoryDisplayText = (category: string) => {
    if (isFromEPA) {
      return dokumentenklasseData.documentClasses[category as keyof typeof dokumentenklasseData.documentClasses] || category;
    } else {
      return dokumentenklasseData.localCategories[category as keyof typeof dokumentenklasseData.localCategories] || category;
    }
  };

  // Function to get document type display text
  const getDocumentTypeDisplayText = (type: string) => {
    return dokumentenklasseData.documentTypes[type as keyof typeof dokumentenklasseData.documentTypes] || type;
  };

  // Function to get file type display text for local documents
  const getFileTypeDisplayText = (type: string, name: string) => {
    // For local documents, determine file type based on document type or name
    if (type === 'FOT') return 'JPG';
    if (type === 'BLD') return 'DICOM';
    if (type === 'LEI' || type === 'EIN' || type === 'DIA' || type === 'BEF') return 'PDF';
    
    // Fallback: try to extract from filename
    const extension = name.split('.').pop()?.toUpperCase();
    if (extension && ['PDF', 'JPG', 'JPEG', 'PNG', 'DICOM', 'DCM'].includes(extension)) {
      return extension === 'DCM' ? 'DICOM' : extension;
    }
    
    return 'PDF'; // Default fallback
  };

  // Function to get department display text
  const getDepartmentDisplayText = (department: string) => {
    if (department === '-' || !department) return '-';
    return dokumentenklasseData.departments[department as keyof typeof dokumentenklasseData.departments] || department;
  };
  
  return (
    <div className="space-y-4">
      
      <div className="overflow-hidden">
        <Table>
          <TableHeader className="[&_tr]:border-b-0">
            <TableRow className="transition-colors border-b-0">
              <TableHead className="h-12 text-left align-middle [&:has([role=checkbox])]:pr-0 text-xs font-medium text-muted-foreground px-4 py-3">Dokumententitel</TableHead>
              <TableHead className="h-12 text-left align-middle [&:has([role=checkbox])]:pr-0 text-xs font-medium text-muted-foreground px-4 py-3">{isFromEPA ? "Dokumentenklasse" : "Kategorie"}</TableHead>
              <TableHead className="h-12 text-left align-middle [&:has([role=checkbox])]:pr-0 text-xs font-medium text-muted-foreground px-4 py-3">{isFromEPA ? "Dokumententyp" : "Dateityp"}</TableHead>
              <TableHead className="h-12 text-left align-middle [&:has([role=checkbox])]:pr-0 text-xs font-medium text-muted-foreground px-4 py-3">Erstellungsdatum</TableHead>
              <TableHead className="h-12 text-left align-middle [&:has([role=checkbox])]:pr-0 text-xs font-medium text-muted-foreground px-4 py-3">Initiator</TableHead>
              <TableHead className="h-12 text-left align-middle [&:has([role=checkbox])]:pr-0 text-xs font-medium text-muted-foreground px-4 py-3">Einsender</TableHead>
              {isFromEPA && <TableHead className="h-12 text-left align-middle [&:has([role=checkbox])]:pr-0 text-xs font-medium text-muted-foreground px-4 py-3">Fachgruppe</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayDocuments.map((doc, index) => {
              const isRowSelected = selectedDocumentId === doc.id;
              const isMultiSelected = multiSelectedDocuments?.has(doc.id) || false;
              return (
                <TableRow 
                  key={doc.id} 
                  className={`cursor-pointer transition-colors group relative border-b-0 hover:bg-blue-100 ${
                    multiSelectMode && isMultiSelected
                      ? "border-l-4 border-l-blue-500"
                      : isRowSelected && !multiSelectMode
                      ? "border-l-4 border-l-blue-500" 
                      : ""
                  } ${index % 2 === 1 ? "bg-[#EBEEF1]" : ""}`}
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
                            : 'border-gray-300 hover:border-blue-400'
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
                    <div className="w-6 h-8 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-sm">
                      {(() => {
                        const thumbnailUrl = getDownloadedThumbnailUrl(doc);
                        const shouldShowThumbnail = thumbnailUrl && (!isFromEPA || doc.sharedFromLocal || doc.importedFromEPA || (isFromEPA && importedEpaDocumentIds?.has(doc.id)));
                        
                        return shouldShowThumbnail ? (
                          <img
                            src={thumbnailUrl}
                            alt={`Preview of ${doc.name}`}
                            className="w-full h-full object-cover"
                          />
                        ) : isFromEPA ? (
                          <img 
                            src="/epa-icon.png" 
                            alt="EPA Document" 
                            className="w-4 h-4 opacity-60"
                          />
                        ) : (
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        );
                      })()}
                    </div>
                    <span className="text-sm text-foreground">{doc.name}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-foreground">{getCategoryDisplayText(doc.category)}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-foreground">
                  {isFromEPA ? getDocumentTypeDisplayText(doc.type) : getFileTypeDisplayText(doc.type, doc.name)}
                </TableCell>
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
                {isFromEPA && <TableCell className="px-4 py-3 text-sm text-muted-foreground">{getDepartmentDisplayText(doc.department || "-")}</TableCell>}
              </TableRow>
            );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}