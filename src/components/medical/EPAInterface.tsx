import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Search, Filter, Import } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DocumentThumbnailView, Document } from "./DocumentThumbnailView";
import { DocumentTableView } from "./DocumentTableView";
import { DocumentPreview } from "./DocumentPreview";
import ctThoraxPreview from "@/assets/ct-thorax-preview.jpg";
import mrtKopfPreview from "@/assets/mrt-kopf-preview.jpg";
import consentFormPreview from "@/assets/consent-form-preview.jpg";
import labResultsPreview from "@/assets/lab-results-preview.jpg";

// Mock data for local documents (Bilderliste)
const localDocuments: Document[] = [
  {
    id: "local1",
    name: "CT Thorax",
    category: "RAD",
    type: "BLD",
    creationDate: "02.07.2025",
    uploadDate: "02.07.2025",
    author: "Dr. Schmidt",
    uploader: "Dr. Schmidt",
    department: "Radiologie",
    source: "local",
    pageCount: "1 Seite",
    thumbnailUrl: ctThoraxPreview
  },
  {
    id: "local2", 
    name: "MRT Kopf",
    category: "RAD",
    type: "BLD",
    creationDate: "01.07.2025",
    uploadDate: "01.07.2025",
    author: "Dr. Weber",
    uploader: "Dr. Weber",
    department: "Radiologie",
    source: "local",
    pageCount: "1 Seite",
    thumbnailUrl: mrtKopfPreview
  },
  // Dermatological examinations
  {
    id: "local3",
    name: "Hautläsion Unterbauch",
    category: "DERM",
    type: "FOT",
    creationDate: "30.06.2025",
    uploadDate: "30.06.2025",
    author: "Dr. Müller",
    uploader: "Dr. Müller",
    department: "Dermatologie",
    source: "local",
    pageCount: "3 Bilder",
    thumbnailUrl: "/lovable-uploads/897e15d5-167b-4e31-888b-45159123c762.png"
  },
  {
    id: "local4",
    name: "Erythematöse Läsion Rücken",
    category: "DERM", 
    type: "FOT",
    creationDate: "29.06.2025",
    uploadDate: "29.06.2025",
    author: "Dr. Müller",
    uploader: "Dr. Müller",
    department: "Dermatologie",
    source: "local",
    pageCount: "2 Bilder",
    thumbnailUrl: "/lovable-uploads/6eaa638f-8841-423b-9ed8-dee6aeba1c57.png"
  },
  {
    id: "local5",
    name: "Vaskuläre Läsion",
    category: "DERM",
    type: "FOT", 
    creationDate: "28.06.2025",
    uploadDate: "28.06.2025",
    author: "Dr. Müller",
    uploader: "Dr. Müller",
    department: "Dermatologie",
    source: "local",
    pageCount: "2 Bilder",
    thumbnailUrl: "/lovable-uploads/fa10067b-ca25-4731-b422-ab4948ba925c.png"
  },
  {
    id: "local6",
    name: "Hautveränderung Oberarm",
    category: "DERM",
    type: "FOT",
    creationDate: "27.06.2025",
    uploadDate: "27.06.2025", 
    author: "Dr. Müller",
    uploader: "Dr. Müller",
    department: "Dermatologie",
    source: "local",
    pageCount: "1 Bild",
    thumbnailUrl: "/lovable-uploads/49eec6c8-b17d-4064-8e1c-1722d7c0d7e1.png"
  },
  // Brain MRI scans
  {
    id: "local7",
    name: "MRT Kopf axial T2",
    category: "RAD",
    type: "BLD",
    creationDate: "26.06.2025",
    uploadDate: "26.06.2025",
    author: "Dr. Weber",
    uploader: "Dr. Weber", 
    department: "Radiologie",
    source: "local",
    pageCount: "24 Schnitte",
    thumbnailUrl: "/lovable-uploads/8e0e9323-7286-476e-a984-b0a45ff452f2.png"
  },
  {
    id: "local8",
    name: "MRT Kopf axial T1",
    category: "RAD",
    type: "BLD",
    creationDate: "26.06.2025",
    uploadDate: "26.06.2025",
    author: "Dr. Weber",
    uploader: "Dr. Weber",
    department: "Radiologie",
    source: "local",
    pageCount: "20 Schnitte", 
    thumbnailUrl: "/lovable-uploads/1ea6381e-64a6-4574-8292-9737114875f7.png"
  },
  {
    id: "local9",
    name: "MRT Kopf axial FLAIR",
    category: "RAD", 
    type: "BLD",
    creationDate: "26.06.2025",
    uploadDate: "26.06.2025",
    author: "Dr. Weber",
    uploader: "Dr. Weber",
    department: "Radiologie",
    source: "local",
    pageCount: "18 Schnitte",
    thumbnailUrl: "/lovable-uploads/884f88e2-1435-46d4-9e03-8ba89ff1ee51.png"
  },
  {
    id: "local10",
    name: "MRT Kopf sagittal T1",
    category: "RAD",
    type: "BLD", 
    creationDate: "26.06.2025",
    uploadDate: "26.06.2025",
    author: "Dr. Weber",
    uploader: "Dr. Weber",
    department: "Radiologie",
    source: "local",
    pageCount: "15 Schnitte",
    thumbnailUrl: "/lovable-uploads/4782d657-7249-47a1-9eaa-5ce20b7b5ca8.png"
  }
];

// Mock data for ePA documents
const epaDocuments: Document[] = [
  {
    id: "epa1",
    name: "Patienteneinverständnis...",
    category: "BESC",
    type: "LEI",
    creationDate: "08.11.2021",
    uploadDate: "08.11.2021",
    author: "Dr. Christian Ummerle",
    uploader: "-",
    department: "-",
    source: "epa",
    importedFromEPA: true,
    pageCount: "2 Seiten",
    thumbnailUrl: consentFormPreview
  },
  {
    id: "epa2",
    name: "Laborwerte Blutbild",
    category: "LAB",
    type: "BEF",
    creationDate: "05.11.2021",
    uploadDate: "05.11.2021",
    author: "Dr. Müller",
    uploader: "-", 
    department: "Labor",
    source: "epa",
    importedFromEPA: true,
    pageCount: "3 Seiten",
    thumbnailUrl: labResultsPreview
  }
];

export function EPAInterface() {
  const [currentTab, setCurrentTab] = useState<'lokal' | 'epa'>('lokal');
  const [viewMode, setViewMode] = useState<'thumbnail' | 'table'>('thumbnail');
  const [selectedDocuments, setSelectedDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isMetadataCollapsed, setIsMetadataCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [panelSizes, setPanelSizes] = useState([65, 35]);
  const [localDocumentsList, setLocalDocumentsList] = useState<Document[]>(localDocuments);

  const handleViewDetails = (documents: Document[]) => {
    setSelectedDocuments(documents);
    setViewMode('table');
  };

  const handleBackToThumbnails = () => {
    setSelectedDocuments([]);
    setViewMode('thumbnail');
  };

  const handleDocumentSelect = (document: Document) => {
    setSelectedDocument(document);
  };

  const handleToggleMetadata = () => {
    setIsMetadataCollapsed(!isMetadataCollapsed);
  };

  const handleFullscreen = () => {
    setIsFullscreen(true);
  };

  const handleExitFullscreen = () => {
    setIsFullscreen(false);
  };

  const handleDownloadDocument = (document: Document) => {
    // Convert ePA document to local document
    const localDocument: Document = {
      ...document,
      id: `local_${Date.now()}`, // Generate new local ID
      source: "local",
      importedFromEPA: true,
      uploadDate: new Date().toLocaleDateString('de-DE'),
    };

    // Add to local documents list
    setLocalDocumentsList(prev => [...prev, localDocument]);
    
    // Switch to local tab to show the downloaded document
    setCurrentTab('lokal');
    
    // Auto-select the newly downloaded document
    setSelectedDocument(localDocument);
  };

  const currentDocuments = currentTab === 'lokal' ? localDocumentsList : epaDocuments;

  // Fullscreen overlay
  if (isFullscreen && selectedDocument) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <DocumentPreview 
          document={selectedDocument} 
          onClose={handleExitFullscreen}
          onFullscreen={() => {}} // No-op since we're already in fullscreen
          onDownload={handleDownloadDocument}
          isMetadataCollapsed={isMetadataCollapsed}
          onToggleMetadata={handleToggleMetadata}
          localDocuments={localDocumentsList}
          isFromEPA={currentTab === 'epa'}
        />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="border-b bg-card px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-lg font-medium text-foreground">Musterman, Max</h1>
            <div className="text-sm text-muted-foreground">*01.06.1980 | 1234</div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-8 px-3 text-xs">
              <Search className="h-3 w-3 mr-1" />
              Suchen
            </Button>
            <Button variant="outline" size="sm" className="h-8 px-3 text-xs">
              <Filter className="h-3 w-3 mr-1" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="h-8 px-3 text-xs">
              <Import className="h-3 w-3 mr-1" />
              Import
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {selectedDocument ? (
          <ResizablePanelGroup 
            direction="horizontal" 
            className="h-full" 
            onLayout={(sizes) => setPanelSizes(sizes)}
          >
            <ResizablePanel defaultSize={panelSizes[0]} minSize={30}>
              <div className="h-full flex flex-col">
                {/* Tab Navigation for Bilderlist only */}
                <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as 'lokal' | 'epa')} className="h-full flex flex-col">
                  <div className="p-6 pb-0">
                    <TabsList className="h-8 bg-transparent p-0 border-none mb-4">
                      <TabsTrigger 
                        value="lokal" 
                        className="h-8 px-3 text-sm bg-blue-100 data-[state=active]:bg-blue-200 data-[state=active]:text-blue-900 rounded-sm mr-1"
                      >
                        Lokal
                      </TabsTrigger>
                      <TabsTrigger 
                        value="epa"
                        className="h-8 px-3 text-sm bg-gray-100 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 rounded-sm mr-1"
                      >
                        ePA
                      </TabsTrigger>
                      <TabsTrigger 
                        value="plus"
                        className="h-8 px-3 text-sm bg-gray-100 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 rounded-sm"
                      >
                        +
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="lokal" className="flex-1 min-h-0 mt-0">
                    <div className="h-full overflow-y-auto px-6">
                      {viewMode === 'thumbnail' ? (
                        <DocumentThumbnailView 
                          onViewDetails={handleViewDetails} 
                          onDocumentSelect={handleDocumentSelect}
                          documents={localDocumentsList}
                        />
                      ) : (
                        <DocumentTableView documents={selectedDocuments} onBack={handleBackToThumbnails} />
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="epa" className="flex-1 min-h-0 mt-0">
                    <div className="h-full overflow-y-auto px-6">
                      <DocumentThumbnailView 
                        onViewDetails={handleViewDetails} 
                        documents={epaDocuments} 
                        onDocumentSelect={handleDocumentSelect}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="plus" className="flex-1 min-h-0 mt-0">
                    <div className="h-full overflow-y-auto px-6">
                      <div className="text-center text-muted-foreground">
                        Tab "+" noch nicht implementiert
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={panelSizes[1]} minSize={25}>
              <div className="bg-card h-full">
                <DocumentPreview 
                  document={selectedDocument} 
                  onClose={() => setSelectedDocument(null)}
                  onFullscreen={handleFullscreen}
                  onDownload={handleDownloadDocument}
                  isMetadataCollapsed={isMetadataCollapsed}
                  onToggleMetadata={handleToggleMetadata}
                  localDocuments={localDocumentsList}
                  isFromEPA={currentTab === 'epa'}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <div className="h-full flex flex-col">
            {/* Tab Navigation for Bilderlist only */}
            <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as 'lokal' | 'epa')} className="h-full flex flex-col">
              <div className="p-6 pb-0">
                <TabsList className="h-8 bg-transparent p-0 border-none mb-4">
                  <TabsTrigger 
                    value="lokal" 
                    className="h-8 px-3 text-sm bg-blue-100 data-[state=active]:bg-blue-200 data-[state=active]:text-blue-900 rounded-sm mr-1"
                  >
                    Lokal
                  </TabsTrigger>
                  <TabsTrigger 
                    value="epa"
                    className="h-8 px-3 text-sm bg-gray-100 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 rounded-sm mr-1"
                  >
                    ePA
                  </TabsTrigger>
                  <TabsTrigger 
                    value="plus"
                    className="h-8 px-3 text-sm bg-gray-100 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 rounded-sm"
                  >
                    +
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="lokal" className="flex-1 min-h-0 mt-0">
                <div className="h-full overflow-y-auto px-6">
                  {viewMode === 'thumbnail' ? (
                    <DocumentThumbnailView 
                      onViewDetails={handleViewDetails} 
                      onDocumentSelect={handleDocumentSelect}
                      documents={localDocumentsList}
                    />
                  ) : (
                    <DocumentTableView documents={selectedDocuments} onBack={handleBackToThumbnails} />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="epa" className="flex-1 min-h-0 mt-0">
                <div className="h-full overflow-y-auto px-6">
                  <DocumentThumbnailView 
                    onViewDetails={handleViewDetails} 
                    documents={epaDocuments} 
                    onDocumentSelect={handleDocumentSelect}
                  />
                </div>
              </TabsContent>

              <TabsContent value="plus" className="flex-1 min-h-0 mt-0">
                <div className="h-full overflow-y-auto px-6">
                  <div className="text-center text-muted-foreground">
                    Tab "+" noch nicht implementiert
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}