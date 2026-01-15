# Project Context

## What is Fermata?

Fermata is a **structured piano practice companion app** designed for intermediate jazz piano learners who want to build consistent practice habits, track progress, and practice intentionally rather than mechanically. The target user has ~2 years of experience and is working on jazz standards, comping, improvisation, blues/bebop vocabulary outside of formal lessons.

## Core Features

- **Practice Items**: Cards representing exercises, tunes, techniques, voicings, scales—each with configurable variants (tempos, keys, rhythms)
- **Daily Practice Sessions**: Time-boxed planning with automatic time allocation, variant progression, and session timing
- **Integrated Tools**: Metronome, audio recorder, backing track player, rich-text notes—all contextual to current practice item
- **Content Display**: PDF sheet music, MusicXML notation (OpenSheetMusicDisplay), images, Soundslice embeds with fullscreen viewer
- **Progress Tracking**: Variant completion, tempo history, spaced repetition scheduling, practice time logs
- **File Management**: Virtual file explorer (like Finder/Explorer) with folders, drag-drop, cloud storage for practice content

## Tech Stack

**Frontend**: React 19 + Vite 7 + React Router 7 + Material-UI 7 + React Hook Form  
**Backend**: Supabase (PostgreSQL + Auth + Storage + RLS)  
**Testing**: Vitest (241 unit tests) + Playwright (7 E2E suites)  
**Architecture**: Local-first with cloud sync via data provider pattern  
**Styling**: CSS Modules (migrating from 3,400-line app.css monolith)  
**Validation**: TypeScript-only props typing + **TypeScript Strict Mode**

## Current Phase

**MVP Complete, Pre-User Testing** (January 2026)

- Core features: practice items, sessions, tools, file management ✅
- Storage quota enforcement with visual indicators ✅ (just deployed)
- 241 tests passing, 7 E2E test suites ✅
- Cloud migration: Phase 1-4 partially complete (auth, RLS, multi-user foundation)
- **Blockers**: PC browser bugs (expand behavior, recording), cross-browser testing
- **Next**: Complete quality checklist, begin user testing, iterate based on feedback

## Long-Term Vision

Multi-user platform with 4 roles (Student, Teacher, Composer, Admin), course marketplace with monetization ($9.99 student, $29.99 teacher subscriptions), advanced analytics, enhanced spaced repetition. 6-month cloud migration roadmap with teacher-student relationships, course enrollment, billing integration.

## Documentation Structure

All project documentation lives in `/docs`:
- **AGENTS.md** - AI assistant guidelines (start here for new conversations)
- **PROJECT_CONTEXT.md** - This file - project overview and current status
- **GUIDELINES.md** - Coding standards + design system (single source of truth)
- **ARCHITECTURE.md** - Technical architecture, data flow, module system
- **TODO.md** - Current tasks, deferred features, cloud migration roadmap
- **PRD_MVP.md** - Master product specification
- **PRD_CLOUD.md** - Multi-user cloud migration requirements
- **SPEC_COMPOSE.md**, **SPEC_PRACTICE_ITEMS.md** - Feature specifications
- **archive/** - Historical docs and point-in-time reports
