# Concept: Project A (Special Needs Art School)

## 1. Description

A streamlined management app for an art school serving students with special needs.
**Core Philosophy**: "Low Functionality, High Accessibility."

### Key Workflows

1.  **Registry**: Admins/Teachers manage the student roster and class calendar.
2.  **Student Action**: Students browse the calendar and register for classes.
3.  **Teacher Action**:
    - In-class presence checking (Simple UI).
    - Work hour logging.
    - Broadcast messaging (Class-wide or Group-wide).
4.  **Admin Action**:
    - Generate End-of-Month reports (Teacher hours, Student activity).
    - System-wide announcements.
5.  **Notifications**: Mobile Push Notifications (Lock Screen) for reminders and alerts.

---

## 2. Validation Against Core SaaS Framework

### ✅ Good Fit

- **Single-Org Architecture**: Perfect fit. This school is a bespoke entity requiring its own isolated database.
- **RBAC**: The proposed roles (Admin, Teacher, Student) map 1:1 to our `profiles.role` enum.
- **NotificationManager**: The requirement for "Lock screen pop-ups" validates our decision to abstract notifications. We can plug in `OneSignal` or `Expo Push` behind the `NotificationProvider` interface easily.
- **Minimalist UI**: The "Easy UI" requirement for in-class presence checks aligns perfectly with our "Distraction-Free" philosophy.
- **Reporting**: The requirement for Excel and PDF reports is now a core part of the boilerplate foundation.

### ⚠️ Gaps & Considerations

- **Accessibility (A11y)**: Serving "special needs" users implies strict WCAG compliance (high contrast, screen readers). Our `Strict Typing` helps, but we might need an `A11y` test suite in the base framework.
- **Mobile Native Features**: "Pop up on lock screen" implies a PWA or Native wrapper. Our framework is Next.js.
  - _Implication_: We must ensure the `manifest.json` and PWA service workers are part of the boilerplate foundation.
- **Flexible Workflows**: Since each app might have different approval logic (Teachers deciding vs internal automation), we will implement a "State Machine" or "Action Hook" pattern in the base to handle these transitions.

### ❓ Resolved Questions

1.  **Registration Flow**: **Confirmed**. Teachers decide who can register. This requires a "Request -> Approval" workflow hook in the base.
2.  **Report Format**: **Confirmed**. Both Excel and PDF generation are required in the base.
