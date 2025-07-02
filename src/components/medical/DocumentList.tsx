import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, ArrowUpDown } from "lucide-react";
import { Document } from "./DocumentThumbnailView";

interface DocumentListProps {
  documents: Document[];
  onSelectDocument: (document: Document) => void;
  selectedDocument: Document | null;
}

type SortField = 'name' | 'creationDate' | 'author' | 'category';
type SortDirection = 'asc' | 'desc';

export function DocumentList({ documents, onSelectDocument, selectedDocument }: DocumentListProps) {
  const [sortField, setSortField] = useState<SortField>('creationDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedDocuments = [...documents].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    if (sortField === 'creationDate') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });


  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button 
                variant="ghost" 
                onClick={() => handleSort('name')}
                className="h-auto p-0 font-semibold"
              >
                Dokumententitel
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button 
                variant="ghost" 
                onClick={() => handleSort('category')}
                className="h-auto p-0 font-semibold"
              >
                Kategorie
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Dokumenttyp</TableHead>
            <TableHead>
              <Button 
                variant="ghost" 
                onClick={() => handleSort('creationDate')}
                className="h-auto p-0 font-semibold"
              >
                Erstellungsdatum
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button 
                variant="ghost" 
                onClick={() => handleSort('author')}
                className="h-auto p-0 font-semibold"
              >
                Autor
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Einsteller</TableHead>
            <TableHead>Fachgruppe</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedDocuments.map((doc) => (
            <TableRow 
              key={doc.id} 
              className={`cursor-pointer hover:bg-muted/50 ${selectedDocument?.id === doc.id ? 'bg-accent' : ''}`}
              onClick={() => onSelectDocument(doc)}
            >
              <TableCell className="font-medium">{doc.name}</TableCell>
              <TableCell>{doc.category}</TableCell>
              <TableCell>{doc.type}</TableCell>
              <TableCell>{doc.creationDate}</TableCell>
              <TableCell>{doc.author}</TableCell>
              <TableCell>{doc.uploader}</TableCell>
              <TableCell>{doc.department}</TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDocument(doc);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle download
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}