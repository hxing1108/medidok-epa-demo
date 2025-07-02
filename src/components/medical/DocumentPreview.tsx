import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Download, Eye, FileText, X, ChevronDown, ChevronRight, Maximize } from "lucide-react";
import { Document } from "./DocumentThumbnailView";

interface DocumentPreviewProps {
  document: Document;
  onClose?: () => void;
  onFullscreen?: () => void;
  isMetadataCollapsed: boolean;
  onToggleMetadata: () => void;
}

export function DocumentPreview({ document, onClose, onFullscreen, isMetadataCollapsed, onToggleMetadata }: DocumentPreviewProps) {
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
      
      <CardContent className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Document Preview Area */}
        <div className={`bg-muted rounded-lg p-4 flex items-center justify-center ${isMetadataCollapsed ? 'flex-1' : 'min-h-64'}`}>
          {document.thumbnailUrl ? (
            <img 
              src={document.thumbnailUrl} 
              alt={`Preview of ${document.name}`}
              className={`object-contain rounded ${isMetadataCollapsed ? 'max-h-full max-w-full' : 'max-w-full max-h-64'}`}
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
    </div>
  );
}