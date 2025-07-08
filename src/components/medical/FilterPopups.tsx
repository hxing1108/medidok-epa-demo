import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { FilterState, FilterOptions } from '@/types/epaInterface';

interface FilterPopupProps {
  activeFilters: FilterState;
  onFilterChange: (filterType: keyof FilterState, value: any) => void;
  onClose: () => void;
  filterOptions: FilterOptions;
}

export const DateFilterPopup: React.FC<FilterPopupProps> = ({
  activeFilters,
  onFilterChange,
  onClose,
}) => (
  <div className="p-3 max-h-80 overflow-y-auto">
    <div className="flex items-center justify-between mb-3">
      <span className="font-medium text-sm">Datum</span>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0"
        onClick={onClose}
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
            onFilterChange('dateRange', {
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
            onFilterChange('dateRange', {
              ...activeFilters.dateRange,
              to: e.target.value,
            })
          }
        />
      </div>

      <Button
        size="sm"
        className="w-full h-8 text-xs"
        onClick={onClose}
      >
        Anwenden
      </Button>
    </div>
  </div>
);

export const CategoryFilterPopup: React.FC<FilterPopupProps> = ({
  onFilterChange,
  onClose,
  filterOptions,
}) => (
  <div className="p-3 max-h-60 overflow-y-auto">
    <div className="flex items-center justify-between mb-3">
      <span className="font-medium text-sm">Kategorie</span>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0"
        onClick={onClose}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>

    <div className="space-y-1">
      {filterOptions.categories.map((category) => (
        <Button
          key={category}
          variant="ghost"
          className="w-full justify-start h-8 p-2 text-xs hover:bg-gray-100"
          onClick={() => {
            onFilterChange('category', [category]);
            onClose();
          }}
        >
          {category}
        </Button>
      ))}
    </div>
  </div>
);

export const EinsenderFilterPopup: React.FC<FilterPopupProps> = ({
  onFilterChange,
  onClose,
  filterOptions,
}) => (
  <div className="p-3 max-h-60 overflow-y-auto">
    <div className="flex items-center justify-between mb-3">
      <span className="font-medium text-sm">Einsender</span>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0"
        onClick={onClose}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>

    <div className="space-y-1">
      {filterOptions.authors.map((author) => (
        <Button
          key={author}
          variant="ghost"
          className="w-full justify-start h-8 p-2 text-xs hover:bg-gray-100"
          onClick={() => {
            onFilterChange('author', [author]);
            onClose();
          }}
        >
          {author}
        </Button>
      ))}
    </div>
  </div>
);

export const InitiatorFilterPopup: React.FC<FilterPopupProps> = ({
  onFilterChange,
  onClose,
  filterOptions,
}) => (
  <div className="p-3 max-h-60 overflow-y-auto">
    <div className="flex items-center justify-between mb-3">
      <span className="font-medium text-sm">Initiator</span>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0"
        onClick={onClose}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>

    <div className="space-y-1">
      {filterOptions.authors.map((author) => (
        <Button
          key={author}
          variant="ghost"
          className="w-full justify-start h-8 p-2 text-xs hover:bg-gray-100"
          onClick={() => {
            onFilterChange('author', [author]);
            onClose();
          }}
        >
          {author}
        </Button>
      ))}
    </div>
  </div>
);

export const DateitypFilterPopup: React.FC<FilterPopupProps> = ({
  onFilterChange,
  onClose,
  filterOptions,
}) => (
  <div className="p-3 max-h-60 overflow-y-auto">
    <div className="flex items-center justify-between mb-3">
      <span className="font-medium text-sm">Dateityp</span>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0"
        onClick={onClose}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>

    <div className="space-y-1">
      {filterOptions.types.map((type) => (
        <Button
          key={type}
          variant="ghost"
          className="w-full justify-start h-8 p-2 text-xs hover:bg-gray-100"
          onClick={() => {
            onFilterChange('type', [type]);
            onClose();
          }}
        >
          {type}
        </Button>
      ))}
    </div>
  </div>
);

export const StatusFilterPopup: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => (
  <div className="p-3 max-h-60 overflow-y-auto">
    <div className="flex items-center justify-between mb-3">
      <span className="font-medium text-sm">Status</span>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0"
        onClick={onClose}
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
              onClose();
            }}
          >
            {status}
          </Button>
        )
      )}
    </div>
  </div>
); 