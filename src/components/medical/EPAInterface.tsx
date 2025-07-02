import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Import } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DocumentThumbnailView, Document } from "./DocumentThumbnailView";
import { DocumentTableView } from "./DocumentTableView";

export function EPAInterface() {
  const [viewMode, setViewMode] = useState<'thumbnail' | 'table'>('thumbnail');
  const [selectedDocuments, setSelectedDocuments] = useState<Document[]>([]);

  const handleViewDetails = (documents: Document[]) => {
    setSelectedDocuments(documents);
    setViewMode('table');
  };

  const handleBackToThumbnails = () => {
    setSelectedDocuments([]);
    setViewMode('thumbnail');
  };

  return (
    <div className="h-screen flex flex-col bg-background">
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
        <Tabs defaultValue="epa" className="w-full">
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
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {viewMode === 'thumbnail' ? (
          <DocumentThumbnailView onViewDetails={handleViewDetails} />
        ) : (
          <DocumentTableView documents={selectedDocuments} onBack={handleBackToThumbnails} />
        )}
      </div>
    </div>
  );
}