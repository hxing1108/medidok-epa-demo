import { useState, useEffect, useMemo } from "react";
import { ChevronDown, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import befundberichtPreview from "@/assets/befundbericht-preview.jpg";
import einstellbriefPreview from "@/assets/einstellbrief-preview.jpg";
import wundbeurteilungPreview from "/lovable-uploads/1544ef16-9b39-411e-8fe9-1dc19f2c89ad.png";

export interface Document {
  id: string;
  name: string;
  category: string;
  type: string;
  creationDate: string;
  uploadDate: string;
  author: string;
  uploader: string;
  department: string;
  pageCount?: string;
  thumbnailUrl?: string;
  source?: "local" | "epa";
  importedFromEPA?: boolean;
}

interface DocumentCategory {
  name: string;
  documents: Document[];
  count: number;
}

const mockCategories: DocumentCategory[] = [
  {
    name: "Befundbericht",
    count: 5,
    documents: [
      {
        id: "1",
        name: "Befundbericht09.12.2023",
        category: "BESC",
        type: "BEF",
        creationDate: "09.12.2023",
        uploadDate: "09.12.2023",
        author: "Dr. Peter Schmidt",
        uploader: "Dr. Peter Schmidt",
        department: "Chirurgische Praxis",
        pageCount: "1 Seiten",
        thumbnailUrl: befundberichtPreview
      },
      {
        id: "2", 
        name: "Befundbericht10.08.2023",
        category: "BESC",
        type: "BEF", 
        creationDate: "10.08.2023",
        uploadDate: "10.08.2023",
        author: "Dr. Peter Schmidt",
        uploader: "Dr. Peter Schmidt",
        department: "Chirurgische Praxis",
        pageCount: "2 Seiten",
        thumbnailUrl: befundberichtPreview
      },
      {
        id: "3",
        name: "Befundbericht10.01.2023", 
        category: "BESC",
        type: "BEF",
        creationDate: "10.01.2023",
        uploadDate: "10.01.2023", 
        author: "Dr. Peter Schmidt",
        uploader: "Dr. Peter Schmidt",
        department: "Chirurgische Praxis",
        pageCount: "4 Seiten",
        thumbnailUrl: befundberichtPreview
      },
      {
        id: "4",
        name: "Befundbericht12.03.2022",
        category: "BESC", 
        type: "BEF",
        creationDate: "12.03.2022",
        uploadDate: "12.03.2022",
        author: "Dr. Peter Schmidt", 
        uploader: "Dr. Peter Schmidt",
        department: "Chirurgische Praxis",
        pageCount: "2 Seiten",
        thumbnailUrl: befundberichtPreview
      },
      {
        id: "5",
        name: "Befundbericht12.07.2019",
        category: "BESC",
        type: "BEF", 
        creationDate: "12.07.2019",
        uploadDate: "12.07.2019",
        author: "Dr. Peter Schmidt",
        uploader: "Dr. Peter Schmidt", 
        department: "Chirurgische Praxis",
        pageCount: "2 Seiten",
        thumbnailUrl: befundberichtPreview
      }
    ]
  },
  {
    name: "Einstellbrief",
    count: 3,
    documents: [
      {
        id: "6",
        name: "Einstellbrief 01.06.2023",
        category: "BRIEF",
        type: "EIN",
        creationDate: "01.06.2023",
        uploadDate: "01.06.2023",
        author: "Praxis für Interdisziplinäre Onkologie",
        uploader: "Praxis für Interdisziplinäre Onkologie",
        department: "Onkologie",
        pageCount: "3 Seiten",
        thumbnailUrl: einstellbriefPreview
      },
      {
        id: "7",
        name: "Einstellbrief 12.02.2023",
        category: "BRIEF", 
        type: "EIN",
        creationDate: "12.02.2023",
        uploadDate: "12.02.2023",
        author: "Praxis für Interdisziplinäre Onkologie",
        uploader: "Praxis für Interdisziplinäre Onkologie",
        department: "Onkologie",
        pageCount: "2 Seiten",
        thumbnailUrl: einstellbriefPreview
      },
      {
        id: "8",
        name: "Einstellbrief 02.02.2023",
        category: "BRIEF",
        type: "EIN", 
        creationDate: "02.02.2023",
        uploadDate: "02.02.2023",
        author: "Praxis für Interdisziplinäre Onkologie",
        uploader: "Praxis für Interdisziplinäre Onkologie",
        department: "Onkologie", 
        pageCount: "4 Seiten",
        thumbnailUrl: einstellbriefPreview
      }
    ]
  },
  {
    name: "Wundbeurteilung",
    count: 5,
    documents: [
      {
        id: "9",
        name: "Akute Hautläsionen",
        category: "BILD",
        type: "FOT", 
        creationDate: "15.11.2023",
        uploadDate: "15.11.2023",
        author: "Dermatologische Praxis",
        uploader: "Dermatologische Praxis",
        department: "Dermatologie",
        pageCount: "30 Bilder",
        thumbnailUrl: wundbeurteilungPreview
      },
      {
        id: "10", 
        name: "Erythematöse Läsionen",
        category: "BILD",
        type: "FOT",
        creationDate: "20.10.2023", 
        uploadDate: "20.10.2023",
        author: "Dermatologische Praxis",
        uploader: "Dermatologische Praxis",
        department: "Dermatologie",
        pageCount: "24 Bilder",
        thumbnailUrl: wundbeurteilungPreview
      },
      {
        id: "11",
        name: "Mechanische Hautschäden", 
        category: "BILD",
        type: "FOT",
        creationDate: "05.09.2023",
        uploadDate: "05.09.2023",
        author: "Dermatologische Praxis", 
        uploader: "Dermatologische Praxis",
        department: "Dermatologie",
        pageCount: "18 Bilder",
        thumbnailUrl: wundbeurteilungPreview
      },
      {
        id: "12",
        name: "Hautirritationen und Schwellungen",
        category: "BILD",
        type: "FOT",
        creationDate: "12.08.2023",
        uploadDate: "12.08.2023", 
        author: "Dermatologische Praxis",
        uploader: "Dermatologische Praxis",
        department: "Dermatologie",
        pageCount: "24 Bilder",
        thumbnailUrl: wundbeurteilungPreview
      },
      {
        id: "13",
        name: "Lokale Hautentzündungen",
        category: "BILD", 
        type: "FOT",
        creationDate: "28.07.2023",
        uploadDate: "28.07.2023",
        author: "Dermatologische Praxis",
        uploader: "Dermatologische Praxis", 
        department: "Dermatologie",
        pageCount: "24 Bilder",
        thumbnailUrl: wundbeurteilungPreview
      }
    ]
  }
];

interface DocumentThumbnailViewProps {
  onViewDetails: (documents: Document[]) => void;
  documents?: Document[];
  onDocumentSelect?: (document: Document) => void;
  localDocuments?: Document[]; // For checking import status in local tab
  isFromEPA?: boolean; // Whether this is the ePA tab
  importedEpaDocumentIds?: Set<string>; // IDs of ePA documents that have been imported
  multiSelectMode?: boolean;
  multiSelectedDocuments?: Set<string>;
  onMultiSelectToggle?: (documentId: string) => void;
  onEnableMultiSelect?: (documentId: string) => void;
}

export function DocumentThumbnailView({ onViewDetails, documents, onDocumentSelect, localDocuments, isFromEPA, importedEpaDocumentIds, multiSelectMode, multiSelectedDocuments, onMultiSelectToggle, onEnableMultiSelect }: DocumentThumbnailViewProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

  // Function to group documents by their medical class
  function groupDocumentsByClass(docs: Document[]): DocumentCategory[] {
    const grouped = docs.reduce((acc, doc) => {
      // Create a class name based on document type and category
      let className = '';
      if (doc.type === 'BLD' && doc.category === 'RAD') {
        // Extract class from document name for radiology images
        if (doc.name.includes('CT')) className = 'CT Untersuchungen';
        else if (doc.name.includes('MRT')) className = 'MRT Untersuchungen';
        else className = 'Radiologie Bilder';
      } else if (doc.type === 'FOT' && doc.category === 'DERM') {
        className = 'Dermatologie Bilder';
      } else if (doc.category === 'BESC') {
        className = 'Befundberichte';
      } else if (doc.category === 'LAB') {
        className = 'Laborwerte';
      } else if (doc.category === 'BRIEF') {
        className = 'Briefe';
      } else {
        className = 'Sonstige Dokumente';
      }

      if (!acc[className]) {
        acc[className] = [];
      }
      acc[className].push(doc);
      return acc;
    }, {} as Record<string, Document[]>);

    // Convert to DocumentCategory format
    return Object.entries(grouped).map(([name, documents]) => ({
      name,
      count: documents.length,
      documents
    }));
  }

  // If custom documents are provided, group them by type/class
  const displayCategories = useMemo(() => {
    return documents ? groupDocumentsByClass(documents) : mockCategories;
  }, [documents]);

  // Update expanded categories when display categories change - expand all by default
  useEffect(() => {
    const allCategoryNames = displayCategories.map(cat => cat.name);
    setExpandedCategories(new Set(allCategoryNames));
  }, [displayCategories]);

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="space-y-4">
      {displayCategories.map((category) => {
        const isExpanded = expandedCategories.has(category.name);
        return (
          <div key={category.name} className="border-b border-border pb-4">
            <div 
              className="flex items-center cursor-pointer mb-3 hover:bg-muted/50 p-2 rounded"
              onClick={() => toggleCategory(category.name)}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 mr-2 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />
              )}
              <h3 className="font-medium text-foreground">{category.name}</h3>
              <span className="ml-2 text-sm text-muted-foreground">{category.count} Untersuchungen</span>
            </div>
            
            {isExpanded && (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,200px))] gap-4 ml-6 justify-start">
                {category.documents.map((doc) => {
                  const isSelected = multiSelectedDocuments?.has(doc.id) || false;
                  return (
                    <div 
                      key={doc.id} 
                      className={`bg-card border rounded-lg p-3 transition-all cursor-pointer relative group ${
                        multiSelectMode && isSelected
                          ? 'border-blue-500 border-2 bg-blue-50/30'
                          : selectedDocumentId === doc.id && !multiSelectMode
                          ? 'border-primary border-2' 
                          : 'border-border hover:border-primary/30'
                      }`}
                      onClick={(e) => {
                        if (multiSelectMode) {
                          onMultiSelectToggle?.(doc.id);
                        } else {
                          setSelectedDocumentId(doc.id);
                          onDocumentSelect?.(doc);
                        }
                      }}
                    >
                      {/* Hover Checkbox */}
                      <div className={`absolute top-2 left-2 z-10 transition-opacity ${
                        multiSelectMode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}>
                        <div 
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                            isSelected 
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
                          {isSelected && <Check className="h-3 w-3 text-white" />}
                        </div>
                      </div>
                  <div className="bg-muted rounded h-32 mb-2 flex items-center justify-center overflow-hidden">
                    {doc.thumbnailUrl ? (
                      <img 
                        src={doc.thumbnailUrl} 
                        alt={`Preview of ${doc.name}`}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="text-center text-xs text-muted-foreground">
                        <div className="w-8 h-10 bg-background border rounded mx-auto mb-1"></div>
                        Vorschau
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.pageCount}</p>
                    <p className="text-xs text-muted-foreground">{doc.author}</p>
                    {/* Show pill based on context and import status */}
                    {(isFromEPA || doc.importedFromEPA) && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200">
                          {isFromEPA && !importedEpaDocumentIds?.has(doc.id) ? "ePA" : "ePA Import"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}