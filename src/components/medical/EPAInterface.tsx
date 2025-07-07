import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import {
  Search,
  Filter,
  Import,
  ArrowUpDown,
  LayoutGrid,
  List,
  MoreHorizontal,
  Maximize2,
  X,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Calendar,
  User,
  FileText,
  Settings,
  Plus,
  RotateCcw,
  Share,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { DocumentThumbnailView, Document } from './DocumentThumbnailView';
import { DocumentTableView } from './DocumentTableView';
import { DocumentPreview } from './DocumentPreview';
import ctThoraxPreview from '@/assets/ct-thorax-preview.jpg';
import mrtKopfPreview from '@/assets/mrt-kopf-preview.jpg';
import consentFormPreview from '@/assets/consent-form-preview.jpg';
import labResultsPreview from '@/assets/lab-results-preview.jpg';
import einstellbriefPreview from '@/assets/einstellbrief-preview.jpg';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

// Mock data for local documents (Bilderliste)
const localDocuments: Document[] = [
  {
    id: 'local1',
    name: 'CT Thorax',
    category: 'RAD',
    type: 'BLD',
    creationDate: '02.07.2025',
    uploadDate: '02.07.2025',
    author: 'Dr. Schmidt',
    uploader: 'Dr. Schmidt',
    department: 'RAD',
    source: 'local',
    pageCount: '1 Seite',
    thumbnailUrl: ctThoraxPreview,
  },
  {
    id: 'local2',
    name: 'MRT Kopf',
    category: 'RAD',
    type: 'BLD',
    creationDate: '01.07.2025',
    uploadDate: '01.07.2025',
    author: 'Dr. Weber',
    uploader: 'Dr. Weber',
    department: 'RAD',
    source: 'local',
    pageCount: '1 Seite',
    thumbnailUrl: mrtKopfPreview,
  },
  // Dermatological examinations
  {
    id: 'local3',
    name: 'Hautläsion Unterbauch',
    category: 'DERM',
    type: 'FOT',
    creationDate: '30.06.2025',
    uploadDate: '30.06.2025',
    author: 'Dr. Müller',
    uploader: 'Dr. Müller',
    department: 'DERM',
    source: 'local',
    pageCount: '3 Bilder',
    thumbnailUrl: '/lovable-uploads/897e15d5-167b-4e31-888b-45159123c762.png',
  },
  {
    id: 'local4',
    name: 'Erythematöse Läsion Rücken',
    category: 'DERM',
    type: 'FOT',
    creationDate: '29.06.2025',
    uploadDate: '29.06.2025',
    author: 'Dr. Müller',
    uploader: 'Dr. Müller',
    department: 'DERM',
    source: 'local',
    pageCount: '2 Bilder',
    thumbnailUrl: '/lovable-uploads/6eaa638f-8841-423b-9ed8-dee6aeba1c57.png',
  },
  {
    id: 'local5',
    name: 'Vaskuläre Läsion',
    category: 'DERM',
    type: 'FOT',
    creationDate: '28.06.2025',
    uploadDate: '28.06.2025',
    author: 'Dr. Müller',
    uploader: 'Dr. Müller',
    department: 'DERM',
    source: 'local',
    pageCount: '2 Bilder',
    thumbnailUrl: '/lovable-uploads/fa10067b-ca25-4731-b422-ab4948ba925c.png',
  },
  {
    id: 'local6',
    name: 'Hautveränderung Oberarm',
    category: 'DERM',
    type: 'FOT',
    creationDate: '27.06.2025',
    uploadDate: '27.06.2025',
    author: 'Dr. Müller',
    uploader: 'Dr. Müller',
    department: 'DERM',
    source: 'local',
    pageCount: '1 Bild',
    thumbnailUrl: '/lovable-uploads/49eec6c8-b17d-4064-8e1c-1722d7c0d7e1.png',
  },
  // Brain MRI scans
  {
    id: 'local7',
    name: 'MRT Kopf axial T2',
    category: 'RAD',
    type: 'BLD',
    creationDate: '26.06.2025',
    uploadDate: '26.06.2025',
    author: 'Dr. Weber',
    uploader: 'Dr. Weber',
    department: 'RAD',
    source: 'local',
    pageCount: '24 Schnitte',
    thumbnailUrl: '/lovable-uploads/8e0e9323-7286-476e-a984-b0a45ff452f2.png',
  },
  {
    id: 'local8',
    name: 'MRT Kopf axial T1',
    category: 'RAD',
    type: 'BLD',
    creationDate: '26.06.2025',
    uploadDate: '26.06.2025',
    author: 'Dr. Weber',
    uploader: 'Dr. Weber',
    department: 'RAD',
    source: 'local',
    pageCount: '20 Schnitte',
    thumbnailUrl: '/lovable-uploads/1ea6381e-64a6-4574-8292-9737114875f7.png',
  },
  {
    id: 'local9',
    name: 'MRT Kopf axial FLAIR',
    category: 'RAD',
    type: 'BLD',
    creationDate: '26.06.2025',
    uploadDate: '26.06.2025',
    author: 'Dr. Weber',
    uploader: 'Dr. Weber',
    department: 'RAD',
    source: 'local',
    pageCount: '18 Schnitte',
    thumbnailUrl: '/lovable-uploads/884f88e2-1435-46d4-9e03-8ba89ff1ee51.png',
  },
  {
    id: 'local10',
    name: 'MRT Kopf sagittal T1',
    category: 'RAD',
    type: 'BLD',
    creationDate: '26.06.2025',
    uploadDate: '26.06.2025',
    author: 'Dr. Weber',
    uploader: 'Dr. Weber',
    department: 'RAD',
    source: 'local',
    pageCount: '15 Schnitte',
    thumbnailUrl: '/lovable-uploads/4782d657-7249-47a1-9eaa-5ce20b7b5ca8.png',
  },
  {
    id: 'local11',
    name: 'Einstellbrief',
    category: 'BRIEF',
    type: 'EIN',
    creationDate: '03.07.2025',
    uploadDate: '03.07.2025',
    author: 'Dr. Zimmermann',
    uploader: 'Dr. Zimmermann',
    department: 'ALLG',
    source: 'local',
    pageCount: '1 Seite',
    thumbnailUrl: einstellbriefPreview,
  },
];

// Mock data for ePA documents
const epaDocuments: Document[] = [
  {
    id: 'epa1',
    name: 'Patienteneinverständnis...',
    category: 'EINVERST',
    type: 'LEI',
    creationDate: '08.11.2021',
    uploadDate: '08.11.2021',
    author: 'Dr. Christian Ummerle',
    uploader: '-',
    department: '-',
    source: 'epa',
    importedFromEPA: true,
    pageCount: '2 Seiten',
    thumbnailUrl: consentFormPreview,
  },
  {
    id: 'epa2',
    name: 'Laborwerte Blutbild',
    category: 'LAB',
    type: 'DIA',
    creationDate: '05.11.2021',
    uploadDate: '05.11.2021',
    author: 'Dr. Müller',
    uploader: '-',
    department: 'LABOR',
    source: 'epa',
    importedFromEPA: true,
    pageCount: '3 Seiten',
    thumbnailUrl: labResultsPreview,
  },
  {
    id: 'epa3',
    name: 'Neurologischer Befund Gina Ortmann',
    category: 'BESC',
    type: 'DIA',
    creationDate: '14.03.1991',
    uploadDate: '14.03.1991',
    author: 'Dr. med. Kathrin Hilbert',
    uploader: '-',
    department: 'NEURO',
    source: 'epa',
    pageCount: '2 Seiten',
    thumbnailUrl: '/lovable-uploads/8cae94e0-2f38-4e68-8c3a-892c27d9737d.png',
  },
  {
    id: 'epa4',
    name: 'Echokardiographie Sylvia',
    category: 'PROTO',
    type: 'FUN',
    creationDate: '24.10.64',
    uploadDate: '24.10.64',
    author: 'Dr. med. Frank Towae',
    uploader: '-',
    department: 'KARDIO',
    source: 'epa',
    pageCount: '1 Seite',
    thumbnailUrl: '/lovable-uploads/ab9f6edf-0cba-4d66-91a9-bc06361442ab.png',
  },
  {
    id: 'epa5',
    name: 'Histopathologischer Befund Sofie Buchinger',
    category: 'GUTACH',
    type: 'PAT',
    creationDate: '04.08.2022',
    uploadDate: '08.08.2022',
    author: 'Pathologie Ingolstadt',
    uploader: '-',
    department: 'PATHO',
    source: 'epa',
    pageCount: '2 Seiten',
    thumbnailUrl: '/lovable-uploads/6f562a21-8024-4997-af46-2b5ab9795ab5.png',
  },
  {
    id: 'epa6',
    name: 'Befundbericht Sina Hazet',
    category: 'BESC',
    type: 'DIA',
    creationDate: '04.05.2022',
    uploadDate: '04.05.2022',
    author: 'Priv.-Doz. Dr. med. Thomas Schmidt',
    uploader: '-',
    department: 'NEURO',
    source: 'epa',
    pageCount: '2 Seiten',
    thumbnailUrl: '/lovable-uploads/12077eaa-68d7-48ce-b4cc-abf50d07abbb.png',
  },
  {
    id: 'epa7',
    name: 'eArztbrief Monika Möbius',
    category: 'BRIEF',
    type: 'EIN',
    creationDate: '08.05.2023',
    uploadDate: '08.05.2023',
    author: 'Dr.med. Kemal Cabadag',
    uploader: '-',
    department: 'IONKO',
    source: 'epa',
    pageCount: '1 Seite',
    thumbnailUrl: '/lovable-uploads/e193902b-cc7a-47da-b505-65107a38930e.png',
  },
  {
    id: 'epa8',
    name: 'Ileo-/Koloskopie Stefanie Welsch-Seibel',
    category: 'PROTO',
    type: 'FUN',
    creationDate: '15.12.2022',
    uploadDate: '15.12.2022',
    author: 'Dr. Frank Küppers',
    uploader: '-',
    department: 'GASTRO',
    source: 'epa',
    pageCount: '1 Seite',
    thumbnailUrl: '/lovable-uploads/62f8033e-7725-4828-b0d5-1265c6405663.png',
  },
];

type PanelType = 'sorting' | 'filter' | 'options' | null;

export function EPAInterface() {
  const [currentTab, setCurrentTab] = useState<'lokal' | 'epa'>('lokal');
  const [viewMode, setViewMode] = useState<'thumbnail' | 'table'>('thumbnail');
  const [selectedDocuments, setSelectedDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [metadataCollapsedState, setMetadataCollapsedState] = useState({
    lokal: true,  // Local tab: collapsed by default
    epa: false    // EPA tab: expanded by default
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [panelSizes, setPanelSizes] = useState([65, 35]);
  const [localDocumentsList, setLocalDocumentsList] =
    useState<Document[]>(localDocuments);
  const [importedEpaDocumentIds, setImportedEpaDocumentIds] = useState<
    Set<string>
  >(new Set());
  const [sharedToEpaDocuments, setSharedToEpaDocuments] = useState<Document[]>([]);
  const [sharedFromLocalIds, setSharedFromLocalIds] = useState<Set<string>>(new Set());

  // New toolbar state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'category' | 'author'>(
    'date'
  );
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
    author: [],
  });

  // Add new state for right panel
  const [rightPanelType, setRightPanelType] = useState<PanelType>(null);

  // Filter popup state
  const [activeFilterPopup, setActiveFilterPopup] = useState<string | null>(
    null
  );

  // Multi-select functionality state
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [multiSelectedDocuments, setMultiSelectedDocuments] = useState<
    Set<string>
  >(new Set());

  const handleViewDetails = (documents: Document[]) => {
    setSelectedDocuments(documents);
    setViewMode('table');
  };

  const handleDocumentSelect = (document: Document) => {
    if (multiSelectMode) {
      // Don't change single selection in multi-select mode
      return;
    }
    setSelectedDocument(document);
  };

  // Multi-select handlers
  const handleMultiSelectToggle = (documentId: string) => {
    const newSelected = new Set(multiSelectedDocuments);
    if (newSelected.has(documentId)) {
      newSelected.delete(documentId);
      console.log('Removed from selection:', documentId);
    } else {
      newSelected.add(documentId);
      console.log('Added to selection:', documentId);
    }
    setMultiSelectedDocuments(newSelected);
    console.log('Updated selection:', Array.from(newSelected));

    // If no documents are selected, exit multi-select mode
    if (newSelected.size === 0) {
      setMultiSelectMode(false);
    }
  };

  const handleEnableMultiSelect = (documentId: string) => {
    console.log('Enabling multi-select mode with:', documentId);
    setMultiSelectMode(true);
    setMultiSelectedDocuments(new Set([documentId]));
  };

  const handleExitMultiSelect = () => {
    setMultiSelectMode(false);
    setMultiSelectedDocuments(new Set());
  };

  const handleClearSelection = () => {
    setMultiSelectedDocuments(new Set());
    setMultiSelectMode(false);
  };

  const handleOpenMultiSelected = () => {
    const allDocs = getCurrentDocuments();
    const selectedDocs = allDocs.filter((doc) =>
      multiSelectedDocuments.has(doc.id)
    );

    if (selectedDocs.length > 0) {
      // Switch to resizable mode to show side panel if currently in full-screen
      if (isFullscreen) {
        setIsFullscreen(false);
      }

      // For single document, open normally
      if (selectedDocs.length === 1) {
        setSelectedDocument(selectedDocs[0]);
        setSelectedDocuments([]); // Clear multi-selection
      } else {
        // For multiple documents, pass them to preview component
        setSelectedDocument(null); // Clear single selection
        setSelectedDocuments(selectedDocs); // Set multi-selection for preview
      }
    }
  };

  const handleToggleMetadata = () => {
    setMetadataCollapsedState(prev => ({
      ...prev,
      [currentTab]: !prev[currentTab]
    }));
  };

  const handleFullscreen = () => {
    setIsFullscreen(true);
  };

  const handleExitFullscreen = () => {
    setIsFullscreen(false);
  };

  const handleTabChange = (value: string) => {
    // Clear multi-select when switching tabs
    if (multiSelectMode) {
      setMultiSelectMode(false);
      setMultiSelectedDocuments(new Set());
    }
    // Clear any selected documents
    setSelectedDocument(null);
    setSelectedDocuments([]);
    // Switch tab
    setCurrentTab(value as 'lokal' | 'epa');
  };

  // Filter and search functions
  const filterAndSortDocuments = (documents: Document[]) => {
    let filtered = [...documents];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (doc) =>
          doc.name.toLowerCase().includes(query) ||
          doc.author.toLowerCase().includes(query) ||
          doc.category.toLowerCase().includes(query) ||
          doc.department?.toLowerCase().includes(query)
      );
    }

    // Apply category filters
    if (activeFilters.category.length > 0) {
      filtered = filtered.filter((doc) =>
        activeFilters.category.includes(doc.category)
      );
    }

    // Apply type filters
    if (activeFilters.type.length > 0) {
      filtered = filtered.filter((doc) =>
        activeFilters.type.includes(doc.type)
      );
    }

    // Apply author filters
    if (activeFilters.author.length > 0) {
      filtered = filtered.filter((doc) =>
        activeFilters.author.includes(doc.author)
      );
    }

    // Apply date range filter
    if (activeFilters.dateRange.from || activeFilters.dateRange.to) {
      filtered = filtered.filter((doc) => {
        const docDate = new Date(
          doc.creationDate.split('.').reverse().join('-')
        );
        const fromDate = activeFilters.dateRange.from
          ? new Date(activeFilters.dateRange.from)
          : null;
        const toDate = activeFilters.dateRange.to
          ? new Date(activeFilters.dateRange.to)
          : null;

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

  const handleFilterChange = (
    filterType: keyof typeof activeFilters,
    value: any
  ) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      category: [],
      type: [],
      dateRange: {},
      author: [],
    });
    setSearchQuery('');
  };

  const getActiveFilterCount = () => {
    return (
      activeFilters.category.length +
      activeFilters.type.length +
      activeFilters.author.length +
      (activeFilters.dateRange.from || activeFilters.dateRange.to ? 1 : 0) +
      (searchQuery.trim() ? 1 : 0)
    );
  };

  // Helper function to check if sorting is active (different from default)
  const isSortingActive = () => {
    return sortBy !== 'date' || sortOrder !== 'desc';
  };

  // Helper function to check if search is active
  const isSearchActive = () => {
    return searchQuery.trim() !== '';
  };

  // Get filtered documents for current tab
  const getCurrentDocuments = () => {
    const documents =
      currentTab === 'lokal' ? localDocumentsList : [...epaDocuments, ...sharedToEpaDocuments];
    return filterAndSortDocuments(documents);
  };

  // Get unique values for filter options
  const getFilterOptions = () => {
    const documents =
      currentTab === 'lokal' ? localDocumentsList : epaDocuments;
    return {
      categories: [...new Set(documents.map((doc) => doc.category))],
      types: [...new Set(documents.map((doc) => doc.type))],
      authors: [...new Set(documents.map((doc) => doc.author))],
    };
  };

  const handleDownloadDocument = (document: Document) => {
    // Convert ePA document to local document
    const localDocument: Document = {
      ...document,
      id: `local_${Date.now()}`, // Generate new local ID
      source: 'local',
      importedFromEPA: true,
      uploadDate: new Date().toLocaleDateString('de-DE'),
    };

    // Add to local documents list
    setLocalDocumentsList((prev) => [...prev, localDocument]);

    // Mark the original ePA document as imported
    setImportedEpaDocumentIds((prev) => new Set(prev).add(document.id));

    // Switch to local tab to show the downloaded document
    setCurrentTab('lokal');

    // Auto-select the newly downloaded document
    setSelectedDocument(localDocument);
  };

  const handleDownloadMultiSelected = () => {
    const allDocs = getCurrentDocuments();
    const selectedDocs = allDocs.filter((doc) =>
      multiSelectedDocuments.has(doc.id)
    );

    if (selectedDocs.length > 0 && currentTab === 'epa') {
      const newLocalDocuments: Document[] = selectedDocs.map((doc) => ({
        ...doc,
        id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Generate unique local ID
        source: 'local',
        importedFromEPA: true,
        uploadDate: new Date().toLocaleDateString('de-DE'),
      }));

      // Add all selected documents to local documents list
      setLocalDocumentsList((prev) => [...prev, ...newLocalDocuments]);

      // Mark all original ePA documents as imported
      setImportedEpaDocumentIds((prev) => {
        const newSet = new Set(prev);
        selectedDocs.forEach((doc) => newSet.add(doc.id));
        return newSet;
      });

      // Exit multi-select mode
      setMultiSelectMode(false);
      setMultiSelectedDocuments(new Set());

      // Switch to local tab to show the downloaded documents
      setCurrentTab('lokal');
    }
  };

  const handleShareToEpa = () => {
    const allDocs = getCurrentDocuments();
    const selectedDocs = allDocs.filter((doc) =>
      multiSelectedDocuments.has(doc.id)
    );

    if (selectedDocs.length > 0 && currentTab === 'lokal') {
      const sharedDocuments: Document[] = selectedDocs.map((doc) => ({
        ...doc,
        id: `epa_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Generate unique ePA ID
        source: 'epa',
        sharedFromLocal: true,
        uploadDate: new Date().toLocaleDateString('de-DE'),
      }));

      // Add all selected documents to ePA documents list
      setSharedToEpaDocuments((prev) => [...prev, ...sharedDocuments]);

      // Mark original local documents as shared
      setSharedFromLocalIds((prev) => {
        const newSet = new Set(prev);
        selectedDocs.forEach((doc) => newSet.add(doc.id));
        return newSet;
      });

      // Exit multi-select mode
      setMultiSelectMode(false);
      setMultiSelectedDocuments(new Set());

      // Switch to ePA tab to show the shared documents
      setCurrentTab('epa');
    }
  };

  // Inline Multi-Select Bar Component (for tab header)
  const InlineMultiSelectBar = () => {
    return (
      <div className="flex items-center gap-4 bg-white rounded-lg px-4 py-2 shadow-sm border">
        <span className="text-sm font-medium text-blue-900">
          {multiSelectedDocuments.size} ausgewählt
        </span>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="h-7 px-3 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleOpenMultiSelected}
          >
            Öffnen
          </Button>
          {currentTab === 'epa' && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-3 text-blue-700 hover:bg-blue-100"
              onClick={handleDownloadMultiSelected}
            >
              Herunterladen
            </Button>
          )}
          {currentTab === 'lokal' && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-3 text-blue-700 hover:bg-blue-100"
                >
                  <Share className="h-4 w-4 mr-1" />
                  Teilen
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleShareToEpa}>
                  <Share className="h-4 w-4 mr-2" />
                  zu ePA teilen
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-blue-700 hover:bg-blue-100"
            onClick={handleExitMultiSelect}
            title="Mehrfachauswahl beenden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  // Multi-Select Bar Component
  const MultiSelectBar = () => {
    if (!multiSelectMode || multiSelectedDocuments.size === 0) return null;

    return (
      <div className="border-b bg-blue-50 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-blue-900">
              {multiSelectedDocuments.size} ausgewählt
            </span>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="h-7 px-3 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleOpenMultiSelected}
              >
                Öffnen
              </Button>
              {currentTab === 'epa' && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-3 text-blue-700 hover:bg-blue-100"
                  onClick={handleDownloadMultiSelected}
                >
                  Herunterladen
                </Button>
              )}
              {currentTab === 'lokal' && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-3 text-blue-700 hover:bg-blue-100"
                    >
                      <Share className="h-4 w-4 mr-1" />
                      Teilen
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleShareToEpa}>
                      <Share className="h-4 w-4 mr-2" />
                      zu ePA teilen
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-blue-700 hover:bg-blue-100"
            onClick={handleExitMultiSelect}
            title="Mehrfachauswahl beenden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
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
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              Kategorie
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between h-8"
                >
                  <span className="text-xs">
                    {activeFilters.category.length
                      ? `${activeFilters.category.length} selected`
                      : 'Alle'}
                  </span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {filterOptions.categories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={activeFilters.category.includes(category)}
                    onCheckedChange={(checked) => {
                      const newCategories = checked
                        ? [...activeFilters.category, category]
                        : activeFilters.category.filter((c) => c !== category);
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
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              Typ
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between h-8"
                >
                  <span className="text-xs">
                    {activeFilters.type.length
                      ? `${activeFilters.type.length} selected`
                      : 'Alle'}
                  </span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {filterOptions.types.map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={activeFilters.type.includes(type)}
                    onCheckedChange={(checked) => {
                      const newTypes = checked
                        ? [...activeFilters.type, type]
                        : activeFilters.type.filter((t) => t !== type);
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
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              Autor
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between h-8"
                >
                  <span className="text-xs">
                    {activeFilters.author.length
                      ? `${activeFilters.author.length} selected`
                      : 'Alle'}
                  </span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {filterOptions.authors.map((author) => (
                  <DropdownMenuCheckboxItem
                    key={author}
                    checked={activeFilters.author.includes(author)}
                    onCheckedChange={(checked) => {
                      const newAuthors = checked
                        ? [...activeFilters.author, author]
                        : activeFilters.author.filter((a) => a !== author);
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
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              Datum
            </label>
            <div className="flex gap-1">
              <Input
                type="date"
                value={activeFilters.dateRange.from || ''}
                onChange={(e) =>
                  handleFilterChange('dateRange', {
                    ...activeFilters.dateRange,
                    from: e.target.value,
                  })
                }
                className="h-8 text-xs"
                placeholder="Von"
              />
              <Input
                type="date"
                value={activeFilters.dateRange.to || ''}
                onChange={(e) =>
                  handleFilterChange('dateRange', {
                    ...activeFilters.dateRange,
                    to: e.target.value,
                  })
                }
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
            {activeFilters.category.map((cat) => (
              <Badge key={cat} variant="secondary" className="text-xs">
                {cat}
                <button
                  onClick={() =>
                    handleFilterChange(
                      'category',
                      activeFilters.category.filter((c) => c !== cat)
                    )
                  }
                  className="ml-1 hover:bg-gray-300 rounded-full"
                >
                  <X className="h-2 w-2" />
                </button>
              </Badge>
            ))}
            {activeFilters.type.map((type) => (
              <Badge key={type} variant="secondary" className="text-xs">
                {type}
                <button
                  onClick={() =>
                    handleFilterChange(
                      'type',
                      activeFilters.type.filter((t) => t !== type)
                    )
                  }
                  className="ml-1 hover:bg-gray-300 rounded-full"
                >
                  <X className="h-2 w-2" />
                </button>
              </Badge>
            ))}
            {activeFilters.author.map((author) => (
              <Badge key={author} variant="secondary" className="text-xs">
                {author}
                <button
                  onClick={() =>
                    handleFilterChange(
                      'author',
                      activeFilters.author.filter((a) => a !== author)
                    )
                  }
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

  const handleOpenPanel = (panelType: PanelType) => {
    setRightPanelType(rightPanelType === panelType ? null : panelType);
  };

  const handleClosePanel = () => {
    setRightPanelType(null);
  };

  // Search expansion handlers
  const handleSearchToggle = () => {
    if (isSearchExpanded) {
      // Collapse search
      setIsSearchExpanded(false);
      setSearchQuery('');
    } else {
      // Expand search
      setIsSearchExpanded(true);
    }
  };

  const handleSearchBlur = () => {
    // Only collapse if search is empty
    if (!searchQuery.trim()) {
      setIsSearchExpanded(false);
    }
  };

  // Handle escape key to close search
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchExpanded) {
        setIsSearchExpanded(false);
        setSearchQuery('');
      }
      if (e.key === 'Escape' && activeFilterPopup) {
        setActiveFilterPopup(null);
      }
    };

    if (isSearchExpanded || activeFilterPopup) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isSearchExpanded, activeFilterPopup]);

  // Filter popup handlers
  const handleOpenFilterPopup = (filterType: string) => {
    setActiveFilterPopup(filterType);
  };

  const handleCloseFilterPopup = () => {
    setActiveFilterPopup(null);
  };

  // Right Panel Component
  const RightPanel = () => {
    if (!rightPanelType) return null;

    return (
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 pointer-events-auto"
          onClick={handleClosePanel}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 pointer-events-auto ${
            rightPanelType ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {rightPanelType === 'sorting' && <SortingPanel />}
          {rightPanelType === 'filter' && <FilterPanel />}
          {rightPanelType === 'options' && <OptionsPanel />}
        </div>
      </div>
    );
  };

  const SortingPanel = () => (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleClosePanel}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="font-medium">Sortierung</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleClosePanel}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 p-4">
        <div className="space-y-4">
          <div>
            <span className="text-sm text-gray-600 mb-2 block">
              Hier kannst du ein bestimmtes Kriterium auswählen.
            </span>

            <div className="space-y-3">
              <Select
                value={sortBy}
                onValueChange={(value: any) => handleSort(value)}
              >
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Datum</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="category">Kategorie</SelectItem>
                  <SelectItem value="author">Autor</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={sortOrder}
                onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}
              >
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Absteigend</SelectItem>
                  <SelectItem value="asc">Aufsteigend</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FilterPanel = () => {
    return (
      <div className="h-full flex flex-col relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleClosePanel}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium">Filter</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClosePanel}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 p-4 overflow-visible">
          <div className="space-y-4">
            {/* Reset Button */}
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="w-full justify-start text-left h-auto p-0"
            >
              <div className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                <span className="text-sm">Zurücksetzen</span>
              </div>
            </Button>

            {/* Active Filters Display */}
            <div className="space-y-2">
              {/* Category Filter Active */}
              {activeFilters.category.length > 0 && (
                <div className="flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      Kategorie
                    </span>
                    <span className="text-sm text-blue-700">:</span>
                    <span className="text-sm text-blue-800">
                      {activeFilters.category.join(', ')}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-blue-600 hover:text-blue-800"
                    onClick={() => handleFilterChange('category', [])}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {/* Author Filter Active */}
              {activeFilters.author.length > 0 && (
                <div className="flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      Autor
                    </span>
                    <span className="text-sm text-blue-700">:</span>
                    <span className="text-sm text-blue-800">
                      {activeFilters.author.join(', ')}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-blue-600 hover:text-blue-800"
                    onClick={() => handleFilterChange('author', [])}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {/* Type Filter Active */}
              {activeFilters.type.length > 0 && (
                <div className="flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      Typ
                    </span>
                    <span className="text-sm text-blue-700">:</span>
                    <span className="text-sm text-blue-800">
                      {activeFilters.type.join(', ')}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-blue-600 hover:text-blue-800"
                    onClick={() => handleFilterChange('type', [])}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {/* Date Range Filter Active */}
              {(activeFilters.dateRange.from || activeFilters.dateRange.to) && (
                <div className="flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      Datum
                    </span>
                    <span className="text-sm text-blue-700">:</span>
                    <span className="text-sm text-blue-800">
                      {activeFilters.dateRange.from || '...'} -{' '}
                      {activeFilters.dateRange.to || '...'}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-blue-600 hover:text-blue-800"
                    onClick={() => handleFilterChange('dateRange', {})}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>

            {/* Filter Options */}
            <div className="space-y-3">
              <span className="text-sm font-medium">Filter hinzufügen:</span>

              <div className="space-y-2 relative">
                {/* Date Filter Capsule */}
                <div className="relative">
                  <div
                    className={`flex items-center justify-between p-3 border rounded-lg ${
                      activeFilters.dateRange.from || activeFilters.dateRange.to
                        ? 'bg-gray-100 cursor-not-allowed opacity-60'
                        : 'hover:bg-gray-50 cursor-pointer'
                    }`}
                    onClick={() =>
                      !(
                        activeFilters.dateRange.from ||
                        activeFilters.dateRange.to
                      ) && handleOpenFilterPopup('date')
                    }
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Datum</span>
                    </div>
                    <Plus className="h-4 w-4 text-gray-400" />
                  </div>
                  {activeFilterPopup === 'date' && (
                    <div className="absolute right-full top-0 mr-2 w-64 bg-white border rounded-lg shadow-lg z-50">
                      <DateFilterPopup />
                    </div>
                  )}
                </div>

                {/* Category Filter Capsule */}
                <div className="relative">
                  <div
                    className={`flex items-center justify-between p-3 border rounded-lg ${
                      activeFilters.category.length > 0
                        ? 'bg-gray-100 cursor-not-allowed opacity-60'
                        : 'hover:bg-gray-50 cursor-pointer'
                    }`}
                    onClick={() =>
                      activeFilters.category.length === 0 &&
                      handleOpenFilterPopup('category')
                    }
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">Kategorie</span>
                    </div>
                    <Plus className="h-4 w-4 text-gray-400" />
                  </div>
                  {activeFilterPopup === 'category' && (
                    <div className="absolute right-full top-0 mr-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                      <CategoryFilterPopup />
                    </div>
                  )}
                </div>

                {/* Einsender Filter Capsule */}
                <div className="relative">
                  <div
                    className={`flex items-center justify-between p-3 border rounded-lg ${
                      activeFilters.author.length > 0
                        ? 'bg-gray-100 cursor-not-allowed opacity-60'
                        : 'hover:bg-gray-50 cursor-pointer'
                    }`}
                    onClick={() =>
                      activeFilters.author.length === 0 &&
                      handleOpenFilterPopup('einsender')
                    }
                  >
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="text-sm">Einsender</span>
                    </div>
                    <Plus className="h-4 w-4 text-gray-400" />
                  </div>
                  {activeFilterPopup === 'einsender' && (
                    <div className="absolute right-full top-0 mr-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                      <EinsenderFilterPopup />
                    </div>
                  )}
                </div>

                {/* Initiator Filter Capsule */}
                <div className="relative">
                  <div
                    className={`flex items-center justify-between p-3 border rounded-lg ${
                      activeFilters.author.length > 0
                        ? 'bg-gray-100 cursor-not-allowed opacity-60'
                        : 'hover:bg-gray-50 cursor-pointer'
                    }`}
                    onClick={() =>
                      activeFilters.author.length === 0 &&
                      handleOpenFilterPopup('initiator')
                    }
                  >
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="text-sm">Initiator</span>
                    </div>
                    <Plus className="h-4 w-4 text-gray-400" />
                  </div>
                  {activeFilterPopup === 'initiator' && (
                    <div className="absolute right-full top-0 mr-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                      <InitiatorFilterPopup />
                    </div>
                  )}
                </div>

                {/* Dateityp Filter Capsule */}
                <div className="relative">
                  <div
                    className={`flex items-center justify-between p-3 border rounded-lg ${
                      activeFilters.type.length > 0
                        ? 'bg-gray-100 cursor-not-allowed opacity-60'
                        : 'hover:bg-gray-50 cursor-pointer'
                    }`}
                    onClick={() =>
                      activeFilters.type.length === 0 &&
                      handleOpenFilterPopup('dateityp')
                    }
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">Dateityp</span>
                    </div>
                    <Plus className="h-4 w-4 text-gray-400" />
                  </div>
                  {activeFilterPopup === 'dateityp' && (
                    <div className="absolute right-full top-0 mr-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                      <DateitypFilterPopup />
                    </div>
                  )}
                </div>

                {/* Status Filter Capsule */}
                <div className="relative">
                  <div
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleOpenFilterPopup('status')}
                  >
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span className="text-sm">Status</span>
                    </div>
                    <Plus className="h-4 w-4 text-gray-400" />
                  </div>
                  {activeFilterPopup === 'status' && (
                    <div className="absolute right-full top-0 mr-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                      <StatusFilterPopup />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invisible overlay to close popup when clicking outside */}
        {activeFilterPopup && (
          <div
            className="fixed inset-0 z-40"
            onClick={handleCloseFilterPopup}
          />
        )}
      </div>
    );
  };

  // Filter Popup Components
  const DateFilterPopup = () => (
    <div className="p-3 max-h-80 overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium text-sm">Datum</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={handleCloseFilterPopup}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs font-medium">Von</label>
          <Input
            type="text"
            placeholder="dd.MM.yyyy"
            className="h-8 text-xs"
            value={activeFilters.dateRange.from || ''}
            onChange={(e) =>
              handleFilterChange('dateRange', {
                ...activeFilters.dateRange,
                from: e.target.value,
              })
            }
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium">Bis</label>
          <Input
            type="text"
            placeholder="dd.MM.yyyy"
            className="h-8 text-xs"
            value={activeFilters.dateRange.to || ''}
            onChange={(e) =>
              handleFilterChange('dateRange', {
                ...activeFilters.dateRange,
                to: e.target.value,
              })
            }
          />
        </div>

        <Button
          size="sm"
          className="w-full h-8 text-xs"
          onClick={handleCloseFilterPopup}
        >
          Anwenden
        </Button>
      </div>
    </div>
  );

  const CategoryFilterPopup = () => (
    <div className="p-3 max-h-60 overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium text-sm">Kategorie</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={handleCloseFilterPopup}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-1">
        {getFilterOptions().categories.map((category) => (
          <Button
            key={category}
            variant="ghost"
            className="w-full justify-start h-8 p-2 text-xs hover:bg-gray-100"
            onClick={() => {
              handleFilterChange('category', [category]);
              handleCloseFilterPopup();
            }}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );

  const EinsenderFilterPopup = () => (
    <div className="p-3 max-h-60 overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium text-sm">Einsender</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={handleCloseFilterPopup}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-1">
        {getFilterOptions().authors.map((author) => (
          <Button
            key={author}
            variant="ghost"
            className="w-full justify-start h-8 p-2 text-xs hover:bg-gray-100"
            onClick={() => {
              handleFilterChange('author', [author]);
              handleCloseFilterPopup();
            }}
          >
            {author}
          </Button>
        ))}
      </div>
    </div>
  );

  const InitiatorFilterPopup = () => (
    <div className="p-3 max-h-60 overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium text-sm">Initiator</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={handleCloseFilterPopup}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-1">
        {getFilterOptions().authors.map((author) => (
          <Button
            key={author}
            variant="ghost"
            className="w-full justify-start h-8 p-2 text-xs hover:bg-gray-100"
            onClick={() => {
              handleFilterChange('author', [author]);
              handleCloseFilterPopup();
            }}
          >
            {author}
          </Button>
        ))}
      </div>
    </div>
  );

  const DateitypFilterPopup = () => (
    <div className="p-3 max-h-60 overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium text-sm">Dateityp</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={handleCloseFilterPopup}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-1">
        {getFilterOptions().types.map((type) => (
          <Button
            key={type}
            variant="ghost"
            className="w-full justify-start h-8 p-2 text-xs hover:bg-gray-100"
            onClick={() => {
              handleFilterChange('type', [type]);
              handleCloseFilterPopup();
            }}
          >
            {type}
          </Button>
        ))}
      </div>
    </div>
  );

  const StatusFilterPopup = () => (
    <div className="p-3 max-h-60 overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium text-sm">Status</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={handleCloseFilterPopup}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-1">
        {['Neu', 'In Bearbeitung', 'Abgeschlossen', 'Archiviert'].map(
          (status) => (
            <Button
              key={status}
              variant="ghost"
              className="w-full justify-start h-8 p-2 text-xs hover:bg-gray-100"
              onClick={() => {
                // Handle status filter logic here
                handleCloseFilterPopup();
              }}
            >
              {status}
            </Button>
          )
        )}
      </div>
    </div>
  );

  const OptionsPanel = () => (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <span className="font-medium">Optionen anzeigen</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleClosePanel}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 p-4">
        <div className="space-y-2">
          {/* Layout Option */}
          <Button
            variant="ghost"
            className="w-full justify-between h-auto p-3 border rounded"
            onClick={() =>
              setViewMode(viewMode === 'thumbnail' ? 'table' : 'thumbnail')
            }
          >
            <div className="flex items-center gap-2">
              <LayoutGrid className="h-4 w-4" />
              <span className="text-sm">Layout</span>
            </div>
            <span className="text-xs text-gray-500">
              {viewMode === 'thumbnail' ? 'Kacheln' : 'Liste'}
            </span>
          </Button>

          {/* Display Fields Option */}
          <Button
            variant="ghost"
            className="w-full justify-between h-auto p-3 border rounded"
          >
            <div className="flex items-center gap-2">
              <List className="h-4 w-4" />
              <span className="text-sm">Angezeigte Felder</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>

          {/* Filter Option */}
          <Button
            variant="ghost"
            className="w-full justify-between h-auto p-3 border rounded"
            onClick={() => setRightPanelType('filter')}
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm">Filter</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>

          {/* Sorting Option */}
          <Button
            variant="ghost"
            className="w-full justify-between h-auto p-3 border rounded"
            onClick={() => setRightPanelType('sorting')}
          >
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              <span className="text-sm">Sortierung</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>

          {/* Grouping Option */}
          <Button
            variant="ghost"
            className="w-full justify-between h-auto p-3 border rounded"
          >
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="text-sm">Gruppierung</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  const currentDocuments =
    currentTab === 'lokal' ? localDocumentsList : epaDocuments;

  // Fullscreen overlay
  if (isFullscreen && selectedDocument) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <DocumentPreview
          document={selectedDocument}
          onClose={handleExitFullscreen}
          onFullscreen={() => {}} // No-op since we're already in fullscreen
          onDownload={handleDownloadDocument}
          isMetadataCollapsed={metadataCollapsedState[currentTab]}
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
            <h1 className="text-lg font-medium text-foreground">
              Musterman, Max
            </h1>
            <div className="text-sm text-muted-foreground">
              *01.06.1980 | 1234
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {selectedDocument || selectedDocuments.length > 0 ? (
          <ResizablePanelGroup
            direction="horizontal"
            className="h-full"
            onLayout={(sizes) => setPanelSizes(sizes)}
          >
            <ResizablePanel defaultSize={panelSizes[0]} minSize={30}>
              <div className="h-full flex flex-col relative">
                {/* Right Panel for split view */}
                {rightPanelType && (
                  <div className="absolute inset-0 z-50 flex">
                    <div className="flex-1" onClick={handleClosePanel} />
                    <div className="w-80 bg-white shadow-xl border-l">
                      {rightPanelType === 'sorting' && <SortingPanel />}
                      {rightPanelType === 'filter' && <FilterPanel />}
                      {rightPanelType === 'options' && <OptionsPanel />}
                    </div>
                  </div>
                )}

                {/* Tab Navigation for Bilderlist only */}
                <Tabs
                  value={currentTab}
                  onValueChange={handleTabChange}
                  className="h-full flex flex-col"
                >
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

                      {/* Conditional Right Section: Multi-Select Bar OR Toolbar Buttons */}
                      {multiSelectMode && multiSelectedDocuments.size > 0 ? (
                        <InlineMultiSelectBar />
                      ) : (
                        <div className="flex items-center gap-1">
                          {/* Sort Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-8 w-8 p-0 relative ${
                              rightPanelType === 'sorting' || isSortingActive() ? 'bg-blue-100' : ''
                            }`}
                            onClick={() => handleOpenPanel('sorting')}
                          >
                            <ArrowUpDown className="h-4 w-4" />
                            {isSortingActive() && (
                              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                •
                              </span>
                            )}
                          </Button>

                          {/* Filter Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-8 w-8 p-0 relative ${
                              rightPanelType === 'filter' ||
                              getActiveFilterCount() > 0
                                ? 'bg-blue-100'
                                : ''
                            }`}
                            onClick={() => handleOpenPanel('filter')}
                          >
                            <Filter className="h-4 w-4" />
                            {getActiveFilterCount() > 0 && (
                              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                {getActiveFilterCount()}
                              </span>
                            )}
                          </Button>

                          {/* Collapsible Search */}
                          <div className="relative flex items-center">
                            {!isSearchExpanded ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`h-8 w-8 p-0 relative ${
                                  isSearchActive() ? 'bg-blue-100' : ''
                                }`}
                                onClick={handleSearchToggle}
                              >
                                <Search className="h-4 w-4" />
                                {isSearchActive() && (
                                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                    •
                                  </span>
                                )}
                              </Button>
                            ) : (
                              <div className="relative flex items-center">
                                <Input
                                  type="text"
                                  placeholder="Zum Suchen eingeben..."
                                  value={searchQuery}
                                  onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                  }
                                  onBlur={handleSearchBlur}
                                  className="h-8 w-48 text-xs pl-8 pr-8 transition-all duration-200 ease-in-out"
                                  autoFocus
                                />
                                <Search className="h-3 w-3 absolute left-2 top-2.5 text-gray-400" />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-1 top-1 h-6 w-6 p-0"
                                  onClick={handleSearchToggle}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>

                          {/* Layout Toggle */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() =>
                              setViewMode(
                                viewMode === 'thumbnail' ? 'table' : 'thumbnail'
                              )
                            }
                          >
                            {viewMode === 'thumbnail' ? (
                              <List className="h-4 w-4" />
                            ) : (
                              <LayoutGrid className="h-4 w-4" />
                            )}
                          </Button>

                          {/* More Options Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-8 w-8 p-0 relative ${
                              rightPanelType === 'options' ? 'bg-blue-100' : ''
                            }`}
                            onClick={() => handleOpenPanel('options')}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            {rightPanelType === 'options' && (
                              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                •
                              </span>
                            )}
                          </Button>

                          {/* Import Button */}
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-3 text-xs bg-white hover:bg-gray-50 active:bg-gray-100 border-gray-300 text-gray-700 hover:text-gray-900 shadow-sm transition-all duration-200"
                          >
                            <Import className="h-3 w-3 mr-1" />
                            Import
                          </Button>
                        </div>
                      )}
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
                      sharedFromLocalIds={sharedFromLocalIds}
                          multiSelectMode={multiSelectMode}
                          multiSelectedDocuments={multiSelectedDocuments}
                          onMultiSelectToggle={handleMultiSelectToggle}
                          onEnableMultiSelect={handleEnableMultiSelect}
                        />
                      ) : (
                        <DocumentTableView
                          documents={getCurrentDocuments()}
                          onDocumentSelect={handleDocumentSelect}
                          isFromEPA={false}
                          multiSelectMode={multiSelectMode}
                          multiSelectedDocuments={multiSelectedDocuments}
                          onMultiSelectToggle={handleMultiSelectToggle}
                          onEnableMultiSelect={handleEnableMultiSelect}
                        />
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="epa" className="flex-1 min-h-0 mt-0">
                    <div className="h-full overflow-y-auto px-6">
                      {viewMode === 'thumbnail' ? (
                        <DocumentThumbnailView
                          onViewDetails={handleViewDetails}
                          documents={getCurrentDocuments()}
                          onDocumentSelect={handleDocumentSelect}
                          localDocuments={localDocumentsList}
                          isFromEPA={true}
                          importedEpaDocumentIds={importedEpaDocumentIds}
                          sharedFromLocalIds={sharedFromLocalIds}
                          multiSelectMode={multiSelectMode}
                          multiSelectedDocuments={multiSelectedDocuments}
                          onMultiSelectToggle={handleMultiSelectToggle}
                          onEnableMultiSelect={handleEnableMultiSelect}
                        />
                      ) : (
                        <DocumentTableView
                          documents={getCurrentDocuments()}
                          onDocumentSelect={handleDocumentSelect}
                          isFromEPA={true}
                          multiSelectMode={multiSelectMode}
                          multiSelectedDocuments={multiSelectedDocuments}
                          onMultiSelectToggle={handleMultiSelectToggle}
                          onEnableMultiSelect={handleEnableMultiSelect}
                        />
                      )}
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
                  key={`${selectedDocument?.id || 'multi'}-${
                    selectedDocuments.length
                  }-${selectedDocuments.map((d) => d.id).join(',')}`}
                  document={selectedDocument}
                  documents={
                    selectedDocuments.length > 0 ? selectedDocuments : undefined
                  }
                  onClose={() => {
                    setSelectedDocument(null);
                    setSelectedDocuments([]);
                    // Also clear multi-select when closing preview
                    if (multiSelectMode) {
                      setMultiSelectMode(false);
                      setMultiSelectedDocuments(new Set());
                    }
                  }}
                  onFullscreen={handleFullscreen}
                  onDownload={handleDownloadDocument}
                  isMetadataCollapsed={metadataCollapsedState[currentTab]}
                  onToggleMetadata={handleToggleMetadata}
                  localDocuments={localDocumentsList}
                  isFromEPA={currentTab === 'epa'}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <div className="h-full flex flex-col relative">
            {/* Right Panel for full screen */}
            {rightPanelType && (
              <div className="absolute inset-0 z-50 flex">
                <div className="flex-1" onClick={handleClosePanel} />
                <div className="w-80 bg-white shadow-xl border-l">
                  {rightPanelType === 'sorting' && <SortingPanel />}
                  {rightPanelType === 'filter' && <FilterPanel />}
                  {rightPanelType === 'options' && <OptionsPanel />}
                </div>
              </div>
            )}

            {/* Tab Navigation for Bilderlist only */}
            <Tabs
              value={currentTab}
              onValueChange={handleTabChange}
              className="h-full flex flex-col"
            >
              <div className="p-6 pb-0">
                <div className="flex items-center justify-between mb-4">
                  <TabsList className="h-8 bg-transparent p-0 border-none">
                    <TabsTrigger
                      value="lokal"
                      className="h-8 px-3 text-sm bg-gray-100 hover:bg-gray-200 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-sm mr-1 transition-all duration-200"
                    >
                      Lokal
                    </TabsTrigger>
                    <TabsTrigger
                      value="epa"
                      className="h-8 px-3 text-sm bg-gray-100 hover:bg-gray-200 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-sm mr-1 transition-all duration-200"
                    >
                      ePA
                    </TabsTrigger>
                    <TabsTrigger
                      value="plus"
                      className="h-8 px-3 text-sm bg-gray-100 hover:bg-gray-200 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-sm transition-all duration-200"
                    >
                      +
                    </TabsTrigger>
                  </TabsList>

                  {/* Conditional Right Section: Multi-Select Bar OR Toolbar Buttons for full screen */}
                  {multiSelectMode && multiSelectedDocuments.size > 0 ? (
                    <InlineMultiSelectBar />
                  ) : (
                    <div className="flex items-center gap-1">
                      {/* Sort Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 w-8 p-0 relative ${
                          rightPanelType === 'sorting' || isSortingActive() ? 'bg-blue-100' : ''
                        }`}
                        onClick={() => handleOpenPanel('sorting')}
                      >
                        <ArrowUpDown className="h-4 w-4" />
                        {isSortingActive() && (
                          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            •
                          </span>
                        )}
                      </Button>

                      {/* Filter Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 w-8 p-0 relative ${
                          rightPanelType === 'filter' ||
                          getActiveFilterCount() > 0
                            ? 'bg-blue-100'
                            : ''
                        }`}
                        onClick={() => handleOpenPanel('filter')}
                      >
                        <Filter className="h-4 w-4" />
                        {getActiveFilterCount() > 0 && (
                          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            {getActiveFilterCount()}
                          </span>
                        )}
                      </Button>

                      {/* Collapsible Search */}
                      <div className="relative flex items-center">
                        {!isSearchExpanded ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-8 w-8 p-0 relative ${
                              isSearchActive() ? 'bg-blue-100' : ''
                            }`}
                            onClick={handleSearchToggle}
                          >
                            <Search className="h-4 w-4" />
                            {isSearchActive() && (
                              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                •
                              </span>
                            )}
                          </Button>
                        ) : (
                          <div className="relative flex items-center">
                            <Input
                              type="text"
                              placeholder="Zum Suchen eingeben..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              onBlur={handleSearchBlur}
                              className="h-8 w-48 text-xs pl-8 pr-8 transition-all duration-200 ease-in-out"
                              autoFocus
                            />
                            <Search className="h-3 w-3 absolute left-2 top-2.5 text-gray-400" />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute right-1 top-1 h-6 w-6 p-0"
                              onClick={handleSearchToggle}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Layout Toggle */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() =>
                          setViewMode(
                            viewMode === 'thumbnail' ? 'table' : 'thumbnail'
                          )
                        }
                      >
                        {viewMode === 'thumbnail' ? (
                          <List className="h-4 w-4" />
                        ) : (
                          <LayoutGrid className="h-4 w-4" />
                        )}
                      </Button>

                      {/* More Options Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 w-8 p-0 relative ${
                          rightPanelType === 'options' ? 'bg-blue-100' : ''
                        }`}
                        onClick={() => handleOpenPanel('options')}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        {rightPanelType === 'options' && (
                          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            •
                          </span>
                        )}
                      </Button>

                      {/* Import Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-xs bg-white hover:bg-gray-50 active:bg-gray-100 border-gray-300 text-gray-700 hover:text-gray-900 shadow-sm transition-all duration-200"
                      >
                        <Import className="h-3 w-3 mr-1" />
                        Import
                      </Button>
                    </div>
                  )}
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
                      sharedFromLocalIds={sharedFromLocalIds}
                      multiSelectMode={multiSelectMode}
                      multiSelectedDocuments={multiSelectedDocuments}
                      onMultiSelectToggle={handleMultiSelectToggle}
                      onEnableMultiSelect={handleEnableMultiSelect}
                    />
                  ) : (
                    <DocumentTableView
                      documents={getCurrentDocuments()}
                      onDocumentSelect={handleDocumentSelect}
                      isFromEPA={false}
                      multiSelectMode={multiSelectMode}
                      multiSelectedDocuments={multiSelectedDocuments}
                      onMultiSelectToggle={handleMultiSelectToggle}
                      onEnableMultiSelect={handleEnableMultiSelect}
                    />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="epa" className="flex-1 min-h-0 mt-0">
                <div className="h-full overflow-y-auto px-6">
                  {viewMode === 'thumbnail' ? (
                    <DocumentThumbnailView
                      onViewDetails={handleViewDetails}
                      documents={getCurrentDocuments()}
                      onDocumentSelect={handleDocumentSelect}
                      localDocuments={localDocumentsList}
                      isFromEPA={true}
                      importedEpaDocumentIds={importedEpaDocumentIds}
                      sharedFromLocalIds={sharedFromLocalIds}
                      multiSelectMode={multiSelectMode}
                      multiSelectedDocuments={multiSelectedDocuments}
                      onMultiSelectToggle={handleMultiSelectToggle}
                      onEnableMultiSelect={handleEnableMultiSelect}
                    />
                  ) : (
                    <DocumentTableView
                      documents={getCurrentDocuments()}
                      onDocumentSelect={handleDocumentSelect}
                      isFromEPA={true}
                      multiSelectMode={multiSelectMode}
                      multiSelectedDocuments={multiSelectedDocuments}
                      onMultiSelectToggle={handleMultiSelectToggle}
                      onEnableMultiSelect={handleEnableMultiSelect}
                    />
                  )}
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
