# TODO

## 🔴 Critical (Blocks User Testing)

- [ ] **Recording System - Virtual Audio Device Setup** ⚡ HIGH PRIORITY

  - [x] Fix confusing "System Audio" option that shows screen share dialog
  - [x] Update Settings UI with clear guidance for VST/DAW users
  - [x] Test on Mac with BlackHole (VST works)
    - [x] Install BlackHole (https://github.com/ExistentialAudio/BlackHole)
    - [x] Route Addictive Keys → BlackHole → Fermata
    - [x] Verify recording works without screen share dialog
    - [ ] Verify with hardware piano (audio interface) if needed
    - [ ] Document exact steps for digital piano users
  - [ ] Create "Recording from VST/DAW" documentation (step-by-step)
    - [ ] Mac: BlackHole setup with Addictive Keys example (tested)
    - [ ] Windows: Voicemeeter Banana setup (tested)
    - [ ] Windows alternatives: VB-Cable + ASIO Pro (tested, not working)
    - [ ] Common troubleshooting (no device listed, no audio captured, DAW routing)
  - [x] Test on PC with VB-Cable (failed)
  - [x] Test on PC with ASIO Pro (failed)
  - [x] Test on PC with Voicemeeter Banana (working)
  - [ ] Test on iPad (if applicable to digital piano users)
    - [ ] Investigate USB MIDI + audio interface routing
    - [ ] Document limitations
  - Note: Digital piano → VST users (like Addictive Keys) are a PRIMARY use case, not edge case
  - Spec: [RECORDING_SYSTEM_SPEC.md](app/docs/RECORDING_SYSTEM_SPEC.md)

  ### Recent user-reported issues (high priority)

- [ ] **Cross-browser testing**
  - [x] Chrome on PC/Mac
  - [ ] Firefox on PC/Mac
  - [ ] Safari on Mac
  - [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## 📋 Next Up (Quality & Stability)

- [ ] Backing track still fails on production (switched to object URLs; verify storage URLs + CSP on prod)
- [ ] **Library Sync Efficiency** ⚡ DEFERRED
  - [ ] Update `localProvider.ts` to support merging in `practiceItems.save` instead of overwriting the whole list.
  - [ ] Update hooks (`useNotesDrafts.ts`, `useTodayViewModel.ts`) to send only changed/new items to the data provider.



## 🎯 Anticipated Features (Post-MVP)

Features likely to be implemented after initial user testing:

- [ ] **Teacher-Student system** (Q1 2026)

  - [ ] Teacher role permissions
  - [ ] Student enrollment system
  - [ ] Course sharing (teacher → students)
  - [ ] Course file access RLS
  - [ ] Student progress visibility for teachers

- [ ] **Course Marketplace** (Q2 2026)

  - [ ] Composer role permissions
  - [ ] Course publishing workflow
  - [ ] Course discovery UI
  - [ ] Course enrollment for students
  - [ ] Revenue sharing (70/30 split)

- [ ] **Payments integration** (Q2 2026)

  - [ ] Stripe integration
  - [ ] Subscription management UI
  - [ ] Plan upgrade/downgrade flows
  - [ ] Payment webhooks
  - [ ] Billing history page

- [ ] **Analytics & dashboards** (Q3 2026)

  - [ ] Practice time tracking
  - [ ] Variant completion analytics
  - [ ] Spaced repetition effectiveness
  - [ ] Teacher dashboards (student progress)
  - [ ] Composer dashboards (course sales)

- [ ] **Advanced auth features** (Q3-Q4 2026)
  - [x] OAuth providers (Google completed; Apple deferred)
  - [ ] 2FA (TOTP, SMS)
  - [ ] Device management

## 🔄 Deferred (Until User Feedback)

These features await real user testing to validate priorities:

- [ ] **Local → Cloud migration tool** (Deferred for now)

  - [ ] Export user data from IndexedDB
  - [ ] Import into Supabase with conflict resolution
  - [ ] Verify data integrity after migration

- [ ] **Advanced Performance Analysis** (Deferred until performance issues reported)

  - [ ] React DevTools profiling (identify re-render issues)
  - [ ] List rendering optimization (test with 500+ items)
  - [ ] Lighthouse audit all routes (target: Performance > 90)
  - [ ] Memory profiling (detect leaks, validate cleanup)
  - Note: Core optimizations complete (63% bundle reduction). Defer deeper analysis until users report issues.
  - Docs: [WEEK2_IMPLEMENTATION_RESULTS.md](app/docs/case-studies/WEEK2_IMPLEMENTATION_RESULTS.md), [PERFORMANCE_PROFILING_PLAN.md](docs/case-studies/PERFORMANCE_PROFILING_PLAN.md)

- [ ] **Accessibility Audit** (Deferred until UI redesign)

  - [x] Added aria-labels to BackingTrackPlayer buttons (A, B, zoom controls)
  - [x] Added global focus-visible styles with outline and offset
  - [ ] Complete keyboard navigation testing (tab order, shortcuts)
  - [ ] Complete screen reader compatibility audit
  - [ ] Color contrast validation (defer until new color palette finalized)
  - [ ] Focus states review (verify modal traps, complex components)
  - [ ] Interactive elements accessibility verification
  - Note: Structural improvements (aria-labels, focus styles) completed and will work with any redesign

- [ ] **Server-side file validation** (Deferred for private beta)

  - See [SERVER_SIDE_FILE_VALIDATION.md](app/docs/SERVER_SIDE_FILE_VALIDATION.md) for full spec
  - Trigger: Public launch or first security audit recommendation
  - Note: Current client-side validation + RLS policies provide adequate security for MVP

- [ ] **Scale variant arrangements**

  - [ ] Circle of fifths ordering
  - [ ] Chromatic progression
  - [ ] Diatonic progressions
  - Deferred: Need to validate which orderings users actually want

- [x] **Spaced Repetition System (SRS) for Variants** ✅ COMPLETED 2026-01-10

  - [x] Implement `getVariantWithSRS` in `variantEngine.js` (Due > New > Future prioritization)
  - [x] Integrate SRS logic into `usePracticeVariants.js` (calculate intervals, persist stats)
  - [x] Add "Spaced Repetition (SRS)" selection mode to UI
  - [x] Unit tests for SRS variant selection
  - [ ] Future: Add UI for quality rating (Again/Hard/Good/Easy) instead of default "Good"
  - Files: `variantEngine.js`, `usePracticeVariants.js`, `usePracticeViewModel.jsx`, `ComposeVariationsSection.jsx`

- [ ] **Variant improvements**

  - [ ] Add variant axes for articulation, dynamics, phrasing
  - [ ] Variant display improvements (clarity + density)
  - [ ] Variant axis randomization rules
  - Deferred: Current variant system may be sufficient; validate with users first

- [ ] **Content integrations**

  - [ ] iReal Pro integration (import charts)
  - [ ] MuseScore import/export
  - [ ] MIDI playback support
  - Deferred: Validate user workflows before committing to integrations

- [ ] **Storage enhancements**

  - [ ] Signed URL streaming for large files (>5MB)
  - [ ] Resumable uploads for unreliable connections
  - [ ] Storage breakdown by file type (PDFs, recordings, images)
  - [ ] Email notifications at 80%/95% storage usage
  - [ ] "Upgrade Plan" button in Settings when quota reached
  - Deferred: Current storage system may be sufficient for MVP users

- [ ] **UX improvements**

  - [ ] "Compose directly from item" - edit buttons on Library/Today rows
  - [x] Direct practice mode - play a single item from Today without session planning
  - [ ] Library filter by level, type, course
  - [ ] Library sort by date added, level, alphabetically
  - [ ] Finished practice notification (gong sound + visual emphasis)
  - Deferred: Validate actual user workflows before adding shortcuts

- [ ] **Content viewer enhancements**

  - [ ] MusicXML annotations and markup
  - [ ] PDF form-filling for chord charts
  - [ ] Multi-page PDF side-by-side view
  - [ ] Metronome visual mode (flashing, bouncing ball)
  - [ ] Additional time signatures (5/4, 7/8, compound meters)
  - Deferred: Current viewer sufficient; wait for user feature requests

- [ ] **Notes enhancements**

  - [ ] Rich text editor improvements (font size, colors, tables)
  - [ ] Voice recording notes
  - [ ] Notes search/filter
  - Deferred: Current notes system may be adequate

- [ ] **User-facing documentation**

  - [ ] User onboarding/tutorial flow (first-time user experience)
  - [ ] Storage quota guide (what counts, how to manage, upgrade options)
  - [ ] File management guide (upload, organize, best practices)
  - [ ] Video tutorials for key workflows
  - Deferred: Wait until user testing to understand what documentation is actually needed

- [ ] **Testing**
  - [ ] Additional E2E test coverage for edge cases
  - [ ] Visual regression testing with Percy/Chromatic
  - [ ] Load testing with large datasets
  - Deferred: Add after user testing reveals critical paths

## Misc: Bug Fixes

Small bugs and edge cases to address:

- [ ] Session timer doesn't pause when tab loses focus
- [ ] PDF viewer zoom resets on page change
- [ ] Metronome drift after 5+ minutes
- [ ] File explorer drag-drop occasionally fails on Firefox
- [ ] Toast notifications stack instead of queuing
- [ ] Fix flaky E2E test in `resources.spec.js` (timed out waiting for "Add" button)

## 💡 Misc: Small Improvements

Quick wins to improve UX:

- [ ] Add keyboard shortcuts to Practice page (Space = pause/play metronome, N = next item)
- [ ] Show estimated session time on Today page before starting
- [ ] Add "Copy variant" button to quickly duplicate with small changes
- [ ] Remember last-used category/level when creating new items
- [ ] Add bulk operations to Library (delete multiple, change category)
- [ ] Show practice streak counter on Today page
- [ ] Add "Recently practiced" section to Library

## 💬 Misc: Feedback Received

Track user feedback here when testing begins:

- None yet (pre-user testing)

## ✅ Completed (Archive)

Recent completions for reference:

### January 2026

- [x] **Resources & References: inline list editor** (Jan 2026)
  - Implemented `ResourceListEditor` component with add/edit/delete functionality
  - Auto-linkify URLs in text
  - Accessibility support with keyboard navigation
  - Unit tests added

- [x] **UI & Bug Fixes** (Jan 10-11, 2026)
  - **Today Page Empty State**: Fixed crash when Today list is empty
  - **Library UI**: Aligned practice item row elements and fixed trashcan icon layout
  - **Supabase**: Resolved connection errors (ERR_SOCKET_NOT_CONNECTED)
  - **JJazzLab**: Fixed audio playback in interactive demo

- [x] **Today page: Reordering practice items broken**

  - Symptoms: Drag-and-drop formerly worked; after recent CSS changes reorder no longer applies
  - Reproduce: Open Today session, try to drag a practice item to reorder
  - Steps:
    - [x] Investigate CSS/layout changes that may have disabled dnd-kit/draggable handles
    - [x] Add regression unit test for list reorder
    - [x] Restore drag handle visibility and drop behavior
    - [x] QA on Chrome
    - [x] QA on Firefox/Safari

- [x] **Compose page: persistent action bar + actions**

  - Goal: Keep the action bar with Save visible at all times (sticky) and add actions: Add to Today, Duplicate, Save
  - Requirements:
    - [x] Sticky persistent save button visible while scrolling
    - [x] Add "Add to Today" button (adds current item to today's session)
    - [x] Add "Duplicate" (copy full content, but clear item name field)
    - [x] Prevent automatic navigation to Compose after completing an action (no auto-jump)
    - [x] Unit + accessibility tests for sticky controls

- [x] **Recording quality adjustment during capture**

  - Symptoms: Recorded audio exhibits automatic volume/level fluctuations during capture (sounds like live normalization)
  - Steps:
    - [x] Reproduce with virtual cable and microphone inputs on PC & Mac
    - [x] Inspect MediaStream track constraints / gain nodes / WebAudio processing in `useRecorder.js`
    - [x] Check whether an AnalyserNode / DynamicsCompressor or automatic gain node is enabled accidentally
    - [x] Disable any unintended gain normalization or smoothing (constraints)
    - [x] Add regression test and document findings in RECORDING_SYSTEM_SPEC.md

- [x] **Content: new type — YouTube link embed**

  - Allow a content block to be a YouTube URL which embeds the video in the content frame
  - Tasks:
    - [x] Add new content type `youtube` to content model
    - [x] Render embed iframe with safe `rel=0` and `allow` attributes; sanitize input
    - [x] Add UI for adding YouTube link in Compose (validate URL)
    - [x] Add unit & E2E tests

- [x] **Practice session map (jump + progress)**

  - [x] Collapsible session map grouped with practice timer
  - [x] Jump to any item in the session
  - [x] Unit tests for session map and jump handler

- [x] Add metronome volume slider
- [x] Fix PDF content frame size regression after CSS changes
- [x] Sequential vs random variants: confirm behavior + make UI state obvious
- [x] Make tool headers (e.g., "Metronome") clickable for collapse/expand, not just the triangle
- [x] Tools page file browser: add "Import" button next to "New folder"
- [x] Drag-and-drop files from desktop into file explorer (validate allowed formats: audio + notation)
- [x] Session view: add "Edit practice item" button in expanded row
- [x] Document practice item ownership (user-owned; future sharing will duplicate items)

- [x] **Security Review** (Jan 8, 2026)

  - RLS policy comprehensive audit (12 tables + storage bucket protected)
  - Input validation review - Fixed XSS vulnerability in noteUtils
  - HTTP security headers added to vercel.json (CSP, X-Frame-Options, etc.)
  - File upload validation documented - Server-side deferred (see docs)
  - Auth edge cases documented for manual testing (see docs)
  - Result: ✅ Strong security foundation with comprehensive RLS, fixed XSS regex, added HTTP headers
  - Docs: [SERVER_SIDE_FILE_VALIDATION.md](app/docs/SERVER_SIDE_FILE_VALIDATION.md), [AUTH_EDGE_CASES.md](app/docs/AUTH_EDGE_CASES.md)

- [x] **Testing & Test Coverage** (Jan 8, 2026)

  - Run full test suite and verify all 310 unit tests pass (1 skipped)
  - Run all 10 E2E tests and verify they pass
  - Test storage quota enforcement (verified via integration tests)
  - Test Today.jsx CSS modules (no visual regressions, E2E tests pass)
  - Mobile responsiveness (verified via existing responsive design patterns)
  - Test session rehydration (verified via architecture and E2E tests)
  - Fixed 1 flaky E2E test by increasing toast message timeout
  - Result: ✅ All tests passing, comprehensive coverage across unit, integration, and E2E

- [x] **Deploy storage quota SQL** (Jan 8, 2026)

  - Run `app/supabase/storage_quota_functions.sql` in Supabase dashboard
  - Verify RPC functions created
  - Test quota enforcement

- [x] **View-Model decomposition & testing** (Jan 8, 2026)

  - Decomposed useTodayViewModel (374→296 lines, 21% reduction) and useLibraryViewModel (246→114 lines, 54% reduction)
  - Created 5 focused sub-hooks: useSessionPresets, useSessionDragDrop, useTimeAdjustments, useLibraryFilters, useLibraryActions
  - Added comprehensive test coverage: 71 new tests (8-14 tests per hook)
  - Updated AGENTS.md with View-Model Decomposition pattern and complexity limits
  - All 310 tests passing

- [x] **Technical Documentation** (Jan 8, 2026)

  - DATA_PROVIDER_API.md: Complete interface docs for local/cloud providers
  - DATABASE_SCHEMA.md: Full schema with RLS policies and storage quota system
  - COMPONENT_PATTERNS.md: React patterns for presentational, stateful, data-connected components
  - ERROR_HANDLING.md: Error boundary, toast, storage, and hook error patterns
  - TESTING_PATTERNS.md: Unit test, E2E, mock, and integration test patterns
  - PERFORMANCE.md: Bundle size, React performance, list rendering, network optimization
  - TROUBLESHOOTING.md: Common issues and solutions

- [x] **Code Review & Cleanup** (Jan 8, 2026)

  - Removed unused imports and dead code
  - Removed console.logs and debug statements
  - Checked for TODO/FIXME comments in code
  - Verified error handling is comprehensive
  - Ensured error messages are user-friendly
  - Fixed 10+ ESLint errors, all tests passing

- [x] **Performance Profiling - Bundle Optimization** (Jan 8, 2026)

  - Bundle size analysis and baseline report
  - Implemented route-based code splitting (Admin route lazy loaded)
  - Implemented feature-based lazy loading (PDF.js, MusicXML, React Admin)
  - Added CI bundle size monitoring with enforced limits
  - Result: ✅ 63% bundle reduction (3,763 KB → 1,382 KB), 60% faster initial load
  - Docs: [WEEK2_IMPLEMENTATION_RESULTS.md](app/docs/case-studies/WEEK2_IMPLEMENTATION_RESULTS.md)
  - Note: Advanced profiling (React DevTools, Lighthouse, memory) deferred - see Deferred section

- [x] **Storage quota feature** (Jan 7-8, 2026)
  - StorageQuotaIndicator component with visual progress bar
  - Settings page integration showing usage and plan
  - Supabase RPC functions for quota calculation
  - Database triggers for automatic storage tracking
  - Upload enforcement blocks when quota exceeded
  - Comprehensive test coverage (17 unit + 9 integration tests)

### December 2025 - January 2026

- [x] **CSS Modules Migration** (Dec 2025 - Jan 2026)

  - Migrated 12 modules: LoadingSkeleton, RoleBadge, Recordings, Metronome, Backing Track, Notes, Content Viewer, StorageQuotaIndicator, ScaleSelector, PracticeVariations
  - Migrated 5 pages: Today, Practice, Library, Tools, Settings
  - Reduced app.css from 3,401 to 2,188 lines (36% reduction)
  - Eliminated global class conflicts, improved maintainability

- [x] **Compose.jsx refactoring** (Dec 2025)

  - Reduced 1,434 → 212 lines (85% reduction)
  - Replaced 51 useState calls → 1 useForm (React Hook Form)
  - Extracted 7 section components with single responsibilities
  - Added PropTypes to all section components
  - All 241 tests passing after refactor

- [x] **Today.jsx CSS modules migration** (Dec 2025)

  - Reduced 508 → 258 lines
  - Migrated to CSS Modules (Today.module.css)
  - Improved maintainability and eliminated global class conflicts

- [x] **Cloud provider implementation** (Dec 2025)
  - cloudProvider.js (853 lines) implements full provider interface
  - Supabase adapter with RLS-aware queries
  - Auth UI gating when VITE_DATA_PROVIDER=cloud
  - E2E tests run against Supabase in dev

### October - November 2025

- [x] **Cloud Migration Roadmap - Phases 1-3** (Oct-Nov 2025)

  - **Phase 1: Foundation** - Supabase project setup, schema + RLS policies, auth UI, data provider pattern
  - **Phase 2: Data Sync** - Cloud providers for practice items, sessions, settings, files, recordings
  - **Phase 3: Storage** - Supabase Storage buckets, file upload/download, storage quota tracking + enforcement

- [x] **React Admin console** (Nov 2025)

  - User management (view, edit role, block)
  - E2E tests against Supabase

- [x] **File management system** (Nov 2025)

  - Virtual file explorer (folder tree, drag-drop, rename)
  - File picker dialog for selecting files in Compose
  - PDF cropper for page selection
  - Content viewer with fullscreen mode

- [x] **Supabase schema + RLS** (Nov 2025)

  - schema_step1.sql: tables for items, sessions, files, recordings
  - schema_step2.sql: RLS policies filtering by user_id
  - Storage buckets with RLS on folder paths

- [x] **Testing infrastructure** (Oct-Nov 2025)
  - Vitest configuration with jsdom
  - Playwright E2E test suite (7 test files)
  - Test helpers and fixtures
  - 241 unit tests across 48 files
  - E2E tests for session flow, library, tools, recordings

- [x] **Google Login Implementation** (Jan 2026)
  - Enabled Google OAuth in Supabase and App
  - Implemented robust URL hash parsing to bypass Supabase client race conditions
  - Updated UI to vertical stack for future extensibility
  - Deferred Apple Login per user request
  - Docs: [SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md)

---

## Notes

**Deferred Conditions Format**: Items marked "Deferred: [condition]" should not be implemented until the condition is met (e.g., user feedback received, technical blocker resolved).

**Priority System**:

- 🔴 Critical = Blocks user testing or production deployment
- 📋 Next Up = High priority, should be done soon
- 🔄 Deferred = Wait for user feedback or specific trigger
- 🚀 Cloud Migration = Follows 9-phase roadmap timeline
- Misc categories = Address opportunistically

**Checkbox Usage**:

- Empty `[ ]` = Not started
- In progress items should be explicitly marked in commit messages
- Completed `[x]` = Done and verified with tests

**Task Structure**:

- Top-level tasks are work items that can be completed independently
- Sub-tasks (indented) are optional breakdowns for clarity
- Sub-tasks help track progress but aren't required for completion
- Add new tasks to appropriate category as they arise
