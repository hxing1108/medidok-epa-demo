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
import dokumentenklasseData from '@/data/dokumentenklasse.json';

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

  // Get the corresponding local document if it exists (for getting thumbnail)
  const correspondingLocalDoc =
    singleDocument &&
    localDocuments?.find(
      (localDoc) =>
        localDoc.name === singleDocument.name &&
        localDoc.author === singleDocument.author &&
        localDoc.creationDate === singleDocument.creationDate
    );

  // Function to get category display text based on context
  const getCategoryDisplayText = (category: string) => {
    if (isFromEPA || singleDocument?.importedFromEPA) {
      return (
        dokumentenklasseData.documentClasses[
          category as keyof typeof dokumentenklasseData.documentClasses
        ] || category
      );
    } else {
      return (
        dokumentenklasseData.localCategories[
          category as keyof typeof dokumentenklasseData.localCategories
        ] || category
      );
    }
  };

  // Function to get document type display text
  const getDocumentTypeDisplayText = (type: string) => {
    return (
      dokumentenklasseData.documentTypes[
        type as keyof typeof dokumentenklasseData.documentTypes
      ] || type
    );
  };

  // Function to get department display text
  const getDepartmentDisplayText = (department: string) => {
    if (department === '-' || !department) return '-';
    return (
      dokumentenklasseData.departments[
        department as keyof typeof dokumentenklasseData.departments
      ] || department
    );
  };

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
    <div className="h-full flex flex-col bg-white">
      <CardHeader className="border-b py-2 px-6">
        <div className="flex items-center justify-between">
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

      <CardContent
        className={`flex-1 flex flex-col overflow-y-auto ${
          (singleDocument && !isFromEPA && singleDocument.thumbnailUrl) ||
          isMultipleDocuments
            ? 'p-0'
            : 'p-4'
        }`}
      >
        {/* Document Preview Area */}
        {isMultipleDocuments ? (
          // Multi-document grid view
          <div
            className={`flex flex-col ${
              isMetadataCollapsed ? 'h-full flex-1' : 'min-h-64'
            }`}
          >
            <div
              className={`grid gap-1 flex-1 overflow-y-auto ${
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
              {documents!.slice(0, 9).map((doc, index) => {
                // Check if this specific document has been downloaded from EPA
                const isDocumentDownloaded =
                  localDocuments?.some(
                    (localDoc) =>
                      localDoc.name === doc.name &&
                      localDoc.author === doc.author &&
                      localDoc.creationDate === doc.creationDate
                  ) || false;

                // Get the corresponding local document for thumbnail
                const correspondingLocalDoc = localDocuments?.find(
                  (localDoc) =>
                    localDoc.name === doc.name &&
                    localDoc.author === doc.author &&
                    localDoc.creationDate === doc.creationDate
                );

                return (
                  <div
                    key={doc.id}
                    className="flex flex-col h-full min-h-[100px] relative"
                  >
                    {(doc.thumbnailUrl ||
                      (isDocumentDownloaded &&
                        correspondingLocalDoc?.thumbnailUrl)) &&
                    (!isFromEPA ||
                      doc.sharedFromLocal ||
                      doc.importedFromEPA ||
                      isDocumentDownloaded) ? (
                      <img
                        src={
                          doc.thumbnailUrl ||
                          correspondingLocalDoc?.thumbnailUrl ||
                          ''
                        }
                        alt={`Preview of ${doc.name}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex-1 flex items-center justify-center bg-muted">
                        {isFromEPA ? (
                          <img
                            src="/epa-icon.png"
                            alt="EPA Document"
                            className="w-8 h-8 opacity-60"
                          />
                        ) : (
                          <FileText className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1">
                      <p className="text-xs text-center truncate w-full">
                        {doc.name}
                      </p>
                    </div>
                  </div>
                );
              })}
              {documents!.length > 9 && (
                <div className="flex flex-col h-full min-h-[100px] bg-muted items-center justify-center">
                  <div className="text-xl font-bold text-muted-foreground">
                    +{documents!.length - 9}
                  </div>
                  <p className="text-xs text-center text-muted-foreground mt-1">
                    weitere
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : singleDocument &&
          (!isFromEPA ||
            singleDocument.sharedFromLocal ||
            singleDocument.importedFromEPA ||
            isAlreadyImported) ? (
          // Single document view - for non-EPA documents, shared from local, or downloaded EPA documents
          <div
            className={`${
              isMetadataCollapsed
                ? 'flex-1 flex items-center justify-center h-full'
                : 'flex items-center justify-center'
            }`}
          >
            {/* Use thumbnail from EPA document or corresponding local document */}
            {singleDocument.thumbnailUrl ||
            (isAlreadyImported && correspondingLocalDoc?.thumbnailUrl) ? (
              <img
                src={
                  singleDocument.thumbnailUrl ||
                  correspondingLocalDoc?.thumbnailUrl ||
                  ''
                }
                alt={`Preview of ${singleDocument.name}`}
                className={`object-cover ${
                  isMetadataCollapsed ? 'w-full h-full' : 'w-full h-auto'
                }`}
              />
            ) : // Only show FileText fallback for non-EPA documents or non-downloaded EPA docs
            isFromEPA && isAlreadyImported ? null : (
              <div className="text-center p-4">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  Dokumentvorschau für {singleDocument.name}
                </p>
              </div>
            )}
          </div>
        ) : singleDocument &&
          isFromEPA &&
          !singleDocument.sharedFromLocal &&
          !singleDocument.importedFromEPA &&
          !isAlreadyImported ? (
          // EPA document view - no preview, just a placeholder (only for original undownloaded EPA docs)
          <div className="bg-muted rounded-lg p-4 flex items-center justify-center min-h-64">
            <div className="text-center">
              <img
                src="/epa-icon.png"
                alt="EPA Document"
                className="w-16 h-16 mx-auto mb-4 opacity-60"
              />
              <p className="text-sm text-muted-foreground">
                EPA Dokument - Vorschau nur in lokaler Ansicht verfügbar
              </p>
            </div>
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
        <div className="border-t">
          <Collapsible
            open={!isMetadataCollapsed}
            onOpenChange={(open) => onToggleMetadata()}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-4 h-auto hover:bg-accent hover:bg-opacity-50 transition-colors duration-200 rounded-none"
              >
                <h3 className="font-semibold">Metadaten</h3>
                {isMetadataCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="space-y-4 mt-4 px-4">
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
                    {isFromEPA || singleDocument.importedFromEPA
                      ? 'Dokumentklasse:'
                      : 'Kategorie:'}
                  </span>
                  <p className="mt-1">
                    {getCategoryDisplayText(singleDocument.category)}
                  </p>
                </div>

                <div>
                  <span className="font-medium text-muted-foreground">
                    {isFromEPA || singleDocument.importedFromEPA
                      ? 'Dokumententyp:'
                      : 'Dateityp:'}
                  </span>
                  <p className="mt-1">
                    {getDocumentTypeDisplayText(singleDocument.type)}
                  </p>
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
                  <p className="mt-1">
                    {getDepartmentDisplayText(singleDocument.department)}
                  </p>
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
