import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Download,
  Eye,
  FileText,
  X,
  ChevronDown,
  ChevronRight,
  Maximize,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Document } from './DocumentThumbnailView';

interface DocumentPreviewProps {
  document?: Document | null;
  documents?: Document[]; // For multi-select preview
  onClose?: () => void;
  onFullscreen?: () => void;
  onDownload?: (document: Document) => void;
  isMetadataCollapsed: boolean;
  onToggleMetadata: () => void;
  localDocuments?: Document[]; // Array of local documents to check for duplicates
  isFromEPA?: boolean; // Whether this document is from ePA tab
}

export function DocumentPreview({
  document,
  documents,
  onClose,
  onFullscreen,
  onDownload,
  isMetadataCollapsed,
  onToggleMetadata,
  localDocuments,
  isFromEPA,
}: DocumentPreviewProps) {
  const { toast } = useToast();

  // Determine if we're showing multiple documents or single document
  const isMultipleDocuments = documents && documents.length > 1;
  const singleDocument =
    document || (documents && documents.length === 1 ? documents[0] : null);

  // Check if this document is already imported to local (for single document view)
  const isAlreadyImported =
    (singleDocument &&
      localDocuments?.some(
        (localDoc) =>
          localDoc.name === singleDocument.name &&
          localDoc.author === singleDocument.author &&
          localDoc.creationDate === singleDocument.creationDate
      )) ||
    false;

  const handleDownload = async () => {
    if (!singleDocument) return;

    try {
      // Show loading state
      toast({
        title: 'Download gestartet',
        description: `${singleDocument.name} wird heruntergeladen...`,
      });

      // Simulate download process (replace with actual download logic)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Call the download handler to transfer document to local
      if (onDownload) {
        onDownload(singleDocument);
      }

      // Show success notification
      toast({
        title: 'Download erfolgreich',
        description: `${singleDocument.name} wurde erfolgreich heruntergeladen und lokal gespeichert.`,
        variant: 'default',
      });

      // TODO: Implement actual file download logic
      // TODO: Record download in document history
      // TODO: Forward to PVS system if needed
    } catch (error) {
      // Show error notification
      toast({
        title: 'Download fehlgeschlagen',
        description: `Fehler beim Herunterladen von ${singleDocument.name}. Bitte versuchen Sie es erneut.`,
        variant: 'destructive',
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

      <CardContent className="flex-1 p-4 flex flex-col overflow-y-auto">
        {/* Document Preview Area */}
        {isMultipleDocuments ? (
          // Multi-document grid view
          <div
            className={`bg-muted rounded-lg p-4 flex flex-col ${
              isMetadataCollapsed ? 'h-full flex-1' : 'min-h-64'
            }`}
          >
            <div className="text-center mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                {documents!.length} Dokumente ausgewählt
              </h3>
            </div>
            <div
              className={`grid gap-2 flex-1 overflow-y-auto ${
                documents!.length <= 2
                  ? 'grid-cols-1'
                  : documents!.length <= 4
                  ? 'grid-cols-2'
                  : documents!.length <= 6
                  ? 'grid-cols-3'
                  : 'grid-cols-3'
              } ${
                documents!.length <= 2
                  ? 'auto-rows-fr'
                  : documents!.length <= 4
                  ? 'auto-rows-fr'
                  : documents!.length <= 9
                  ? 'auto-rows-fr'
                  : 'auto-rows-fr'
              }`}
            >
              {documents!.slice(0, 9).map((doc, index) => (
                <div
                  key={doc.id}
                  className="bg-background rounded border p-2 flex flex-col justify-between h-full min-h-[100px]"
                >
                  {doc.thumbnailUrl ? (
                    <img
                      src={doc.thumbnailUrl}
                      alt={`Preview of ${doc.name}`}
                      className="w-full flex-1 object-cover rounded mb-2 min-h-[60px]"
                    />
                  ) : (
                    <div className="flex-1 flex items-center justify-center min-h-[60px]">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <p className="text-xs text-center text-muted-foreground truncate w-full">
                    {doc.name}
                  </p>
                </div>
              ))}
              {documents!.length > 9 && (
                <div className="bg-background rounded border p-2 flex flex-col justify-between h-full min-h-[100px]">
                  <div className="flex-1 flex items-center justify-center min-h-[60px]">
                    <div className="text-xl font-bold text-muted-foreground">
                      +{documents!.length - 9}
                    </div>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    weitere
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : singleDocument ? (
          // Single document view
          <div
            className={`bg-muted rounded-lg p-4 ${
              isMetadataCollapsed
                ? 'flex-1 flex items-center justify-center h-full'
                : 'flex items-center justify-center'
            }`}
          >
            {singleDocument.thumbnailUrl ? (
              <img
                src={singleDocument.thumbnailUrl}
                alt={`Preview of ${singleDocument.name}`}
                className={`object-contain rounded ${
                  isMetadataCollapsed
                    ? 'w-full h-full max-w-full max-h-full'
                    : 'max-w-full h-auto'
                }`}
              />
            ) : (
              <div className="text-center">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  Dokumentvorschau für {singleDocument.name}
                </p>
              </div>
            )}
          </div>
        ) : (
          // No document selected
          <div className="bg-muted rounded-lg p-4 flex items-center justify-center min-h-64">
            <div className="text-center">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">
                Wählen Sie ein Dokument aus, um eine Vorschau anzuzeigen
              </p>
            </div>
          </div>
        )}

        {/* Multi-document summary */}
        {isMultipleDocuments && (
          <div className="space-y-4 mt-4">
            <h3 className="font-semibold">Ausgewählte Dokumente</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {documents!.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm"
                >
                  <div className="flex-1">
                    <p className="font-medium truncate">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.author} • {doc.creationDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      {/* Document Metadata - Only show for single document, positioned above download button */}
      {singleDocument && !isMultipleDocuments && (
        <div className="border-t p-4">
          <Collapsible
            open={!isMetadataCollapsed}
            onOpenChange={(open) => onToggleMetadata()}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto"
              >
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
                  <span className="font-medium text-muted-foreground">
                    Titel:
                  </span>
                  <p className="mt-1">{singleDocument.name}</p>
                </div>

                <Separator />

                <div>
                  <span className="font-medium text-muted-foreground">
                    Kategorie:
                  </span>
                  <p className="mt-1">{singleDocument.category}</p>
                </div>

                <div>
                  <span className="font-medium text-muted-foreground">
                    Dokumenttyp:
                  </span>
                  <p className="mt-1">{singleDocument.type}</p>
                </div>

                <Separator />

                <div>
                  <span className="font-medium text-muted-foreground">
                    Erstellungsdatum:
                  </span>
                  <p className="mt-1">{singleDocument.creationDate}</p>
                </div>

                <div>
                  <span className="font-medium text-muted-foreground">
                    Upload-Datum:
                  </span>
                  <p className="mt-1">{singleDocument.uploadDate}</p>
                </div>

                <Separator />

                <div>
                  <span className="font-medium text-muted-foreground">
                    Autor:
                  </span>
                  <p className="mt-1">{singleDocument.author}</p>
                </div>

                <div>
                  <span className="font-medium text-muted-foreground">
                    Einsteller:
                  </span>
                  <p className="mt-1">{singleDocument.uploader}</p>
                </div>

                <div>
                  <span className="font-medium text-muted-foreground">
                    Fachgruppe:
                  </span>
                  <p className="mt-1">{singleDocument.department}</p>
                </div>

                <Separator />

                <div>
                  <span className="font-medium text-muted-foreground">
                    Dokument-ID:
                  </span>
                  <p className="mt-1">{singleDocument.id}</p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Download Section at Bottom - Only show for ePA documents */}
      {isFromEPA && (
        <div className="border-t p-4">
          <Button
            onClick={handleDownload}
            className="w-full"
            disabled={isAlreadyImported}
            variant={isAlreadyImported ? 'secondary' : 'default'}
          >
            <Download className="h-4 w-4 mr-2" />
            {isAlreadyImported
              ? 'Bereits importiert'
              : 'ePA zur lokalen Bilderliste herunterladen'}
          </Button>
        </div>
      )}
    </div>
  );
}
