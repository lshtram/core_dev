# Concept: Project C (AI Marketing Coach)

## 1. Description

An AI-powered coaching app designed for non-digital natives (e.g., artists) to build and manage their social media presence effortlessly.
**Core Philosophy**: "The AI is the Agency."

### Key Workflows

1.  **AI Onboarding**: Interactive quiz to understand the user's brand and current presence.
2.  **Guided Roadmap**: Step-by-step guides for account setup and weekly growth goals.
3.  **Actionable Tasks**: "Push" notifications for specific tasks (e.g., "Take a photo of your studio").
4.  **Content Pipeline**: User uploads media; AI optimizes and schedules it for release on linked social accounts.
5.  **Dynamic Research**: AI continuously monitors trends and adjusts recommendations for the specific niche.

---

## 2. Validation Against Core SaaS Framework

### ✅ Good Fit

- **Flexible Workflows**: The "Quiz/Onboarding" and "Step-by-Step" roadmap perfectly validate the **Action Hook / State Machine** pattern we planned.
- **NotificationManager**: The "Push" tasks for taking photos reinforce the PWA/Lock-screen requirement.
- **RBAC**: Fits the "User" vs "AI Coach" (System) model.
- **Mobile-First**: Next.js + CSS Tokens allows us to build the "Premium Utility" mobile interface as the primary target.

### ⚠️ Gaps & Considerations

- **AI Integration**: Our PRD currently says AI logic is "bespoke". However, for an "AI-empowered" product, our boilerplate needs a **GenerativeProvider** (e.g., OpenAI/Anthropic/Vercel AI SDK wrapper) to handle prompting and token management reliably.
- **Social Media Connectors**: To "release it on Tuesday", the app needs to talk to Instagram/FB/Twitter APIs. The boilerplate should have a generic **ExternalConnector** or `OAuthProvider` to handle the complexity of linking and refreshing social tokens.
- **Job Scheduler**: "Release on Tuesday" implies background tasks. Since we are using Supabase/Next.js, we need to incorporate a **Cron/Queuing** strategy (e.g., Supabase Edge Functions + Cron or Inngest) into the base boilerplate.

### ❓ Resolved Questions

1.  **Posting Authority**: **User Confirmation First**. The system will prepare drafts and require user "Confirm/Release" via notification. Architecture will support a future toggle for "Autonomous/Agent Mode".
2.  **Multilingual Research**: **Yes**. The base `AIProvider` will support native cross-language trend analysis (e.g., harvesting global trends for local Hebrew niche).
3.  **Media Editing**: App-specific (initial focus is management), but base `AIProvider` can handle metadata/caption generation.
