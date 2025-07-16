import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Close,
  Calendar,
  ArrowsVertical,
  Reset,
  Document,
  User,
  Filter,
  Settings,
  Grid,
  List,
  ChevronDown,
} from '@carbon/icons-react';
import { FilterState, SortField, SortOrder, PanelType } from '@/types/epaInterface';
import {
  DateFilterPopup,
  CategoryFilterPopup,
  EinsenderFilterPopup,
  InitiatorFilterPopup,
  DateitypFilterPopup,
  StatusFilterPopup,
} from './FilterPopups';

interface PanelProps {
  onClose: () => void;
}

interface SortingPanelProps extends PanelProps {
  sortBy: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
  onSortOrderChange: (order: SortOrder) => void;
}

interface FilterPanelProps extends PanelProps {
  activeFilters: FilterState;
  onFilterChange: (filterType: keyof FilterState, value: any) => void;
  onClearFilters: () => void;
  onOpenFilterPopup?: (filterType: string) => void;
  activeFilterPopup?: string | null;
  onCloseFilterPopup?: () => void;
  filterOptions?: any;
}

interface OptionsPanelProps extends PanelProps {
  viewMode: 'thumbnail' | 'table';
  onViewModeChange: (mode: 'thumbnail' | 'table') => void;
  onOpenPanel: (panelType: PanelType) => void;
}

export const SortingPanel: React.FC<SortingPanelProps> = ({
  onClose,
  sortBy,
  sortOrder,
  onSort,
  onSortOrderChange,
}) => (
  <div className="h-full flex flex-col">
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onClose}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="font-medium">Sortierung</span>
      </div>
      <Button variant="ghost" size="sm" onClick={onClose}>
        <Close className="h-4 w-4" />
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
              onValueChange={(value: SortField) => onSort(value)}
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
              onValueChange={(value: SortOrder) => onSortOrderChange(value)}
            >
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <ArrowsVertical className="h-4 w-4" />
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

export const FilterPanel: React.FC<FilterPanelProps> = ({
  onClose,
  activeFilters,
  onFilterChange,
  onClearFilters,
  onOpenFilterPopup,
  activeFilterPopup,
  onCloseFilterPopup,
  filterOptions,
}) => {
  return (
    <div className="h-full flex flex-col relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="font-medium">Filter</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <Close className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 p-4 overflow-visible">
        <div className="space-y-4">
          {/* Reset Button */}
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="w-full justify-start text-left h-auto p-0"
          >
            <div className="flex items-center gap-2">
              <Reset className="h-4 w-4" />
              <span className="text-sm">Zurücksetzen</span>
            </div>
          </Button>

          {/* Filter Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Filter hinzufügen</h3>
            
            {/* Date Filter */}
            <Button
              variant="outline"
              className="w-full justify-start text-left h-auto p-3"
              onClick={() => onOpenFilterPopup?.('datum')}
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Datum</span>
              </div>
            </Button>

            {/* Category Filter */}
            <Button
              variant="outline"
              className="w-full justify-start text-left h-auto p-3"
              onClick={() => onOpenFilterPopup?.('kategorie')}
            >
              <div className="flex items-center gap-2">
                <Document className="h-4 w-4" />
                <span className="text-sm">Kategorie</span>
              </div>
            </Button>

            {/* Author Filter */}
            <Button
              variant="outline"
              className="w-full justify-start text-left h-auto p-3"
              onClick={() => onOpenFilterPopup?.('einsender')}
            >
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm">Einsender</span>
              </div>
            </Button>

            {/* Type Filter */}
            <Button
              variant="outline"
              className="w-full justify-start text-left h-auto p-3"
              onClick={() => onOpenFilterPopup?.('dateityp')}
            >
              <div className="flex items-center gap-2">
                <Document className="h-4 w-4" />
                <span className="text-sm">Dateityp</span>
              </div>
            </Button>
          </div>

          {/* Active Filters Display */}
          <div className="space-y-2">
            {(activeFilters.category.length > 0 || 
              activeFilters.author.length > 0 || 
              activeFilters.type.length > 0 || 
              activeFilters.dateRange.from || 
              activeFilters.dateRange.to) && (
              <h3 className="text-sm font-medium text-gray-700 mt-6">Aktive Filter</h3>
            )}
            {/* Category Filter Active */}
            {activeFilters.category.length > 0 && (
              <div className="flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Document className="h-4 w-4 text-blue-600" />
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
                  onClick={() => onFilterChange('category', [])}
                >
                  <Close className="h-3 w-3" />
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
                  onClick={() => onFilterChange('author', [])}
                >
                  <Close className="h-3 w-3" />
                </Button>
              </div>
            )}

            {/* Type Filter Active */}
            {activeFilters.type.length > 0 && (
              <div className="flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Document className="h-4 w-4 text-blue-600" />
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
                  onClick={() => onFilterChange('type', [])}
                >
                  <Close className="h-3 w-3" />
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
                  onClick={() => onFilterChange('dateRange', {})}
                >
                  <Close className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Popups positioned relative to the panel */}
      {activeFilterPopup === 'datum' && (
        <div className="absolute right-full top-20 mr-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          <DateFilterPopup
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
            onClose={onCloseFilterPopup}
            filterOptions={filterOptions}
          />
        </div>
      )}
      {activeFilterPopup === 'kategorie' && (
        <div className="absolute right-full top-20 mr-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          <CategoryFilterPopup
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
            onClose={onCloseFilterPopup}
            filterOptions={filterOptions}
          />
        </div>
      )}
      {activeFilterPopup === 'einsender' && (
        <div className="absolute right-full top-20 mr-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          <EinsenderFilterPopup
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
            onClose={onCloseFilterPopup}
            filterOptions={filterOptions}
          />
        </div>
      )}
      {activeFilterPopup === 'initiator' && (
        <div className="absolute right-full top-20 mr-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          <InitiatorFilterPopup
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
            onClose={onCloseFilterPopup}
            filterOptions={filterOptions}
          />
        </div>
      )}
      {activeFilterPopup === 'dateityp' && (
        <div className="absolute right-full top-20 mr-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          <DateitypFilterPopup
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
            onClose={onCloseFilterPopup}
            filterOptions={filterOptions}
          />
        </div>
      )}
      {activeFilterPopup === 'status' && (
        <div className="absolute right-full top-20 mr-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          <StatusFilterPopup onClose={onCloseFilterPopup} />
        </div>
      )}
    </div>
  );
};

export const OptionsPanel: React.FC<OptionsPanelProps> = ({
  onClose,
  viewMode,
  onViewModeChange,
  onOpenPanel,
}) => (
  <div className="h-full flex flex-col">
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <span className="font-medium">Optionen anzeigen</span>
      </div>
      <Button variant="ghost" size="sm" onClick={onClose}>
        <Close className="h-4 w-4" />
      </Button>
    </div>

    <div className="flex-1 p-4">
      <div className="space-y-2">
        {/* Layout Option */}
        <Button
          variant="ghost"
          className="w-full justify-between h-auto p-3 border rounded"
          onClick={() =>
            onViewModeChange(viewMode === 'thumbnail' ? 'table' : 'thumbnail')
          }
        >
          <div className="flex items-center gap-2">
            <Grid className="h-4 w-4" />
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
          onClick={() => onOpenPanel('filter')}
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
          onClick={() => onOpenPanel('sorting')}
        >
          <div className="flex items-center gap-2">
            <ArrowsVertical className="h-4 w-4" />
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