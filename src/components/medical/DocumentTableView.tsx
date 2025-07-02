import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Document } from "./DocumentThumbnailView";

interface DocumentTableViewProps {
  documents: Document[];
  onBack: () => void;
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

export function DocumentTableView({ documents, onBack }: DocumentTableViewProps) {
  // Use mock data to match the screenshot
  const displayDocuments = mockDocuments;
  
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
            {displayDocuments.map((doc, index) => (
              <TableRow key={doc.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/10"}>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-8 bg-card border border-border rounded flex-shrink-0 flex items-center justify-center">
                      <div className="w-4 h-5 bg-muted rounded-sm"></div>
                    </div>
                    <span className="text-sm text-foreground">{doc.name}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-foreground">{doc.category}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-foreground">{doc.type}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-foreground">
                  <div>
                    <div>{doc.creationDate}</div>
                    <div className="text-xs text-muted-foreground">10:14</div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-foreground">{doc.author}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-muted-foreground">{doc.uploader}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-muted-foreground">{doc.department}</TableCell>
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