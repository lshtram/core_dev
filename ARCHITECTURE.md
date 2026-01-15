# Architecture

## Layered Architecture

Fermata follows a strict layered architecture to maintain separation of concerns and testability:

```
┌─────────────────────────────────────────────┐
│  UI Layer (Pages + Components)              │
│  - React components                         │
│  - Event handlers                           │
│  - JSX rendering                            │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│  State Layer (Hooks + View Models)          │
│  - Custom hooks (useContext, useState)      │
│  - Local component state                    │
│  - Feature-specific state management        │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│  Domain Layer (Models + Pure Logic)         │
│  - Factory functions (createPracticeItem)   │
│  - Business rules (spaced repetition)       │
│  - Algorithms (variant engine)              │
│  - Pure utilities (no side effects)         │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│  Data Layer (Provider Pattern + Caching)    │
│  - Storage adapters (local/cloud)           │
│  - In-memory caching with TTL               │
│  - Data access API                          │
└──────────────────┬──────────────────────────┘
                   │
            ┌──────┴──────┐
            ▼             ▼
      LocalProvider   CloudProvider
      (IndexedDB)     (Supabase)
```

### Key Principles

1. **Pages are orchestrators** - Assemble hooks/components, pass handlers down, no complex logic inline
2. **Components never call data APIs directly** - All data access through `src/data` exports or module hooks
3. **Domain logic is pure** - No side effects, no storage calls, easily testable
4. **Data layer handles caching** - Components don't implement their own caching

## Data Provider Pattern

### Provider Selection

```javascript
// src/data/provider.js
export const getDataProvider = () => {
  const { dataProvider } = getFeatureFlags();
  if (dataProvider === "cloud") {
    return cloudProvider; // Supabase
  }
  return localProvider; // IndexedDB/localStorage
};
```

Controlled via `VITE_DATA_PROVIDER` environment variable (`local` or `cloud`).

### Provider Interface

Both providers implement identical interface:

```javascript
{
  practiceItems: {
    load: () => Promise<PracticeItem[]>,
    save: (items) => Promise<void>
  },
  sessions: {
    loadPlan: (dateKey) => Promise<SessionPlan | null>,
    savePlan: (plan) => Promise<void>,
    loadRuntime: (dateKey) => Promise<SessionRuntime | null>,
    saveRuntime: (runtime, dateKey) => Promise<void>,
    clearRuntime: (dateKey) => Promise<void>
  },
  files: {
    load: () => Promise<FileNode[]>,
    save: (files) => Promise<void>
  },
  fileContent: {
    load: (fileId) => Promise<Blob>,
    save: (fileId, blob) => Promise<void>,
    delete: (fileId) => Promise<void>
  },
  settings: {
    load: () => Promise<Settings>,
    save: (settings) => Promise<void>
  },
  recordings: {
    list: (itemId) => Promise<Recording[]>,
    save: (recording) => Promise<Recording>,
    delete: (recordingId) => Promise<void>
  }
}
```

### Caching Strategy

**Location**: `src/data/cache.js`

**Cache Keys**:
- `practiceItems` - TTL: 5 minutes
- `sessionPlan:YYYY-MM-DD` - TTL: 1 minute
- `sessionRuntime:YYYY-MM-DD` - TTL: 15 seconds
- `files` - TTL: 5 minutes

**Pattern**:
```javascript
// Read flow
export const load = async () => {
  const cached = getFromCache('practiceItems');
  if (cached) return cached;
  
  const items = await getDataProvider().practiceItems.load();
  setCache('practiceItems', items, 300); // 5min
  return items;
};

// Write flow
export const save = async (items) => {
  await getDataProvider().practiceItems.save(items);
  setCache('practiceItems', items, 300);
};
```

## Module System

Isolated, reusable features in `src/modules/`:

```
src/modules/
  auth/                  # Authentication UI + AuthProvider context
  backing-track/         # Audio player with waveform, tempo control
  content-import/        # File picker, PDF cropper, file selector
  content-viewer/        # PDF/MusicXML/image/embed viewer + fullscreen
  file-explorer/         # Virtual file tree (Finder-like)
  file-management/       # File utilities
  layout/                # Header, navigation, top bar
  metronome/             # Metronome engine, panel, settings editor
  notes/                 # Rich text notes editor + inline display
  practice-item-row/     # Reusable practice item card component
  recordings/            # Audio recorder, recording list, waveform
  session-timers/        # Session timer, item timer, time allocation
  settings/              # Settings sections
  storage-quota/         # Quota indicator + enforcement
```

Each module exports public API and keeps internal implementation private.

## Directory Structure

```
src/
  pages/              # Route-level screens (Today, Practice, Compose, Library, Tools, Settings)
  components/         # Shared UI components (LoadingSkeleton, Toast, TagInput, etc.)
  modules/            # Isolated feature modules (see above)
  hooks/              # Custom React hooks
    data/             # Data-fetching hooks
    practice/         # Practice session hooks
    view-models/      # View model hooks
  data/               # Data access layer
    providers/        # localProvider, cloudProvider
    supabase/         # Supabase adapter, client initialization
    admin/            # Admin data provider (React Admin)
    index.js          # Public API with caching
  domain/             # Pure business logic
    models.js         # Factory functions (createPracticeItem, etc.)
    fileNodes.js      # Virtual file tree logic
    variantEngine.js  # Variant selection algorithms
    spacedRepetition.js
    time.js           # Time utilities
  utils/              # Pure utility functions
  styles/             # Global styling
    tokens.css        # Design tokens
    global.css        # Resets, base styles
    app.css           # Utilities (migrating to CSS Modules)
  assets/             # Images, icons
```

## State Management

**No global state library** (no Redux, Zustand, MobX).

**State hierarchy**:
1. **Local component state** - `useState` for simple UI state
2. **Feature context** - `useContext` + `useState` for shared state within modules
3. **Data layer cache** - In-memory cache with TTL in `src/data/cache.js`
4. **Persistent storage** - IndexedDB (local) or Supabase (cloud)

**Form state**: React Hook Form for complex forms (Compose page), controlled inputs for simple forms.

**Auth state**: `AuthProvider` context wraps entire app, listens to Supabase auth changes.

## Data Flow

### Read Flow

```
Component
    ↓
practiceItems.load()  (src/data/index.js)
    ↓
Check cache (5min TTL)
    ├─ Hit → return cached
    └─ Miss → call provider
              ↓
          getDataProvider()
              ↓
        ┌─────┴─────┐
        ▼           ▼
  localProvider  cloudProvider
        ↓           ↓
    IndexedDB    Supabase REST
        ↓           ↓
    Cache result + return
```

### Write Flow

```
Component
    ↓
practiceItems.save(items)  (src/data/index.js)
    ↓
getDataProvider().practiceItems.save(items)
    ├─ localProvider → IndexedDB
    └─ cloudProvider → Supabase REST + RLS check
              ↓
    Update cache (5min TTL)
              ↓
    Return to component
```

## Supabase Cloud Architecture

### Database Schema

**Users**: `user_id` (UUID, from Supabase Auth), `email`, `role` (student/teacher/composer/admin), `plan` (free/premium)

**Practice Items**: `id`, `user_id`, `title`, `category`, `variants`, `settings`, etc.

**Sessions**: `session_plan` table for daily plans, `session_runtime` for active session state

**Files**: Virtual file tree stored as JSON array in `file_nodes` table

**File Content**: Supabase Storage buckets (`user-files`, `course-files`)

**Recordings**: Metadata in `recordings` table, audio blobs in Supabase Storage

### Row-Level Security (RLS)

**All tables have RLS enabled** with policies filtering by `user_id = auth.uid()`.

**CloudProvider enforces RLS** - all queries include `user_id` filter automatically.

**Storage buckets**: RLS policies check folder ownership (user-files must start with `{user_id}/`).

### Authentication

Supabase Auth with email/password login. `AuthProvider` context manages auth state:

```javascript
const { user, role, isAuthenticated, signIn, signOut } = useAuth();
```

When `VITE_DATA_PROVIDER=cloud` and user not authenticated, show auth screen.

## Testing Architecture

### Unit Tests (Vitest - 241 tests)

**What to test**:
- Domain logic (models, variantEngine, spacedRepetition)
- Data layer (storage, fileStore, fileUtils)
- Module logic (metronome, recordings, storage-quota)
- Components (LoadingSkeleton, Toast, AppErrorBoundary)
- Hooks (useStorageQuota)

**Mocking strategy**:
- IndexedDB: `tests/helpers/fakeIndexedDb.js`
- Audio APIs: Mock `AudioContext`, `MediaRecorder`
- File APIs: Mock `File`, `FileReader`
- Supabase: `vi.mock('../../data/supabase/adapter.js')`

### E2E Tests (Playwright - 7 suites)

**What to test**:
- Complete user workflows (practice session, item CRUD, tools usage)
- Cross-page navigation and state persistence
- File upload/download flows
- Recording and playback

**Configuration**:
- Can run against local provider or Supabase
- Global setup clears test user data before run
- Environment: `VITE_DATA_PROVIDER=cloud`, `E2E_SUPABASE_SERVICE_KEY`

## Props Typing Strategy

**Strict TypeScript is mandated** for all new code to ensure static type safety.

**TypeScript-only props typing**:
- Reusable components define TypeScript props types/interfaces
- Required props enforced via TypeScript, no PropTypes usage
- Complex objects modeled via TypeScript types

## CSS Architecture

**Migrating from** 3,400-line `app.css` monolith **to** CSS Modules.

**Current state**: 10% complete (329 lines migrated).

**Strategy**:
- Keep design tokens in `tokens.css` (global)
- Keep resets/base styles in `global.css` (global)
- Component-specific styles → `ComponentName.module.css` (colocated)
- Use camelCase class names (`componentName`, `primaryButton`)

**Completed**: LoadingSkeleton, RoleBadge, Recordings module

**Next priority**: Metronome, Backing Track, Content Viewer
