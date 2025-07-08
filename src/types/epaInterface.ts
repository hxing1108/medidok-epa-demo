export type PanelType = 'sorting' | 'filter' | 'options' | null;

export type SortField = 'name' | 'date' | 'category' | 'author';
export type SortOrder = 'asc' | 'desc';

export interface FilterState {
  category: string[];
  type: string[];
  dateRange: { from?: string; to?: string };
  author: string[];
}

export interface EPAInterfaceState {
  currentTab: 'lokal' | 'epa';
  viewMode: 'thumbnail' | 'table';
  isFullscreen: boolean;
  panelSizes: number[];
  metadataCollapsedState: {
    lokal: boolean;
    epa: boolean;
  };
}

export interface SearchState {
  searchQuery: string;
  isSearchExpanded: boolean;
  showFilters: boolean;
}

export interface SortState {
  sortBy: SortField;
  sortOrder: SortOrder;
}

export interface MultiSelectState {
  multiSelectMode: boolean;
  multiSelectedDocuments: Set<string>;
}

export interface FilterOptions {
  categories: string[];
  types: string[];
  authors: string[];
} 