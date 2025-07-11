import { useState, useEffect, useMemo } from 'react';
import { Document } from '@/components/medical/DocumentThumbnailView';
import {
  FilterState,
  SortField,
  SortOrder,
  PanelType,
  EPAInterfaceState,
  SearchState,
  SortState,
  MultiSelectState,
  FilterOptions,
} from '@/types/epaInterface';
import { useToast } from '@/hooks/use-toast';
import consentFormPreview from '@/assets/consent-form-preview.jpg';
import labResultsPreview from '@/assets/lab-results-preview.jpg';

export const useEpaInterface = (
  localDocuments: Document[],
  epaDocuments: Document[]
) => {
  const { toast } = useToast();

  // Main interface state
  const [currentTab, setCurrentTab] = useState<'lokal' | 'epa'>('lokal');
  const [viewMode, setViewMode] = useState<'thumbnail' | 'table'>('thumbnail');
  const [selectedDocuments, setSelectedDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [metadataCollapsedState, setMetadataCollapsedState] = useState({
    lokal: true,
    epa: false,
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [panelSizes, setPanelSizes] = useState([65, 35]);
  const [localDocumentsList, setLocalDocumentsList] =
    useState<Document[]>(localDocuments);
  const [importedEpaDocumentIds, setImportedEpaDocumentIds] = useState<
    Set<string>
  >(new Set());
  const [sharedToEpaDocuments, setSharedToEpaDocuments] = useState<Document[]>(
    []
  );
  const [sharedFromLocalIds, setSharedFromLocalIds] = useState<Set<string>>(
    new Set()
  );
  const [viewedNeueEpaIds, setViewedNeueEpaIds] = useState<Set<string>>(
    new Set()
  );

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Sort state
  const [sortBy, setSortBy] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Filter state
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    category: [],
    type: [],
    dateRange: {},
    author: [],
  });

  // Panel state
  const [rightPanelType, setRightPanelType] = useState<PanelType>(null);
  const [activeFilterPopup, setActiveFilterPopup] = useState<string | null>(
    null
  );

  // Multi-select state
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [multiSelectedDocuments, setMultiSelectedDocuments] = useState<
    Set<string>
  >(new Set());

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
          doc.type.toLowerCase().includes(query)
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
      // First priority: neue ePA documents should always appear at the top
      if (a.neueEPA && !b.neueEPA) return -1;
      if (!a.neueEPA && b.neueEPA) return 1;

      // Then apply regular sorting for documents with the same neueEPA status
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

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
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
      (activeFilters.dateRange.from || activeFilters.dateRange.to ? 1 : 0)
    );
  };

  const isSortingActive = () => {
    return sortBy !== 'date' || sortOrder !== 'desc';
  };

  const isSearchActive = () => {
    return searchQuery.trim().length > 0;
  };

  const getCurrentDocuments = () => {
    if (currentTab === 'lokal') {
      return localDocumentsList;
    } else {
      // For ePA documents, modify the neueEPA property based on viewed status
      const modifiedEpaDocuments = epaDocuments.map((doc) => ({
        ...doc,
        neueEPA: doc.neueEPA && !viewedNeueEpaIds.has(doc.id),
      }));
      return [...modifiedEpaDocuments, ...sharedToEpaDocuments];
    }
  };

  // Helper function to get thumbnail URL when downloading an ePA document
  const getDownloadedThumbnailUrl = (document: Document): string => {
    // Map specific documents to their preview images by ID first
    switch (document.id) {
      case 'epa1':
        return consentFormPreview;
      case 'epa2':
        return labResultsPreview;
      case 'epa3':
        return '/lovable-uploads/8cae94e0-2f38-4e68-8c3a-892c27d9737d.png';
      case 'epa4':
        return '/lovable-uploads/ab9f6edf-0cba-4d66-91a9-bc06361442ab.png';
      case 'epa5':
        return '/lovable-uploads/6f562a21-8024-4997-af46-2b5ab9795ab5.png';
      case 'epa6':
        return '/lovable-uploads/12077eaa-68d7-48ce-b4cc-abf50d07abbb.png';
      case 'epa7':
        return '/lovable-uploads/e193902b-cc7a-47da-b505-65107a38930e.png';
      case 'epa8':
        return '/lovable-uploads/62f8033e-7725-4828-b0d5-1265c6405663.png';
    }

    // Fallback to name/category matching
    if (
      document.name.includes('Patienteneinverständnis') ||
      document.category === 'EINVERST'
    ) {
      return consentFormPreview;
    }
    if (document.name.includes('Laborwerte') || document.category === 'LAB') {
      return labResultsPreview;
    }
    if (
      document.name.includes('Neurologischer') ||
      document.department === 'NEURO'
    ) {
      return '/lovable-uploads/8cae94e0-2f38-4e68-8c3a-892c27d9737d.png';
    }
    if (
      document.name.includes('Echokardiographie') ||
      document.department === 'KARDIO'
    ) {
      return '/lovable-uploads/ab9f6edf-0cba-4d66-91a9-bc06361442ab.png';
    }
    // Default fallback based on category/type
    if (document.category === 'BESC') {
      return '/src/assets/befundbericht-preview.jpg';
    }
    if (document.category === 'CT' || document.name.includes('CT')) {
      return '/src/assets/ct-thorax-preview.jpg';
    }
    if (document.category === 'MRT' || document.name.includes('MRT')) {
      return '/src/assets/mrt-kopf-preview.jpg';
    }
    // Generic fallback
    return '/lovable-uploads/8cae94e0-2f38-4e68-8c3a-892c27d9737d.png';
  };

  const getFilterOptions = (): FilterOptions => {
    const currentDocs = getCurrentDocuments();
    return {
      categories: [...new Set(currentDocs.map((doc) => doc.category))],
      types: [...new Set(currentDocs.map((doc) => doc.type))],
      authors: [...new Set(currentDocs.map((doc) => doc.author))],
    };
  };

  // Document handlers
  const handleViewDetails = (documents: Document[]) => {
    setSelectedDocuments(documents);
    setViewMode('table');
  };

  const handleDocumentSelect = (document: Document) => {
    if (multiSelectMode) {
      return;
    }
    setSelectedDocument(document);

    // Mark neue ePA documents as viewed when opened
    if (document.neueEPA && currentTab === 'epa') {
      setViewedNeueEpaIds((prev) => new Set([...prev, document.id]));
    }
  };

  const handleDownloadDocument = (document: Document) => {
    console.log('Downloading document:', document.name);

    if (currentTab === 'epa') {
      // Add to imported EPA document IDs
      setImportedEpaDocumentIds((prev) => new Set([...prev, document.id]));

      // Mark neue ePA documents as viewed when downloaded
      if (document.neueEPA) {
        setViewedNeueEpaIds((prev) => new Set([...prev, document.id]));
      }

      // Create a new local document with thumbnailUrl and importedFromEPA flag
      const newLocalDoc = {
        ...document,
        source: 'local' as const,
        importedFromEPA: true,
        neueEPA: false, // Remove neueEPA flag for local copies
        // Add thumbnailUrl when downloading (simulating actual download with preview)
        thumbnailUrl: getDownloadedThumbnailUrl(document),
      };

      // Add to local documents list if not already there
      setLocalDocumentsList((prev) => {
        const existingIds = new Set(prev.map((d) => d.id));
        if (!existingIds.has(document.id)) {
          return [...prev, newLocalDoc];
        }
        return prev;
      });

      // Show success toast
      toast({
        title: 'Von ePA heruntergeladen',
        description: `${document.name} wurde erfolgreich heruntergeladen und ist nun in der lokalen Bilderliste verfügbar.`,
        variant: 'default',
      });
    }
  };

  const handleDownloadMultiSelected = () => {
    const allDocs = getCurrentDocuments();
    const selectedDocs = allDocs.filter((doc) =>
      multiSelectedDocuments.has(doc.id)
    );

    selectedDocs.forEach((doc) => {
      console.log('Downloading:', doc.name);
    });

    if (currentTab === 'epa') {
      const newImportedIds = new Set([
        ...importedEpaDocumentIds,
        ...selectedDocs.map((doc) => doc.id),
      ]);
      setImportedEpaDocumentIds(newImportedIds);

      // Mark neue ePA documents as viewed when downloaded
      const neueEpaDocsToMark = selectedDocs.filter((doc) => doc.neueEPA);
      if (neueEpaDocsToMark.length > 0) {
        setViewedNeueEpaIds((prev) => new Set([
          ...prev,
          ...neueEpaDocsToMark.map((doc) => doc.id)
        ]));
      }

      const newLocalDocs = selectedDocs.map((doc) => ({
        ...doc,
        source: 'local' as const,
        importedFromEPA: true,
        neueEPA: false, // Remove neueEPA flag for local copies
        // Add thumbnailUrl when downloading (simulating actual download with preview)
        thumbnailUrl: getDownloadedThumbnailUrl(doc),
      }));

      setLocalDocumentsList((prev) => {
        const existingIds = new Set(prev.map((d) => d.id));
        const uniqueNewDocs = newLocalDocs.filter(
          (doc) => !existingIds.has(doc.id)
        );
        return [...prev, ...uniqueNewDocs];
      });
    }

    setMultiSelectMode(false);
    setMultiSelectedDocuments(new Set());
  };

  const handleShareToEpa = () => {
    const allDocs = getCurrentDocuments();
    const selectedDocs = allDocs.filter((doc) =>
      multiSelectedDocuments.has(doc.id)
    );

    // Filter out documents that are already shared to avoid duplicates
    const docsToShare = selectedDocs.filter(
      (doc) => !sharedFromLocalIds.has(doc.id)
    );

    if (docsToShare.length === 0) {
      // All selected documents are already shared
      setMultiSelectMode(false);
      setMultiSelectedDocuments(new Set());
      return;
    }

    const newSharedDocs = docsToShare.map((doc) => ({
      ...doc,
      sharedFromLocal: true,
    }));

    setSharedToEpaDocuments((prev) => [...prev, ...newSharedDocs]);
    setSharedFromLocalIds(
      (prev) => new Set([...prev, ...docsToShare.map((doc) => doc.id)])
    );

    // Show success toast
    const documentText =
      docsToShare.length === 1
        ? `${docsToShare[0].name} wurde`
        : `${docsToShare.length} Dokumente wurden`;

    toast({
      title: 'Zu ePA geteilt',
      description: `${documentText} erfolgreich zur ePA geteilt und ist nun im ePA-Tab verfügbar.`,
      variant: 'default',
    });

    setMultiSelectMode(false);
    setMultiSelectedDocuments(new Set());
  };

  // Multi-select handlers
  const handleMultiSelectToggle = (documentId: string) => {
    const newSelected = new Set(multiSelectedDocuments);
    if (newSelected.has(documentId)) {
      newSelected.delete(documentId);
    } else {
      newSelected.add(documentId);
    }
    setMultiSelectedDocuments(newSelected);

    if (newSelected.size === 0) {
      setMultiSelectMode(false);
    }
  };

  const handleEnableMultiSelect = (documentId: string) => {
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
      if (isFullscreen) {
        setIsFullscreen(false);
      }

      if (selectedDocs.length === 1) {
        setSelectedDocument(selectedDocs[0]);
        setSelectedDocuments([]);
      } else {
        setSelectedDocument(null);
        setSelectedDocuments(selectedDocs);
      }
    }
  };

  // Tab and view handlers
  const handleTabChange = (value: string) => {
    if (multiSelectMode) {
      setMultiSelectMode(false);
      setMultiSelectedDocuments(new Set());
    }
    setSelectedDocument(null);
    setSelectedDocuments([]);
    setCurrentTab(value as 'lokal' | 'epa');
  };

  const handleToggleMetadata = () => {
    setMetadataCollapsedState((prev) => ({
      ...prev,
      [currentTab]: !prev[currentTab],
    }));
  };

  const handleFullscreen = () => {
    setIsFullscreen(true);
  };

  const handleExitFullscreen = () => {
    setIsFullscreen(false);
  };

  // Panel handlers
  const handleOpenPanel = (panelType: PanelType) => {
    setRightPanelType(rightPanelType === panelType ? null : panelType);
  };

  const handleClosePanel = () => {
    setRightPanelType(null);
  };

  // Search handlers
  const handleSearchToggle = () => {
    if (isSearchExpanded) {
      setIsSearchExpanded(false);
      setSearchQuery('');
    } else {
      setIsSearchExpanded(true);
    }
  };

  const handleSearchBlur = () => {
    if (!searchQuery.trim()) {
      setIsSearchExpanded(false);
    }
  };

  // Filter popup handlers
  const handleOpenFilterPopup = (filterType: string) => {
    setActiveFilterPopup(filterType);
  };

  const handleCloseFilterPopup = () => {
    setActiveFilterPopup(null);
  };

  // Escape key handler
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

  return {
    // State
    currentTab,
    viewMode,
    selectedDocuments,
    selectedDocument,
    metadataCollapsedState,
    isFullscreen,
    panelSizes,
    localDocumentsList,
    importedEpaDocumentIds,
    sharedToEpaDocuments,
    sharedFromLocalIds,
    viewedNeueEpaIds,
    searchQuery,
    isSearchExpanded,
    showFilters,
    sortBy,
    sortOrder,
    activeFilters,
    rightPanelType,
    activeFilterPopup,
    multiSelectMode,
    multiSelectedDocuments,

    // Handlers
    handleViewDetails,
    handleDocumentSelect,
    handleDownloadDocument,
    handleDownloadMultiSelected,
    handleShareToEpa,
    handleMultiSelectToggle,
    handleEnableMultiSelect,
    handleExitMultiSelect,
    handleClearSelection,
    handleOpenMultiSelected,
    handleTabChange,
    handleToggleMetadata,
    handleFullscreen,
    handleExitFullscreen,
    handleOpenPanel,
    handleClosePanel,
    handleSearchToggle,
    handleSearchBlur,
    handleOpenFilterPopup,
    handleCloseFilterPopup,
    handleSort,
    handleFilterChange,
    clearFilters,

    // Utility functions
    filterAndSortDocuments,
    getActiveFilterCount,
    isSortingActive,
    isSearchActive,
    getCurrentDocuments,
    getFilterOptions,

    // Setters for external use
    setCurrentTab,
    setViewMode,
    setSelectedDocuments,
    setSelectedDocument,
    setMetadataCollapsedState,
    setIsFullscreen,
    setPanelSizes,
    setLocalDocumentsList,
    setImportedEpaDocumentIds,
    setSharedToEpaDocuments,
    setSharedFromLocalIds,
    setViewedNeueEpaIds,
    setSearchQuery,
    setIsSearchExpanded,
    setShowFilters,
    setSortBy,
    setSortOrder,
    setActiveFilters,
    setRightPanelType,
    setActiveFilterPopup,
    setMultiSelectMode,
    setMultiSelectedDocuments,
  };
};
