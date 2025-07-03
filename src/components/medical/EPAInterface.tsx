import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Search, Filter, Import, ArrowUpDown, LayoutGrid, List, MoreHorizontal, Maximize2, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
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
  },
  // Dermatological examinations
  {
    id: "local3",
    name: "Hautläsion Unterbauch",
    category: "DERM",
    type: "FOT",
    creationDate: "30.06.2025",
    uploadDate: "30.06.2025",
    author: "Dr. Müller",
    uploader: "Dr. Müller",
    department: "Dermatologie",
    source: "local",
    pageCount: "3 Bilder",
    thumbnailUrl: "/lovable-uploads/897e15d5-167b-4e31-888b-45159123c762.png"
  },
  {
    id: "local4",
    name: "Erythematöse Läsion Rücken",
    category: "DERM", 
    type: "FOT",
    creationDate: "29.06.2025",
    uploadDate: "29.06.2025",
    author: "Dr. Müller",
    uploader: "Dr. Müller",
    department: "Dermatologie",
    source: "local",
    pageCount: "2 Bilder",
    thumbnailUrl: "/lovable-uploads/6eaa638f-8841-423b-9ed8-dee6aeba1c57.png"
  },
  {
    id: "local5",
    name: "Vaskuläre Läsion",
    category: "DERM",
    type: "FOT", 
    creationDate: "28.06.2025",
    uploadDate: "28.06.2025",
    author: "Dr. Müller",
    uploader: "Dr. Müller",
    department: "Dermatologie",
    source: "local",
    pageCount: "2 Bilder",
    thumbnailUrl: "/lovable-uploads/fa10067b-ca25-4731-b422-ab4948ba925c.png"
  },
  {
    id: "local6",
    name: "Hautveränderung Oberarm",
    category: "DERM",
    type: "FOT",
    creationDate: "27.06.2025",
    uploadDate: "27.06.2025", 
    author: "Dr. Müller",
    uploader: "Dr. Müller",
    department: "Dermatologie",
    source: "local",
    pageCount: "1 Bild",
    thumbnailUrl: "/lovable-uploads/49eec6c8-b17d-4064-8e1c-1722d7c0d7e1.png"
  },
  // Brain MRI scans
  {
    id: "local7",
    name: "MRT Kopf axial T2",
    category: "RAD",
    type: "BLD",
    creationDate: "26.06.2025",
    uploadDate: "26.06.2025",
    author: "Dr. Weber",
    uploader: "Dr. Weber", 
    department: "Radiologie",
    source: "local",
    pageCount: "24 Schnitte",
    thumbnailUrl: "/lovable-uploads/8e0e9323-7286-476e-a984-b0a45ff452f2.png"
  },
  {
    id: "local8",
    name: "MRT Kopf axial T1",
    category: "RAD",
    type: "BLD",
    creationDate: "26.06.2025",
    uploadDate: "26.06.2025",
    author: "Dr. Weber",
    uploader: "Dr. Weber",
    department: "Radiologie",
    source: "local",
    pageCount: "20 Schnitte", 
    thumbnailUrl: "/lovable-uploads/1ea6381e-64a6-4574-8292-9737114875f7.png"
  },
  {
    id: "local9",
    name: "MRT Kopf axial FLAIR",
    category: "RAD", 
    type: "BLD",
    creationDate: "26.06.2025",
    uploadDate: "26.06.2025",
    author: "Dr. Weber",
    uploader: "Dr. Weber",
    department: "Radiologie",
    source: "local",
    pageCount: "18 Schnitte",
    thumbnailUrl: "/lovable-uploads/884f88e2-1435-46d4-9e03-8ba89ff1ee51.png"
  },
  {
    id: "local10",
    name: "MRT Kopf sagittal T1",
    category: "RAD",
    type: "BLD", 
    creationDate: "26.06.2025",
    uploadDate: "26.06.2025",
    author: "Dr. Weber",
    uploader: "Dr. Weber",
    department: "Radiologie",
    source: "local",
    pageCount: "15 Schnitte",
    thumbnailUrl: "/lovable-uploads/4782d657-7249-47a1-9eaa-5ce20b7b5ca8.png"
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
  },
  {
    id: "epa3",
    name: "Neurologischer Befund Gina Ortmann",
    category: "BESC",
    type: "BEF",
    creationDate: "14.03.1991",
    uploadDate: "14.03.1991",
    author: "Dr. med. Kathrin Hilbert",
    uploader: "-",
    department: "Neurologie",
    source: "epa",
    pageCount: "2 Seiten",
    thumbnailUrl: "/lovable-uploads/8cae94e0-2f38-4e68-8c3a-892c27d9737d.png"
  },
  {
    id: "epa4", 
    name: "Echokardiographie Sylvia",
    category: "BESC",
    type: "BEF",
    creationDate: "24.10.64",
    uploadDate: "24.10.64",
    author: "Dr. med. Frank Towae",
    uploader: "-",
    department: "Kardiologie",
    source: "epa",
    pageCount: "1 Seite",
    thumbnailUrl: "/lovable-uploads/ab9f6edf-0cba-4d66-91a9-bc06361442ab.png"
  },
  {
    id: "epa5",
    name: "Histopathologischer Befund Sofie Buchinger",
    category: "BESC", 
    type: "BEF",
    creationDate: "04.08.2022",
    uploadDate: "08.08.2022",
    author: "Pathologie Ingolstadt",
    uploader: "-",
    department: "Pathologie",
    source: "epa",
    pageCount: "2 Seiten",
    thumbnailUrl: "/lovable-uploads/6f562a21-8024-4997-af46-2b5ab9795ab5.png"
  },
  {
    id: "epa6",
    name: "Befundbericht Sina Hazet",
    category: "BESC",
    type: "BEF", 
    creationDate: "04.05.2022",
    uploadDate: "04.05.2022",
    author: "Priv.-Doz. Dr. med. Thomas Schmidt",
    uploader: "-",
    department: "Neurologie",
    source: "epa",
    pageCount: "2 Seiten",
    thumbnailUrl: "/lovable-uploads/12077eaa-68d7-48ce-b4cc-abf50d07abbb.png"
  },
  {
    id: "epa7",
    name: "eArztbrief Monika Möbius",
    category: "BRIEF",
    type: "EIN",
    creationDate: "08.05.2023",
    uploadDate: "08.05.2023", 
    author: "Dr.med. Kemal Cabadag",
    uploader: "-",
    department: "Onkologie",
    source: "epa",
    pageCount: "1 Seite",
    thumbnailUrl: "/lovable-uploads/e193902b-cc7a-47da-b505-65107a38930e.png"
  },
  {
    id: "epa8",
    name: "Ileo-/Koloskopie Stefanie Welsch-Seibel", 
    category: "BESC",
    type: "BEF",
    creationDate: "15.12.2022",
    uploadDate: "15.12.2022",
    author: "Dr. Frank Küppers",
    uploader: "-", 
    department: "Gastroenterologie",
    source: "epa",
    pageCount: "1 Seite",
    thumbnailUrl: "/lovable-uploads/62f8033e-7725-4828-b0d5-1265c6405663.png"
  }
];

export function EPAInterface() {
  const [currentTab, setCurrentTab] = useState<'lokal' | 'epa'>('lokal');
  const [viewMode, setViewMode] = useState<'thumbnail' | 'table'>('thumbnail');
  const [selectedDocuments, setSelectedDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isMetadataCollapsed, setIsMetadataCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [panelSizes, setPanelSizes] = useState([65, 35]);
  const [localDocumentsList, setLocalDocumentsList] = useState<Document[]>(localDocuments);
  const [importedEpaDocumentIds, setImportedEpaDocumentIds] = useState<Set<string>>(new Set());
  
  // New toolbar state
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'category' | 'author'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [activeFilters, setActiveFilters] = useState<{
    category: string[];
    type: string[];
    dateRange: { from?: string; to?: string };
    author: string[];
  }>({
    category: [],
    type: [],
    dateRange: {},
    author: []
  });

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

  // Filter and search functions
  const filterAndSortDocuments = (documents: Document[]) => {
    let filtered = [...documents];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(query) ||
        doc.author.toLowerCase().includes(query) ||
        doc.category.toLowerCase().includes(query) ||
        doc.department?.toLowerCase().includes(query)
      );
    }

    // Apply category filters
    if (activeFilters.category.length > 0) {
      filtered = filtered.filter(doc => activeFilters.category.includes(doc.category));
    }

    // Apply type filters
    if (activeFilters.type.length > 0) {
      filtered = filtered.filter(doc => activeFilters.type.includes(doc.type));
    }

    // Apply author filters
    if (activeFilters.author.length > 0) {
      filtered = filtered.filter(doc => activeFilters.author.includes(doc.author));
    }

    // Apply date range filter
    if (activeFilters.dateRange.from || activeFilters.dateRange.to) {
      filtered = filtered.filter(doc => {
        const docDate = new Date(doc.creationDate.split('.').reverse().join('-'));
        const fromDate = activeFilters.dateRange.from ? new Date(activeFilters.dateRange.from) : null;
        const toDate = activeFilters.dateRange.to ? new Date(activeFilters.dateRange.to) : null;
        
        if (fromDate && docDate < fromDate) return false;
        if (toDate && docDate > toDate) return false;
        return true;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | Date;
      let bValue: string | Date;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'date':
          aValue = new Date(a.creationDate.split('.').reverse().join('-'));
          bValue = new Date(b.creationDate.split('.').reverse().join('-'));
          break;
        case 'category':
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        case 'author':
          aValue = a.author.toLowerCase();
          bValue = b.author.toLowerCase();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  const handleSort = (field: 'name' | 'date' | 'category' | 'author') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleFilterChange = (filterType: keyof typeof activeFilters, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      category: [],
      type: [],
      dateRange: {},
      author: []
    });
    setSearchQuery('');
  };

  const getActiveFilterCount = () => {
    return activeFilters.category.length + 
           activeFilters.type.length + 
           activeFilters.author.length +
           (activeFilters.dateRange.from || activeFilters.dateRange.to ? 1 : 0) +
           (searchQuery.trim() ? 1 : 0);
  };

  // Get filtered documents for current tab
  const getCurrentDocuments = () => {
    const documents = currentTab === 'lokal' ? localDocumentsList : epaDocuments;
    return filterAndSortDocuments(documents);
  };

  // Get unique values for filter options
  const getFilterOptions = () => {
    const documents = currentTab === 'lokal' ? localDocumentsList : epaDocuments;
    return {
      categories: [...new Set(documents.map(doc => doc.category))],
      types: [...new Set(documents.map(doc => doc.type))],
      authors: [...new Set(documents.map(doc => doc.author))]
    };
  };

  const handleDownloadDocument = (document: Document) => {
    // Convert ePA document to local document
    const localDocument: Document = {
      ...document,
      id: `local_${Date.now()}`, // Generate new local ID
      source: "local",
      importedFromEPA: true,
      uploadDate: new Date().toLocaleDateString('de-DE'),
    };

    // Add to local documents list
    setLocalDocumentsList(prev => [...prev, localDocument]);
    
    // Mark the original ePA document as imported
    setImportedEpaDocumentIds(prev => new Set(prev).add(document.id));
    
    // Switch to local tab to show the downloaded document
    setCurrentTab('lokal');
    
    // Auto-select the newly downloaded document
    setSelectedDocument(localDocument);
  };

  // Filter Bar Component
  const FilterBar = () => {
    const filterOptions = getFilterOptions();
    
    if (!showFilters) return null;

    return (
      <div className="border-b bg-gray-50 px-6 py-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium">Filter</h3>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="h-7 px-2 text-xs"
            >
              Zurücksetzen
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowFilters(false)}
              className="h-7 w-7 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {/* Category Filter */}
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Kategorie</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full justify-between h-8">
                  <span className="text-xs">
                    {activeFilters.category.length ? `${activeFilters.category.length} selected` : 'Alle'}
                  </span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {filterOptions.categories.map(category => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={activeFilters.category.includes(category)}
                    onCheckedChange={(checked) => {
                      const newCategories = checked
                        ? [...activeFilters.category, category]
                        : activeFilters.category.filter(c => c !== category);
                      handleFilterChange('category', newCategories);
                    }}
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Type Filter */}
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Typ</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full justify-between h-8">
                  <span className="text-xs">
                    {activeFilters.type.length ? `${activeFilters.type.length} selected` : 'Alle'}
                  </span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {filterOptions.types.map(type => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={activeFilters.type.includes(type)}
                    onCheckedChange={(checked) => {
                      const newTypes = checked
                        ? [...activeFilters.type, type]
                        : activeFilters.type.filter(t => t !== type);
                      handleFilterChange('type', newTypes);
                    }}
                  >
                    {type}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Author Filter */}
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Autor</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full justify-between h-8">
                  <span className="text-xs">
                    {activeFilters.author.length ? `${activeFilters.author.length} selected` : 'Alle'}
                  </span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {filterOptions.authors.map(author => (
                  <DropdownMenuCheckboxItem
                    key={author}
                    checked={activeFilters.author.includes(author)}
                    onCheckedChange={(checked) => {
                      const newAuthors = checked
                        ? [...activeFilters.author, author]
                        : activeFilters.author.filter(a => a !== author);
                      handleFilterChange('author', newAuthors);
                    }}
                  >
                    {author}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Datum</label>
            <div className="flex gap-1">
              <Input
                type="date"
                value={activeFilters.dateRange.from || ''}
                onChange={(e) => handleFilterChange('dateRange', { ...activeFilters.dateRange, from: e.target.value })}
                className="h-8 text-xs"
                placeholder="Von"
              />
              <Input
                type="date"
                value={activeFilters.dateRange.to || ''}
                onChange={(e) => handleFilterChange('dateRange', { ...activeFilters.dateRange, to: e.target.value })}
                className="h-8 text-xs"
                placeholder="Bis"
              />
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {getActiveFilterCount() > 0 && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t">
            <span className="text-xs text-gray-600">Aktive Filter:</span>
            {activeFilters.category.map(cat => (
              <Badge key={cat} variant="secondary" className="text-xs">
                {cat}
                <button 
                  onClick={() => handleFilterChange('category', activeFilters.category.filter(c => c !== cat))}
                  className="ml-1 hover:bg-gray-300 rounded-full"
                >
                  <X className="h-2 w-2" />
                </button>
              </Badge>
            ))}
            {activeFilters.type.map(type => (
              <Badge key={type} variant="secondary" className="text-xs">
                {type}
                <button 
                  onClick={() => handleFilterChange('type', activeFilters.type.filter(t => t !== type))}
                  className="ml-1 hover:bg-gray-300 rounded-full"
                >
                  <X className="h-2 w-2" />
                </button>
              </Badge>
            ))}
            {activeFilters.author.map(author => (
              <Badge key={author} variant="secondary" className="text-xs">
                {author}
                <button 
                  onClick={() => handleFilterChange('author', activeFilters.author.filter(a => a !== author))}
                  className="ml-1 hover:bg-gray-300 rounded-full"
                >
                  <X className="h-2 w-2" />
                </button>
              </Badge>
            ))}
            {searchQuery && (
              <Badge variant="secondary" className="text-xs">
                Suche: {searchQuery}
                <button 
                  onClick={() => setSearchQuery('')}
                  className="ml-1 hover:bg-gray-300 rounded-full"
                >
                  <X className="h-2 w-2" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>
    );
  };

  const currentDocuments = currentTab === 'lokal' ? localDocumentsList : epaDocuments;

  // Fullscreen overlay
  if (isFullscreen && selectedDocument) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <DocumentPreview 
          document={selectedDocument} 
          onClose={handleExitFullscreen}
          onFullscreen={() => {}} // No-op since we're already in fullscreen
          onDownload={handleDownloadDocument}
          isMetadataCollapsed={isMetadataCollapsed}
          onToggleMetadata={handleToggleMetadata}
          localDocuments={localDocumentsList}
          isFromEPA={currentTab === 'epa'}
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {selectedDocument ? (
          <ResizablePanelGroup 
            direction="horizontal" 
            className="h-full" 
            onLayout={(sizes) => setPanelSizes(sizes)}
          >
            <ResizablePanel defaultSize={panelSizes[0]} minSize={30}>
              <div className="h-full flex flex-col">
                {/* Tab Navigation for Bilderlist only */}
                <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as 'lokal' | 'epa')} className="h-full flex flex-col">
              <div className="p-6 pb-0">
                <div className="flex items-center justify-between mb-4">
                  <TabsList className="h-8 bg-transparent p-0 border-none">
                    <TabsTrigger 
                      value="lokal" 
                      className="h-8 px-3 text-sm bg-blue-100 data-[state=active]:bg-blue-200 data-[state=active]:text-blue-900 rounded-sm mr-1"
                    >
                      Lokal
                    </TabsTrigger>
                    <TabsTrigger 
                      value="epa"
                      className="h-8 px-3 text-sm bg-gray-100 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 rounded-sm mr-1"
                    >
                      ePA
                    </TabsTrigger>
                    <TabsTrigger 
                      value="plus"
                      className="h-8 px-3 text-sm bg-gray-100 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 rounded-sm"
                    >
                      +
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Enhanced Toolbar Buttons */}
                  <div className="flex items-center gap-1">
                    {/* Sort Button */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`h-8 w-8 p-0 ${sortBy !== 'date' || sortOrder !== 'desc' ? 'bg-blue-100' : ''}`}
                        >
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Sortieren nach</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleSort('name')}>
                          Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSort('date')}>
                          Datum {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSort('category')}>
                          Kategorie {sortBy === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSort('author')}>
                          Autor {sortBy === 'author' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Filter Button */}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`h-8 w-8 p-0 ${showFilters || getActiveFilterCount() > 0 ? 'bg-blue-100' : ''}`}
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <Filter className="h-4 w-4" />
                      {getActiveFilterCount() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {getActiveFilterCount()}
                        </span>
                      )}
                    </Button>

                    {/* Search Input */}
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Zum Suchen eingeben..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-8 w-48 text-xs pl-8"
                      />
                      <Search className="h-3 w-3 absolute left-2 top-2.5 text-gray-400" />
                      {searchQuery && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-6 w-6 p-0"
                          onClick={() => setSearchQuery('')}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>

                    {/* Layout Toggle */}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => setViewMode(viewMode === 'thumbnail' ? 'table' : 'thumbnail')}
                    >
                      {viewMode === 'thumbnail' ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
                    </Button>

                    {/* More Options Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={clearFilters}>
                          Filter zurücksetzen
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setViewMode('thumbnail')}>
                          Kachel-Ansicht
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setViewMode('table')}>
                          Listen-Ansicht
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          Exportieren
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Import Button */}
                    <Button variant="outline" size="sm" className="h-8 px-3 text-xs bg-white">
                      <Import className="h-3 w-3 mr-1" />
                      Import
                    </Button>
                  </div>
                </div>
              </div>

              {/* Filter Bar */}
              <FilterBar />
                  
                  <TabsContent value="lokal" className="flex-1 min-h-0 mt-0">
                    <div className="h-full overflow-y-auto px-6">
                      {viewMode === 'thumbnail' ? (
                        <DocumentThumbnailView 
                          onViewDetails={handleViewDetails} 
                          onDocumentSelect={handleDocumentSelect}
                          documents={getCurrentDocuments()}
                          localDocuments={localDocumentsList}
                          isFromEPA={false}
                          importedEpaDocumentIds={importedEpaDocumentIds}
                        />
                      ) : (
                        <DocumentTableView documents={selectedDocuments} onBack={handleBackToThumbnails} />
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="epa" className="flex-1 min-h-0 mt-0">
                    <div className="h-full overflow-y-auto px-6">
                      <DocumentThumbnailView 
                        onViewDetails={handleViewDetails} 
                        documents={getCurrentDocuments()}
                        onDocumentSelect={handleDocumentSelect}
                        localDocuments={localDocumentsList}
                        isFromEPA={true}
                        importedEpaDocumentIds={importedEpaDocumentIds}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="plus" className="flex-1 min-h-0 mt-0">
                    <div className="h-full overflow-y-auto px-6">
                      <div className="text-center text-muted-foreground">
                        Tab "+" noch nicht implementiert
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={panelSizes[1]} minSize={25}>
              <div className="bg-card h-full">
                <DocumentPreview 
                  document={selectedDocument} 
                  onClose={() => setSelectedDocument(null)}
                  onFullscreen={handleFullscreen}
                  onDownload={handleDownloadDocument}
                  isMetadataCollapsed={isMetadataCollapsed}
                  onToggleMetadata={handleToggleMetadata}
                  localDocuments={localDocumentsList}
                  isFromEPA={currentTab === 'epa'}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <div className="h-full flex flex-col">
            {/* Tab Navigation for Bilderlist only */}
            <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as 'lokal' | 'epa')} className="h-full flex flex-col">
              <div className="p-6 pb-0">
                <div className="flex items-center justify-between mb-4">
                  <TabsList className="h-8 bg-transparent p-0 border-none">
                    <TabsTrigger 
                      value="lokal" 
                      className="h-8 px-3 text-sm bg-blue-100 data-[state=active]:bg-blue-200 data-[state=active]:text-blue-900 rounded-sm mr-1"
                    >
                      Lokal
                    </TabsTrigger>
                    <TabsTrigger 
                      value="epa"
                      className="h-8 px-3 text-sm bg-gray-100 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 rounded-sm mr-1"
                    >
                      ePA
                    </TabsTrigger>
                    <TabsTrigger 
                      value="plus"
                      className="h-8 px-3 text-sm bg-gray-100 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 rounded-sm"
                    >
                      +
                    </TabsTrigger>
                  </TabsList>

                  {/* Enhanced Toolbar Buttons for full screen */}
                  <div className="flex items-center gap-1">
                    {/* Sort Button */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`h-8 w-8 p-0 ${sortBy !== 'date' || sortOrder !== 'desc' ? 'bg-blue-100' : ''}`}
                        >
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Sortieren nach</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleSort('name')}>
                          Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSort('date')}>
                          Datum {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSort('category')}>
                          Kategorie {sortBy === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSort('author')}>
                          Autor {sortBy === 'author' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Filter Button */}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`h-8 w-8 p-0 ${showFilters || getActiveFilterCount() > 0 ? 'bg-blue-100' : ''}`}
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <Filter className="h-4 w-4" />
                      {getActiveFilterCount() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {getActiveFilterCount()}
                        </span>
                      )}
                    </Button>

                    {/* Search Input */}
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Zum Suchen eingeben..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-8 w-48 text-xs pl-8"
                      />
                      <Search className="h-3 w-3 absolute left-2 top-2.5 text-gray-400" />
                      {searchQuery && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-6 w-6 p-0"
                          onClick={() => setSearchQuery('')}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>

                    {/* Layout Toggle */}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => setViewMode(viewMode === 'thumbnail' ? 'table' : 'thumbnail')}
                    >
                      {viewMode === 'thumbnail' ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
                    </Button>

                    {/* More Options Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={clearFilters}>
                          Filter zurücksetzen
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setViewMode('thumbnail')}>
                          Kachel-Ansicht
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setViewMode('table')}>
                          Listen-Ansicht
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          Exportieren
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Import Button */}
                    <Button variant="outline" size="sm" className="h-8 px-3 text-xs bg-white">
                      <Import className="h-3 w-3 mr-1" />
                      Import
                    </Button>
                  </div>
                </div>
              </div>

              {/* Filter Bar for full screen */}
              <FilterBar />
              
              <TabsContent value="lokal" className="flex-1 min-h-0 mt-0">
                <div className="h-full overflow-y-auto px-6">
                  {viewMode === 'thumbnail' ? (
                    <DocumentThumbnailView 
                      onViewDetails={handleViewDetails} 
                      onDocumentSelect={handleDocumentSelect}
                      documents={getCurrentDocuments()}
                      localDocuments={localDocumentsList}
                      isFromEPA={false}
                      importedEpaDocumentIds={importedEpaDocumentIds}
                    />
                  ) : (
                    <DocumentTableView documents={selectedDocuments} onBack={handleBackToThumbnails} />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="epa" className="flex-1 min-h-0 mt-0">
                <div className="h-full overflow-y-auto px-6">
                  <DocumentThumbnailView 
                    onViewDetails={handleViewDetails} 
                    documents={getCurrentDocuments()}
                    onDocumentSelect={handleDocumentSelect}
                    localDocuments={localDocumentsList}
                    isFromEPA={true}
                    importedEpaDocumentIds={importedEpaDocumentIds}
                  />
                </div>
              </TabsContent>

              <TabsContent value="plus" className="flex-1 min-h-0 mt-0">
                <div className="h-full overflow-y-auto px-6">
                  <div className="text-center text-muted-foreground">
                    Tab "+" noch nicht implementiert
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}