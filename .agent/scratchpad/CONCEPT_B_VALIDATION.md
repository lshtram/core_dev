# Concept: Project B (Piano Practice App)

## 1. Description

A high-integrity practice companion for musicians that replaces fragmented tools with a single, structured environment.
**Core Philosophy**: "Calm, intentional, and modular."

### Key Workflows

1.  **Session Orchestration**: Planning "Today's Session" with specific time allocations and items.
2.  **Practice Logic**: A "Player" that handles variation axes (e.g., practicing 12 keys), tempo ramping, and completion rules.
3.  **Media Integration**: Seamless viewing of PDFs, MusicXML, and Soundslice embeds alongside practice tools.
4.  **Audio Tools**: Real-time metronome, audio recorder (with metadata), and backing track player with tempo shifting.
5.  **Virtual Library**: A cloud-backed file system for managing sheet music, recordings, and backing tracks.

---

## 2. Validation Against Core SaaS Framework

### ✅ Good Fit

- **File System Abstraction**: Project B's heavy reliance on a "Virtual File Explorer" and "Content Blocks" perfectly validates our `File System` requirement. The SaaS base should provide the **base Explorer and Storage logic**, while Project B adds the **Notation Viewers**.
- **RBAC Hierarchy**: The "User" vs "Course Admin" model maps cleanly to our Teacher/Student roles.
- **Reporting**: The "Session Timing" and "Practice Counters" can leverage the `ReportProvider` for generating progress PDF/Excel logs.
- **Modularity**: Project B's "Public API for Modules" approach aligns with our `Architecture` goals (Domain-Driven Modular Monolith).

### ⚠️ Gaps & Considerations

- **State Persistence**: Project B requires "Refresh-Safe" session state.
  - _Implication_: Our SaaS boilerplate should include a standardized **Zustand + Persist** or **IndexedDB** pattern for "Active Workflows" to prevent data loss on reload.
- **Audio/Media Hooks**: While the SaaS base shouldn't include a Piano Metronome, it might benefit from a generic `useAudio` or `MediaProvider` hook if multiple apps are expected to handle audio/video.
- **Real-time state**: "Pause session pauses item timer". The base framework needs a robust **Timer/Clock Provider** if it's meant to support productivity/session-based apps.

### ❓ Clarifying Questions

1.  **Offline-Ready**: Does the "Practice Player" need to work when the user has no internet (e.g., in a basement studio)? This would require **service-worker caching** of the PDF/Audio files.
2.  **Device Integration**: Does "Audio Input Selection" imply the boilerplate should have built-in **Media Permission** helpers?
3.  **Data Volume**: If the user records 10 hours of audio, how does the "Sovereign-centric" data export (from the PRD) handle multi-GB exports?
