import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Download, Eye, FileText, X, ChevronDown, ChevronRight, Maximize } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Document } from "./DocumentThumbnailView";

interface DocumentPreviewProps {
  document: Document;
  onClose?: () => void;
  onFullscreen?: () => void;
  onDownload?: (document: Document) => void;
  isMetadataCollapsed: boolean;
  onToggleMetadata: () => void;
  localDocuments?: Document[]; // Array of local documents to check for duplicates
  isFromEPA?: boolean; // Whether this document is from ePA tab
}

export function DocumentPreview({ document, onClose, onFullscreen, onDownload, isMetadataCollapsed, onToggleMetadata, localDocuments, isFromEPA }: DocumentPreviewProps) {
  const { toast } = useToast();

  // Check if this document is already imported to local
  const isAlreadyImported = localDocuments?.some(localDoc => 
    localDoc.name === document.name && localDoc.author === document.author && localDoc.creationDate === document.creationDate
  ) || false;

  const handleDownload = async () => {
    try {
      // Show loading state
      toast({
        title: "Download gestartet",
        description: `${document.name} wird heruntergeladen...`,
      });

      // Simulate download process (replace with actual download logic)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Call the download handler to transfer document to local
      if (onDownload) {
        onDownload(document);
      }

      // Show success notification
      toast({
        title: "Download erfolgreich",
        description: `${document.name} wurde erfolgreich heruntergeladen und lokal gespeichert.`,
        variant: "default",
      });

      // TODO: Implement actual file download logic
      // TODO: Record download in document history  
      // TODO: Forward to PVS system if needed
      
    } catch (error) {
      // Show error notification
      toast({
        title: "Download fehlgeschlagen",
        description: `Fehler beim Herunterladen von ${document.name}. Bitte versuchen Sie es erneut.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-full flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">Dokumentvorschau</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={onFullscreen}>
              <Maximize className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Document Preview Area */}
        <div className={`bg-muted rounded-lg p-4 flex items-center justify-center ${isMetadataCollapsed ? 'h-full flex-1' : 'min-h-64'}`}>
          {document.thumbnailUrl ? (
            <img 
              src={document.thumbnailUrl} 
              alt={`Preview of ${document.name}`}
              className={`object-contain rounded ${isMetadataCollapsed ? 'max-h-full max-w-full h-full' : 'max-w-full max-h-64'}`}
            />
          ) : (
            <div className="text-center">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">
                Dokumentvorschau für {document.name}
              </p>
            </div>
          )}
        </div>

        {/* Document Metadata */}
        <Collapsible open={!isMetadataCollapsed} onOpenChange={(open) => onToggleMetadata()}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <h3 className="font-semibold">Metadaten</h3>
              {isMetadataCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-4 mt-4">
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Titel:</span>
                <p className="mt-1">{document.name}</p>
              </div>
              
              <Separator />
              
              <div>
                <span className="font-medium text-muted-foreground">Kategorie:</span>
                <p className="mt-1">{document.category}</p>
              </div>
              
              <div>
                <span className="font-medium text-muted-foreground">Dokumenttyp:</span>
                <p className="mt-1">{document.type}</p>
              </div>
              
              <Separator />
              
              <div>
                <span className="font-medium text-muted-foreground">Erstellungsdatum:</span>
                <p className="mt-1">{document.creationDate}</p>
              </div>
              
              <div>
                <span className="font-medium text-muted-foreground">Upload-Datum:</span>
                <p className="mt-1">{document.uploadDate}</p>
              </div>
              
              <Separator />
              
              <div>
                <span className="font-medium text-muted-foreground">Autor:</span>
                <p className="mt-1">{document.author}</p>
              </div>
              
              <div>
                <span className="font-medium text-muted-foreground">Einsteller:</span>
                <p className="mt-1">{document.uploader}</p>
              </div>
              
              <div>
                <span className="font-medium text-muted-foreground">Fachgruppe:</span>
                <p className="mt-1">{document.department}</p>
              </div>
              
              <Separator />
              
              <div>
                <span className="font-medium text-muted-foreground">Dokument-ID:</span>
                <p className="mt-1">{document.id}</p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

      </CardContent>

      {/* Download Section at Bottom */}
      <div className="border-t p-4">
        <Button 
          onClick={handleDownload} 
          className="w-full" 
          disabled={isAlreadyImported}
          variant={isAlreadyImported ? "secondary" : "default"}
        >
          <Download className="h-4 w-4 mr-2" />
          {isAlreadyImported ? "Bereits importiert" : "ePA zur lokalen Bilderliste herunterladen"}
        </Button>
      </div>
    </div>
  );
}