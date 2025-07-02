import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Document } from "./DocumentThumbnailView";

interface DocumentTableViewProps {
  documents: Document[];
  onBack: () => void;
}

export function DocumentTableView({ documents, onBack }: DocumentTableViewProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          ← Zurück zur Übersicht
        </Button>
      </div>
      
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
              <TableHead className="text-xs font-medium text-muted-foreground px-4 py-3"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc, index) => (
              <TableRow key={doc.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-8 bg-muted border rounded flex-shrink-0"></div>
                    <span className="text-sm">{doc.name}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm">{doc.category}</TableCell>
                <TableCell className="px-4 py-3 text-sm">{doc.type}</TableCell>
                <TableCell className="px-4 py-3 text-sm">
                  <div>
                    <div>{doc.creationDate}</div>
                    <div className="text-xs text-muted-foreground">10:14</div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm">{doc.author}</TableCell>
                <TableCell className="px-4 py-3 text-sm">-</TableCell>
                <TableCell className="px-4 py-3 text-sm">-</TableCell>
                <TableCell className="px-4 py-3">
                  <Button 
                    size="sm" 
                    className="h-8 px-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Button
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}