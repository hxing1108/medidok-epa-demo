import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { X, Share, ChevronDown } from 'lucide-react';
import { FilterState, FilterOptions } from '@/types/epaInterface';

interface MultiSelectBarProps {
  multiSelectedCount: number;
  currentTab: 'lokal' | 'epa';
  onOpenMultiSelected: () => void;
  onDownloadMultiSelected: () => void;
  onShareToEpa: () => void;
  onExitMultiSelect: () => void;
}

interface InlineMultiSelectBarProps extends MultiSelectBarProps {}

interface FilterBarProps {
  showFilters: boolean;
  activeFilters: FilterState;
  filterOptions: FilterOptions;
  searchQuery: string;
  onFilterChange: (filterType: keyof FilterState, value: any) => void;
  onClearFilters: () => void;
  onSetShowFilters: (show: boolean) => void;
  onSetSearchQuery: (query: string) => void;
  getActiveFilterCount: () => number;
}

export const InlineMultiSelectBar: React.FC<InlineMultiSelectBarProps> = ({
  multiSelectedCount,
  currentTab,
  onOpenMultiSelected,
  onDownloadMultiSelected,
  onShareToEpa,
  onExitMultiSelect,
}) => {
  return (
    <div className="flex items-center gap-4 bg-white rounded-lg px-4 py-2 shadow-sm border">
      <span className="text-sm font-medium text-blue-900">
        {multiSelectedCount} ausgewählt
      </span>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          className="h-7 px-3 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={onOpenMultiSelected}
        >
          Öffnen
        </Button>
        {currentTab === 'epa' && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-3 text-blue-700 hover:bg-blue-100"
            onClick={onDownloadMultiSelected}
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
              <DropdownMenuItem onClick={onShareToEpa}>
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
          onClick={onExitMultiSelect}
          title="Mehrfachauswahl beenden"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};



export const FilterBar: React.FC<FilterBarProps> = ({
  showFilters,
  activeFilters,
  filterOptions,
  searchQuery,
  onFilterChange,
  onClearFilters,
  onSetShowFilters,
  onSetSearchQuery,
  getActiveFilterCount,
}) => {
  if (!showFilters) return null;

  return (
    <div className="border-b bg-gray-50 px-6 py-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">Filter</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-7 px-2 text-xs"
          >
            Zurücksetzen
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSetShowFilters(false)}
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
                    onFilterChange('category', newCategories);
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
                    onFilterChange('type', newTypes);
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
                    onFilterChange('author', newAuthors);
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
                onFilterChange('dateRange', {
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
                onFilterChange('dateRange', {
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
                  onFilterChange(
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
                  onFilterChange(
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
                  onFilterChange(
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
                onClick={() => onSetSearchQuery('')}
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