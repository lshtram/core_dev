# ADR 0002: Single-Organization Architecture

## Status

Accepted

## Context

Initial discussions considered a "Venus" multi-tenant architecture (Shared DB, Isolated Schema with `tenant_id`) to serve multiple schools from one install.
However, this adds significant complexity to the codebase (RLS policies, data leakage risks, complex backups) and is overkill for the current requirement of "Bespoke B2B Installs".

## Decision

We will adopt a **Single-Organization Architecture**.

- **One Install = One Organization**.
- No `tenant_id` column in database tables.
- Database is dedicated to the single client.

## Consequences

**Positive**:

- **Simplicity**: Queries are cleaner; fewer RLS policies needed.
- **Security**: Zero risk of Cross-Tenant Data Leakage at the application level.
- **Sovereignty**: Easiest mental model for clients ("This is MY database").

**Negative**:

- **Operational Overhead**: Managing 100 schools means managing 100 Vercel/Supabase instances (vs 1).
- **Update Friction**: rolling out a hotfix requires updating 100 deployments (mitigated by CI/CD).
