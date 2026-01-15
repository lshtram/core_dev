# Guidelines

**Single Source of Truth** for Coding Standards & Design System.

---

# Part 1: Coding Guidelines

## 1. Architecture & Modularity
- **Layers**: UI (Components) → State (Hooks) → Domain (Models) → Data (Providers).
- **Responsibility**: One responsibility per module. Route pages are orchestrators only.
- **Data Flow**: Local-first. Normalized state. Cross-domain logic in hooks/services.

## 2. Folder Structure
- `src/components/` (Reusable UI), `src/pages/` (Routes)
- `src/modules/` (Features), `src/domain/` (Logic/Types)
- `src/data/` (Storage/Adapters), `src/styles/` (Tokens/Global)

## 3. Data Providers & Stability
- **CRITICAL**: Components **NEVER** call Supabase directly. Use `src/data` or module hooks.
- **Caching**: Centralized in `src/data`. No ad-hoc caching in pages.
- **Validation**: **TypeScript-only props typing** on reusable components.
    - **Strict TypeScript** always required where applicable. No `any` usage permitted.

## 4. CSS & Styling
- **Strategy**: **CSS Modules** (`.module.css`) for components. `app.css` for globals/utils only.
- **Naming**: File `Comp.module.css`. Class `camelCase` (e.g., `.activeItem`).
- **Usage**: `import styles from './Comp.module.css'; className={styles.activeItem}`.
- **Layout**: Inline labels by default. Compact rows. Use `tokens.css` variables.

## 5. Testing & Quality
- **Requirement**: **Every bug fix needs a regression test.**
- **Suites**: Unit (Domain/Logic), Integration (Data flows), E2E (Critical paths).
- **Pre-Commit**: `npm test -- --run` (Unit) → `npm run build` → `npm run test:e2e`.

## 6. Git Procedure
1.  **Check**: `git status`
2.  **Test & Quality**: `npm test -- --run` (Unit), `npm run lint` (Lint), `npm run typecheck` (Types).
3.  **Build**: `npm run build` (Must succeed)
4.  **E2E**: `npm run test:e2e` (All Pass)
5.  **Commit**: `git commit -m "type: description"` (feat, fix, refactor, docs)
6.  **Push**: `git push origin main`

---

# Part 2: Design Guidelines

**Language**: Elegant · Musical · Warm · Pastel · Minimal.
**Source**: `src/styles/tokens.css` is the **Truth**.

## 1. Color System

| Role | Token | Value |
| :--- | :--- | :--- |
| **Background** | `--bg-gradient-start` / `-mid` / `-end` | `#DFF3E7` / `#F7F3E9` / `#F6E1CF` |
| **Surface** | `--bg-surface` | `#FFF9F1` |
| **Ink** | `--ink-primary` / `-secondary` / `-muted` | `#1F1B19` / `#645B55` / `#9B9086` |
| **Divider** | `--neutral-line` | `#E0D8CF` |
| **Shadow** | `--shadow-soft` | `0 28px 50px rgba(22, 12, 6, 0.12)` |
| **Accent** | `--accent-primary` / `-soft` | `#2F584E` / `#4C8676` |
| **Highlight** | `--accent-highlight` / `-peach` / `-sand` | `#CFE8D9` / `#F2D3B1` / `#E9DFC8` |

**Category Tints**:
`--cat-warmup` (#CFE8D9), `--cat-technique` (#D5DFF3), `--cat-repertoire` (#F2D3B1), `--cat-skill` (#E9DFC8).

## 2. Typography

**Fonts**: **Playfair Display** (Headings, 400-500), **Inter** (Body, 300-500).

| Style | Font | Size/Height | Usage |
| :--- | :--- | :--- | :--- |
| **H1** | Playfair | 42-48px / 1.15 | Main Titles |
| **H2** | Playfair | 32-36px / 1.2 | Section Titles |
| **H3** | Playfair | 24-26px / 1.25 | Sub-headings |
| **Body-L** | Inter | 18px / 1.6 | Descriptive |
| **Body-M** | Inter | 16px / 1.5 | General UI |
| **Meta-S** | Inter | 13-14px / 1.4 | Labels/Meta |

## 3. Layout & Spacing
- **Canvas**: Max `1080px`. Centered. Airy vertical rhythm.
- **Spacing tokens**: `xs` (6px), `sm` (10px), `md` (16px), `lg` (24px), `xl` (32px), `2xl` (48px), `3xl` (64px).

## 4. Components
- **Cards**: Rounded (8-12px), `--shadow-soft`, `--bg-surface`.
- **Buttons**:
    - *Primary*: Pill (24px), `--accent-primary`, White text.
    - *Secondary*: Outline `--accent-primary`.
    - *Ghost*: Text-only, Accent color.
- **Inputs**: Inline labels preferred. High contrast text.
- **Motion**: Gentle transitions (200-300ms). No bounce.

## 5. Responsiveness
- **Desktop**: <1080px.
- **Mobile**: Stacks vertically. Min touch target **44px**. hide non-essentials.

## 6. Icons
- **System**: Material-UI icons (20-24px). Rounded, friendly.
