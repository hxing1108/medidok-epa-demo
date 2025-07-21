# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Docker Commands (Recommended for Security)
- `npm run docker:dev` - Start development in Docker container
- `npm run docker:down` - Stop Docker container
- `npm run docker:shell` - Access container shell
- `npm run docker:logs` - View container logs
- `npm run docker:clean` - Full cleanup

### Standard Commands (If Not Using Docker)
- `npm install` - Install dependencies
- `npm run dev` - Start development server on port 8080
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run build:dev` - Build in development mode

## High-Level Architecture

This is a medical document management system with EPA (Electronic Patient Archive) integration built with React and TypeScript.

### Core Architecture Pattern

The application follows a **centralized state management pattern** using a custom hook (`useEpaInterface`) that manages all interface state and business logic. This hook serves as the single source of truth for:
- Document lists (local and EPA)
- UI state (tabs, view modes, panels)
- Selection and multi-selection
- Filtering, sorting, and searching
- Document transfer between local and EPA

### Key Components Structure

1. **EPAInterface** (`/src/components/medical/EPAInterface.tsx`) - Main orchestrator component that:
   - Uses `ResizablePanel` for split-view layout
   - Implements tab navigation between "Lokal" and "EPA" documents
   - Supports thumbnail and table view modes
   - Manages document preview panel

2. **Document Display Components**:
   - `DocumentThumbnailView` - Card-based grid display with hover effects
   - `DocumentTableView` - Tabular display with sortable columns
   - `DocumentPreview` - Full document preview with metadata
   - Both views support multi-selection mode

3. **State Flow**:
   - All state is managed in `useEpaInterface` hook
   - Components receive state and handlers as props
   - No prop drilling - direct connection between hook and components

### Important Implementation Details

1. **Document Transfer Logic**:
   - EPA → Local: Documents are copied with `importedFromEPA` flag
   - Local → EPA: Documents are shared with `sharedFromLocal` flag
   - Duplicate prevention using Set tracking (`importedEpaDocumentIds`, `sharedFromLocalIds`)

2. **Neue EPA Documents**:
   - Special status for new EPA documents with notification badges
   - Tracked via `neueEPA` property and `viewedNeueEpaIds` Set
   - Automatically marked as viewed when opened or downloaded

3. **Multi-Select Mode**:
   - Activated by long-press or checkbox interaction
   - Enables batch operations (download, share, open)
   - Automatically exits when changing tabs

4. **Responsive Design**:
   - Uses Tailwind CSS with custom medical color scheme
   - Resizable panels with collapsible metadata sections
   - Mobile-responsive with `use-mobile` hook

### UI Component Library

Uses shadcn/ui components extensively:
- All UI components in `/src/components/ui/`
- Customized with medical-specific styling
- Key components: Button, Card, Table, Dialog, Tabs, ResizablePanel

### Data Structure

Documents follow this structure:
```typescript
interface Document {
  id: string;
  name: string;
  category: string;
  type: string;
  creationDate: string;
  author: string;
  department?: string;
  thumbnailUrl?: string;
  source: 'local' | 'epa';
  importedFromEPA?: boolean;
  sharedFromLocal?: boolean;
  neueEPA?: boolean;
}
```

### Styling Approach

- Tailwind CSS with custom configuration
- Medical-specific color variables (medical-success, medical-warning, etc.)
- CSS-in-JS avoided in favor of Tailwind classes
- Custom animations for accordions and transitions