# Fermata

A structured piano practice companion app for intermediate jazz learners. Build consistent practice habits, track progress, and practice intentionally.

## What is Fermata?

Fermata helps intermediate-level musicians (~2 years experience) organize their practice sessions with:
- **Practice Items**: Cards for exercises, tunes, techniques, scales with configurable variants
- **Daily Sessions**: Time-boxed planning with automatic time allocation
- **Integrated Tools**: Metronome, recorder, backing track player, notes
- **Content Display**: PDF sheet music, MusicXML notation, images, embeds
- **File Management**: Virtual file explorer with cloud storage
- **Progress Tracking**: Variant completion, tempo history, spaced repetition

## Tech Stack

- React 19 + Vite 7 + React Router 7
- Supabase (PostgreSQL + Auth + Storage)
- Material-UI 7
- Vitest (241 tests) + Playwright (7 E2E suites)
- Local-first architecture with cloud sync

## Quick Start

See [app/README.md](app/README.md) for setup instructions.

## Documentation

All project documentation is in `/docs`:

### Start Here (For AI Assistants)
- **[AGENTS.md](docs/AGENTS.md)** - AI guidelines with "Start Here" section for new conversations
- **[PROJECT_CONTEXT.md](docs/PROJECT_CONTEXT.md)** - Project overview, tech stack, current phase

### Core Documentation
- **[GUIDELINES.md](docs/GUIDELINES.md)** - Coding standards + design system (consolidated)
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Technical architecture, data flow, module system
- **[TODO.md](docs/TODO.md)** - Current tasks, priorities, cloud migration roadmap

### Product Specifications
- **[PRD_MVP.md](docs/PRD_MVP.md)** - Master product specification (renamed)
- **[PRD_CLOUD.md](docs/PRD_CLOUD.md)** - Multi-user cloud migration requirements (renamed)
- **[SPEC_COMPOSE.md](docs/SPEC_COMPOSE.md)** - Compose page design spec (renamed)
- **[SPEC_PRACTICE_ITEMS.md](docs/SPEC_PRACTICE_ITEMS.md)** - Practice item data model and UI (renamed)

### Project Management
- **[TODO.md](docs/TODO.md)** - Current tasks, deferred features, cloud migration roadmap

### Case Studies (Archived)
- **[archive/case-studies/COMPOSE_REFACTORING.md](docs/archive/case-studies/COMPOSE_REFACTORING.md)** - Compose refactoring (1,434→212 lines)
- **[archive/case-studies/MODULARITY_ASSESSMENT.md](docs/archive/case-studies/MODULARITY_ASSESSMENT.md)** - Code quality audit (Jan 2026)
- **[archive/case-studies/PROPTYPES_IMPLEMENTATION.md](docs/archive/case-studies/PROPTYPES_IMPLEMENTATION.md)** - PropTypes guide (see GUIDELINES.md)
- **[archive/case-studies/TEST_VALIDATION_REPORT.md](docs/archive/case-studies/TEST_VALIDATION_REPORT.md)** - Test results snapshot (Jan 2026)

Note: These are point-in-time reports. For current guidance, see GUIDELINES.md and TODO.md.

### Archive
- **[docs/archive/](docs/archive/)** - Historical documentation (temp.md, notes.md, SESSION_SUMMARY.md, STORAGE_QUOTA_DEPLOYMENT.md)

## Current Status (January 2026)

**Phase**: MVP complete, pre-user testing

- ✅ Core features: practice items, sessions, tools, file management
- ✅ Storage quota enforcement with visual indicators
- ✅ 241 tests passing, 7 E2E test suites
- ✅ Cloud migration: Phase 1-4 partially complete
- 🔴 **Blockers**: PC browser bugs (expand behavior, recording), cross-browser testing
- **Next**: Complete quality checklist, begin user testing

## License

[License information]

## Contributing

[Contributing guidelines]

