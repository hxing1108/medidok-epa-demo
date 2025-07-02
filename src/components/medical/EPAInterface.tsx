import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentList } from "./DocumentList";
import { StatusIndicator } from "./StatusIndicator";
import { DocumentPreview } from "./DocumentPreview";
import { Upload, Download, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface Document {
  id: string;
  name: string;
  category: string;
  type: string;
  creationDate: string;
  uploadDate: string;
  author: string;
  uploader: string;
  department: string;
  isLocal: boolean;
  isOwn: boolean;
  isNew?: boolean;
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Patienteneinverständnis Behandlung",
    category: "BESC",
    type: "LEI",
    creationDate: "08.11.2021",
    uploadDate: "08.11.2021",
    author: "Dr. Christian Ummerle",
    uploader: "Dr. Christian Ummerle",
    department: "Dermatologie",
    isLocal: true,
    isOwn: true
  },
  {
    id: "2",
    name: "Befundbericht Hautläsion",
    category: "BESC",
    type: "BEF",
    creationDate: "15.11.2021",
    uploadDate: "15.11.2021",
    author: "Dr. Lisa Gruber",
    uploader: "Dr. Lisa Gruber",
    department: "Dermatologie",
    isLocal: false,
    isOwn: false,
    isNew: true
  },
  {
    id: "3",
    name: "Wundbeurteilung Sonografie",
    category: "BILD",
    type: "SON",
    creationDate: "20.11.2021",
    uploadDate: "21.11.2021",
    author: "Dr. Peter Schmidt",
    uploader: "System",
    department: "Radiologie",
    isLocal: true,
    isOwn: false
  },
  {
    id: "4",
    name: "Einstellbrief Onkologie",
    category: "BRIEF",
    type: "EIN",
    creationDate: "25.11.2021",
    uploadDate: "25.11.2021",
    author: "Dr. Maria Weber",
    uploader: "Dr. Maria Weber",
    department: "Onkologie",
    isLocal: false,
    isOwn: false,
    isNew: true
  }
];

export function EPAInterface() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'warning' | 'error' | 'offline'>('connected');

  const filteredDocuments = mockDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-foreground">mediDOK 2.5</h1>
            <StatusIndicator status={connectionStatus} />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Einstellungen
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1 p-6">
          <Tabs defaultValue="epa" className="h-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="workflow">Workflow</TabsTrigger>
              <TabsTrigger value="bilderliste">Bilderliste</TabsTrigger>
              <TabsTrigger value="epa">ePA</TabsTrigger>
            </TabsList>

            <TabsContent value="epa" className="mt-6 h-full">
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Elektronische Patientenakte</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Dokumente durchsuchen..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <Button size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <DocumentList
                    documents={filteredDocuments}
                    onSelectDocument={setSelectedDocument}
                    selectedDocument={selectedDocument}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="workflow" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Workflow</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Workflow-Funktionen werden hier angezeigt.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bilderliste" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bilderliste</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Bilder-Verwaltung wird hier angezeigt.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Document Preview Sidebar */}
        {selectedDocument && (
          <div className="w-96 border-l bg-card">
            <DocumentPreview document={selectedDocument} />
          </div>
        )}
      </div>
    </div>
  );
}