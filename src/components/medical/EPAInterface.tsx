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
  const [currentTab, setCurrentTab] = useState<'lokal' | 'epa'>('epa');
  const [viewMode, setViewMode] = useState<'thumbnail' | 'table'>('thumbnail');
  const [selectedDocuments, setSelectedDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isMetadataCollapsed, setIsMetadataCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [panelSizes, setPanelSizes] = useState([65, 35]);

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

  const currentDocuments = currentTab === 'lokal' ? localDocuments : epaDocuments;

  // Fullscreen overlay
  if (isFullscreen && selectedDocument) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <DocumentPreview 
          document={selectedDocument} 
          onClose={handleExitFullscreen}
          onFullscreen={() => {}} // No-op since we're already in fullscreen
          isMetadataCollapsed={isMetadataCollapsed}
          onToggleMetadata={handleToggleMetadata}
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

      {/* Navigation Tabs */}
      <div className="border-b bg-card px-6">
        <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as 'lokal' | 'epa')} className="w-full">
          <TabsList className="h-10 bg-transparent p-0 border-none">
            <TabsTrigger 
              value="lokal" 
              className="h-10 px-4 text-sm data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Lokal
            </TabsTrigger>
            <TabsTrigger 
              value="epa"
              className="h-10 px-4 text-sm data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              ePA
            </TabsTrigger>
            <TabsTrigger 
              value="plus"
              className="h-10 px-4 text-sm data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              +
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lokal" className="mt-0 flex-1 overflow-hidden">
            {selectedDocument ? (
              <ResizablePanelGroup 
                direction="horizontal" 
                className="h-full" 
                onLayout={(sizes) => setPanelSizes(sizes)}
              >
                <ResizablePanel defaultSize={panelSizes[0]} minSize={30}>
                  <div className="h-full overflow-y-auto">
                    <div className="p-6">
                      {viewMode === 'thumbnail' ? (
                        <DocumentThumbnailView 
                          onViewDetails={handleViewDetails} 
                          onDocumentSelect={handleDocumentSelect}
                        />
                      ) : (
                        <DocumentTableView documents={selectedDocuments} onBack={handleBackToThumbnails} />
                      )}
                    </div>
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={panelSizes[1]} minSize={25}>
                  <div className="bg-card h-full">
                    <DocumentPreview 
                      document={selectedDocument} 
                      onClose={() => setSelectedDocument(null)}
                      onFullscreen={handleFullscreen}
                      isMetadataCollapsed={isMetadataCollapsed}
                      onToggleMetadata={handleToggleMetadata}
                    />
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            ) : (
              <div className="h-full overflow-y-auto">
                <div className="p-6">
                  {viewMode === 'thumbnail' ? (
                    <DocumentThumbnailView 
                      onViewDetails={handleViewDetails} 
                      onDocumentSelect={handleDocumentSelect}
                    />
                  ) : (
                    <DocumentTableView documents={selectedDocuments} onBack={handleBackToThumbnails} />
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="epa" className="mt-0 flex-1 overflow-hidden">
            {selectedDocument ? (
              <ResizablePanelGroup 
                direction="horizontal" 
                className="h-full" 
                onLayout={(sizes) => setPanelSizes(sizes)}
              >
                <ResizablePanel defaultSize={panelSizes[0]} minSize={30}>
                  <div className="h-full overflow-y-auto">
                    <div className="p-6">
                      <DocumentThumbnailView 
                        onViewDetails={handleViewDetails} 
                        documents={epaDocuments} 
                        onDocumentSelect={handleDocumentSelect}
                      />
                    </div>
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={panelSizes[1]} minSize={25}>
                  <div className="bg-card h-full">
                    <DocumentPreview 
                      document={selectedDocument} 
                      onClose={() => setSelectedDocument(null)}
                      onFullscreen={handleFullscreen}
                      isMetadataCollapsed={isMetadataCollapsed}
                      onToggleMetadata={handleToggleMetadata}
                    />
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            ) : (
              <div className="h-full overflow-y-auto">
                <div className="p-6">
                  <DocumentThumbnailView 
                    onViewDetails={handleViewDetails} 
                    documents={epaDocuments} 
                    onDocumentSelect={handleDocumentSelect}
                  />
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="plus" className="mt-0 flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto">
              <div className="p-6">
                <div className="text-center text-muted-foreground">
                  Tab "+" noch nicht implementiert
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Main Content is now handled by TabsContent above */}
    </div>
  );
}