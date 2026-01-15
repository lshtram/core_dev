# Design Guidelines

**Design Language:** Modern · Citrus · Clean · Professional · Energetic

These guidelines define the visual design system for Fermata. The interface balances high-energy "Orange" accents with a clean, professional "Gray/White" foundation.

## 1. Visual Language
- **Backgrounds**: Clean white (`#FFFFFF`) or very light gray (`#F9FAFB`) to reduce eye strain while maintaining high contrast.
- **Accents**: Vibrant Orange (`#FF8C00`) to guide attention and energize practice sessions.
- **Typography**: `Outfit` for headings (modern, friendly geometric sans) and `Inter` for UI (highly readable).
- **Icons**: Simple, rounded, outline-style icons (Material Symbols / MUI Icons) to maintain a clean look.

## 2. Color System

All colors derive from CSS variables in `src/styles/tokens.css` and the MUI Theme in `src/theme.js`.

### Core Palette

| Token | Purpose | HEX |
|---|---|---|
| `--bg-page` | Main background | `#FFFFFF` |
| `--bg-surface` | Cards / Panels | `#F9FAFB` |
| `--ink-primary` | Primary Text | `#1F2937` (Gray 800) |
| `--ink-secondary` | Secondary Text | `#4B5563` (Gray 600) |
| `--neutral-line` | Borders | `#E5E7EB` (Gray 200) |

### Accent Palette

| Token | Purpose | HEX |
|---|---|---|
| `--accent-primary` | Primary Brand / Action | `#FF8C00` (Dark Orange) |
| `--accent-primary-soft` | Hover / Soft variants | `#FFB347` |
| `--accent-highlight` | Subtle backgrounds | `#FFF7ED` (Pale Orange) |

## 3. Iconography

Icons play a key role in the "Tool" metaphor of the app.
Recommended Icon Set: **MUI Icons (Material Design)** or **Lucide React**.

### Primary Tool Icons
- **Metronome**: `Speed` or `AccessTime` (Timing focus)
- **Notes**: `EditNote` or `StickyNote2` (Reflection focus)
- **Recorder**: `Mic` or `FiberManualRecord` (Capture focus)
- **Tuner**: `Tune` or `GraphicEq`
- **Library**: `LibraryMusic`
- **Settings**: `Settings` or `Tune`

### Icon Style
- **Size**: 24px default.
- **Color**: `--ink-secondary` (Gray 600) for resting state, `--accent-primary` (Orange) for active state.
- **Stroke**: Medium weight (if using outline icons).

## 4. Typography System

### Typefaces
- **Headings**: **Outfit** (Weights: 500, 600, 700) - Characterful, geometric.
- **Body**: **Inter** (Weights: 400, 500) - Neutral, legible.

### Hierarchy
- **H1**: Outfit 700, 32px
- **H2**: Outfit 600, 24px
- **H3**: Outfit 600, 20px
- **Body**: Inter 400, 16px
- **Label**: Inter 500, 13px (Uppercase or muted)

## 5. Components & Interactions

- **Buttons**:
    - Primary: Orange pill-shaped (`border-radius: 999px`), White text. Shadow on hover.
    - Secondary: Gray outline or Ghost.
- **Cards**:
    - White background, thin gray border (`#E5E7EB`), soft shadow.
    - `border-radius: 16px`.
- **Inputs**:
    - Light gray background (`#F9FAFB`), focus ring in Orange.
