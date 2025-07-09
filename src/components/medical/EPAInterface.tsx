import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import {
  Search,
  Filter,
  ArrowUpDown,
  LayoutGrid,
  List,
  MoreHorizontal,
  X,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DocumentThumbnailView } from './DocumentThumbnailView';
import { DocumentTableView } from './DocumentTableView';
import { DocumentPreview } from './DocumentPreview';
import { SortingPanel, FilterPanel, OptionsPanel } from './Panels';
import { InlineMultiSelectBar, FilterBar } from './MultiSelectComponents';

import { localDocuments } from '@/data/localDocuments';
import { epaDocuments } from '@/data/epaDocuments';
import { useEpaInterface } from '@/hooks/useEpaInterface';

export function EPAInterface() {
  const {
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
    sharedFromLocalIds,
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

    // Setters
    setPanelSizes,
    setSearchQuery,
    setShowFilters,
    setSortOrder,
    setViewMode,
    setSelectedDocument,
    setSelectedDocuments,
  } = useEpaInterface(localDocuments, epaDocuments);

  const currentDocuments = getCurrentDocuments();
  const filteredDocuments = filterAndSortDocuments(currentDocuments);

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

      {/* Filter Bar */}
      <FilterBar
        showFilters={showFilters}
        activeFilters={activeFilters}
        filterOptions={getFilterOptions()}
        searchQuery={searchQuery}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        onSetShowFilters={setShowFilters}
        onSetSearchQuery={setSearchQuery}
        getActiveFilterCount={getActiveFilterCount}
      />

      {/* Main Content Area */}
      <div
        className="flex-1 flex flex-col min-h-0"
        style={{ backgroundColor: '#F4F7FA' }}
      >
        {selectedDocument || selectedDocuments.length > 0 ? (
          <ResizablePanelGroup
            direction="horizontal"
            className="h-full"
            onLayout={(sizes) => setPanelSizes(sizes)}
          >
            <ResizablePanel defaultSize={panelSizes[0]} minSize={30}>
              <div className="h-full flex flex-col">
                {/* Tab Navigation */}
                <Tabs
                  value={currentTab}
                  onValueChange={handleTabChange}
                  className="h-full flex flex-col"
                >
                  {/* Header with bottom border */}
                  <div className="p-6 pb-0 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <TabsList className="h-8 bg-transparent p-0 border-none">
                        <TabsTrigger
                          value="lokal"
                          className="h-8 px-3 text-sm bg-gray-100 data-[state=active]:bg-[#CEE1F4] data-[state=active]:text-gray-900 rounded-sm mr-1"
                        >
                          Lokal
                        </TabsTrigger>
                        <TabsTrigger
                          value="epa"
                          className="h-8 px-3 text-sm bg-gray-100 data-[state=active]:bg-[#CEE1F4] data-[state=active]:text-gray-900 rounded-sm mr-1"
                        >
                          ePA
                        </TabsTrigger>
                        <TabsTrigger
                          value="plus"
                          className="h-8 px-3 text-sm bg-gray-100 data-[state=active]:bg-[#CEE1F4] data-[state=active]:text-gray-900 rounded-sm"
                        >
                          +
                        </TabsTrigger>
                      </TabsList>

                      {/* Conditional Right Section: Multi-Select Bar OR Toolbar Buttons */}
                      {multiSelectMode && multiSelectedDocuments.size > 0 ? (
                        <InlineMultiSelectBar
                          multiSelectedCount={multiSelectedDocuments.size}
                          currentTab={currentTab}
                          onOpenMultiSelected={handleOpenMultiSelected}
                          onDownloadMultiSelected={handleDownloadMultiSelected}
                          onShareToEpa={handleShareToEpa}
                          onExitMultiSelect={handleExitMultiSelect}
                        />
                      ) : (
                        <div className="flex items-center gap-1">
                          {/* Sort Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-8 w-8 p-0 relative ${
                              rightPanelType === 'sorting' || isSortingActive()
                                ? 'bg-blue-100'
                                : ''
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
                            className="h-8 w-8 p-0"
                            onClick={() => handleOpenPanel('options')}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Document Content */}
                  <TabsContent
                    value="lokal"
                    className="flex-1 m-0 relative overflow-hidden"
                  >
                    {/* Right Panel for split view - positioned below header */}
                    {rightPanelType && (
                      <div className="absolute top-0 right-0 bottom-0 w-80 bg-white shadow-xl border-l z-50">
                        {rightPanelType === 'sorting' && (
                          <SortingPanel
                            onClose={handleClosePanel}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSort={handleSort}
                            onSortOrderChange={setSortOrder}
                          />
                        )}
                        {rightPanelType === 'filter' && (
                          <FilterPanel
                            onClose={handleClosePanel}
                            activeFilters={activeFilters}
                            onFilterChange={handleFilterChange}
                            onClearFilters={clearFilters}
                            onOpenFilterPopup={handleOpenFilterPopup}
                            activeFilterPopup={activeFilterPopup}
                            onCloseFilterPopup={handleCloseFilterPopup}
                            filterOptions={getFilterOptions()}
                          />
                        )}
                        {rightPanelType === 'options' && (
                          <OptionsPanel
                            onClose={handleClosePanel}
                            viewMode={viewMode}
                            onViewModeChange={setViewMode}
                            onOpenPanel={handleOpenPanel}
                          />
                        )}
                      </div>
                    )}
                    <div className="h-full overflow-y-auto px-6 pb-6">
                      {viewMode === 'thumbnail' ? (
                        <DocumentThumbnailView
                          onViewDetails={handleViewDetails}
                          documents={filteredDocuments}
                          onDocumentSelect={handleDocumentSelect}
                          localDocuments={localDocumentsList}
                          sharedFromLocalIds={sharedFromLocalIds}
                          multiSelectMode={multiSelectMode}
                          multiSelectedDocuments={multiSelectedDocuments}
                          onMultiSelectToggle={handleMultiSelectToggle}
                          onEnableMultiSelect={handleEnableMultiSelect}
                        />
                      ) : (
                        <DocumentTableView
                          documents={filteredDocuments}
                          onDocumentSelect={handleDocumentSelect}
                          multiSelectMode={multiSelectMode}
                          multiSelectedDocuments={multiSelectedDocuments}
                          onMultiSelectToggle={handleMultiSelectToggle}
                          onEnableMultiSelect={handleEnableMultiSelect}
                        />
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="epa"
                    className="flex-1 m-0 relative overflow-hidden"
                  >
                    {/* Right Panel for split view - positioned below header */}
                    {rightPanelType && (
                      <div className="absolute top-0 right-0 bottom-0 w-80 bg-white shadow-xl border-l z-50">
                        {rightPanelType === 'sorting' && (
                          <SortingPanel
                            onClose={handleClosePanel}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSort={handleSort}
                            onSortOrderChange={setSortOrder}
                          />
                        )}
                        {rightPanelType === 'filter' && (
                          <FilterPanel
                            onClose={handleClosePanel}
                            activeFilters={activeFilters}
                            onFilterChange={handleFilterChange}
                            onClearFilters={clearFilters}
                            onOpenFilterPopup={handleOpenFilterPopup}
                            activeFilterPopup={activeFilterPopup}
                            onCloseFilterPopup={handleCloseFilterPopup}
                            filterOptions={getFilterOptions()}
                          />
                        )}
                        {rightPanelType === 'options' && (
                          <OptionsPanel
                            onClose={handleClosePanel}
                            viewMode={viewMode}
                            onViewModeChange={setViewMode}
                            onOpenPanel={handleOpenPanel}
                          />
                        )}
                      </div>
                    )}
                    <div className="h-full overflow-y-auto px-6 pb-6">
                      {viewMode === 'thumbnail' ? (
                        <DocumentThumbnailView
                          onViewDetails={handleViewDetails}
                          documents={filteredDocuments}
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
                          documents={filteredDocuments}
                          onDocumentSelect={handleDocumentSelect}
                          isFromEPA={true}
                          localDocuments={localDocumentsList}
                          importedEpaDocumentIds={importedEpaDocumentIds}
                          sharedFromLocalIds={sharedFromLocalIds}
                          multiSelectMode={multiSelectMode}
                          multiSelectedDocuments={multiSelectedDocuments}
                          onMultiSelectToggle={handleMultiSelectToggle}
                          onEnableMultiSelect={handleEnableMultiSelect}
                        />
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="plus"
                    className="flex-1 m-0 relative overflow-hidden"
                  >
                    {/* Right Panel for split view - positioned below header */}
                    {rightPanelType && (
                      <div className="absolute top-0 right-0 bottom-0 w-80 bg-white shadow-xl border-l z-50">
                        {rightPanelType === 'sorting' && (
                          <SortingPanel
                            onClose={handleClosePanel}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSort={handleSort}
                            onSortOrderChange={setSortOrder}
                          />
                        )}
                        {rightPanelType === 'filter' && (
                          <FilterPanel
                            onClose={handleClosePanel}
                            activeFilters={activeFilters}
                            onFilterChange={handleFilterChange}
                            onClearFilters={clearFilters}
                            onOpenFilterPopup={handleOpenFilterPopup}
                            activeFilterPopup={activeFilterPopup}
                            onCloseFilterPopup={handleCloseFilterPopup}
                            filterOptions={getFilterOptions()}
                          />
                        )}
                        {rightPanelType === 'options' && (
                          <OptionsPanel
                            onClose={handleClosePanel}
                            viewMode={viewMode}
                            onViewModeChange={setViewMode}
                            onOpenPanel={handleOpenPanel}
                          />
                        )}
                      </div>
                    )}
                    <div className="h-full overflow-y-auto px-6 pb-6 flex items-center justify-center">
                      <div className="text-center">
                        <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          Weitere Optionen
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={panelSizes[1]} minSize={25}>
              <DocumentPreview
                document={selectedDocument}
                documents={
                  selectedDocuments.length > 1 ? selectedDocuments : undefined
                }
                onClose={() => {
                  setSelectedDocument(null);
                  setSelectedDocuments([]);
                }}
                onFullscreen={handleFullscreen}
                onDownload={handleDownloadDocument}
                isMetadataCollapsed={metadataCollapsedState[currentTab]}
                onToggleMetadata={handleToggleMetadata}
                localDocuments={localDocumentsList}
                isFromEPA={currentTab === 'epa'}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          /* Full-screen document view when no document selected */
          <div className="h-full relative">
            {/* Tab Navigation for full-screen */}
            <Tabs
              value={currentTab}
              onValueChange={handleTabChange}
              className="h-full flex flex-col"
            >
              <div className="sticky top-0 z-10 p-6 pb-0 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <TabsList className="h-8 bg-transparent p-0 border-none">
                    <TabsTrigger
                      value="lokal"
                      className="h-8 px-3 text-sm bg-gray-100 data-[state=active]:bg-[#CEE1F4] data-[state=active]:text-gray-900 rounded-sm mr-1"
                    >
                      Lokal
                    </TabsTrigger>
                    <TabsTrigger
                      value="epa"
                      className="h-8 px-3 text-sm bg-gray-100 data-[state=active]:bg-[#CEE1F4] data-[state=active]:text-gray-900 rounded-sm mr-1"
                    >
                      ePA
                    </TabsTrigger>
                    <TabsTrigger
                      value="plus"
                      className="h-8 px-3 text-sm bg-gray-100 data-[state=active]:bg-[#CEE1F4] data-[state=active]:text-gray-900 rounded-sm"
                    >
                      +
                    </TabsTrigger>
                  </TabsList>

                  {/* Toolbar for full-screen view */}
                  {multiSelectMode && multiSelectedDocuments.size > 0 ? (
                    <InlineMultiSelectBar
                      multiSelectedCount={multiSelectedDocuments.size}
                      currentTab={currentTab}
                      onOpenMultiSelected={handleOpenMultiSelected}
                      onDownloadMultiSelected={handleDownloadMultiSelected}
                      onShareToEpa={handleShareToEpa}
                      onExitMultiSelect={handleExitMultiSelect}
                    />
                  ) : (
                    <div className="flex items-center gap-1">
                      {/* Sort Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 w-8 p-0 relative ${
                          rightPanelType === 'sorting' || isSortingActive()
                            ? 'bg-blue-100'
                            : ''
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

                      {/* Search */}
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
                        className="h-8 w-8 p-0"
                        onClick={() => handleOpenPanel('options')}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Document Content for full-screen */}
              <TabsContent
                value="lokal"
                className="flex-1 m-0 relative overflow-hidden"
              >
                {/* Right Panel for this tab */}
                {rightPanelType && (
                  <div className="absolute top-0 right-0 bottom-0 w-80 bg-white shadow-xl border-l z-50">
                    {rightPanelType === 'sorting' && (
                      <SortingPanel
                        onClose={handleClosePanel}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        onSort={handleSort}
                        onSortOrderChange={setSortOrder}
                      />
                    )}
                    {rightPanelType === 'filter' && (
                      <FilterPanel
                        onClose={handleClosePanel}
                        activeFilters={activeFilters}
                        onFilterChange={handleFilterChange}
                        onClearFilters={clearFilters}
                        onOpenFilterPopup={handleOpenFilterPopup}
                        activeFilterPopup={activeFilterPopup}
                        onCloseFilterPopup={handleCloseFilterPopup}
                        filterOptions={getFilterOptions()}
                      />
                    )}
                    {rightPanelType === 'options' && (
                      <OptionsPanel
                        onClose={handleClosePanel}
                        viewMode={viewMode}
                        onViewModeChange={setViewMode}
                        onOpenPanel={handleOpenPanel}
                      />
                    )}
                  </div>
                )}

                <div className="h-full overflow-y-auto px-6 pb-6">
                  {viewMode === 'thumbnail' ? (
                    <DocumentThumbnailView
                      onViewDetails={handleViewDetails}
                      documents={filteredDocuments}
                      onDocumentSelect={handleDocumentSelect}
                      localDocuments={localDocumentsList}
                      sharedFromLocalIds={sharedFromLocalIds}
                      multiSelectMode={multiSelectMode}
                      multiSelectedDocuments={multiSelectedDocuments}
                      onMultiSelectToggle={handleMultiSelectToggle}
                      onEnableMultiSelect={handleEnableMultiSelect}
                    />
                  ) : (
                    <DocumentTableView
                      documents={filteredDocuments}
                      onDocumentSelect={handleDocumentSelect}
                      multiSelectMode={multiSelectMode}
                      multiSelectedDocuments={multiSelectedDocuments}
                      onMultiSelectToggle={handleMultiSelectToggle}
                      onEnableMultiSelect={handleEnableMultiSelect}
                    />
                  )}
                </div>
              </TabsContent>

              <TabsContent
                value="epa"
                className="flex-1 m-0 relative overflow-hidden"
              >
                {/* Right Panel for this tab */}
                {rightPanelType && (
                  <div className="absolute top-0 right-0 bottom-0 w-80 bg-white shadow-xl border-l z-50">
                    {rightPanelType === 'sorting' && (
                      <SortingPanel
                        onClose={handleClosePanel}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        onSort={handleSort}
                        onSortOrderChange={setSortOrder}
                      />
                    )}
                    {rightPanelType === 'filter' && (
                      <FilterPanel
                        onClose={handleClosePanel}
                        activeFilters={activeFilters}
                        onFilterChange={handleFilterChange}
                        onClearFilters={clearFilters}
                        onOpenFilterPopup={handleOpenFilterPopup}
                        activeFilterPopup={activeFilterPopup}
                        onCloseFilterPopup={handleCloseFilterPopup}
                        filterOptions={getFilterOptions()}
                      />
                    )}
                    {rightPanelType === 'options' && (
                      <OptionsPanel
                        onClose={handleClosePanel}
                        viewMode={viewMode}
                        onViewModeChange={setViewMode}
                        onOpenPanel={handleOpenPanel}
                      />
                    )}
                  </div>
                )}

                <div className="h-full overflow-y-auto px-6 pb-6">
                  {viewMode === 'thumbnail' ? (
                    <DocumentThumbnailView
                      onViewDetails={handleViewDetails}
                      documents={filteredDocuments}
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
                      documents={filteredDocuments}
                      onDocumentSelect={handleDocumentSelect}
                      isFromEPA={true}
                      localDocuments={localDocumentsList}
                      importedEpaDocumentIds={importedEpaDocumentIds}
                      sharedFromLocalIds={sharedFromLocalIds}
                      multiSelectMode={multiSelectMode}
                      multiSelectedDocuments={multiSelectedDocuments}
                      onMultiSelectToggle={handleMultiSelectToggle}
                      onEnableMultiSelect={handleEnableMultiSelect}
                    />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="plus" className="flex-1 m-0 px-6 pb-6">
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Weitere Optionen</p>
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
