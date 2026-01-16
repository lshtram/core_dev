-- Migration: Add Role-Based Access Control (RBAC)
-- Feature: FEAT-CORE-RBAC
-- Date: 2026-01-16

-- 1. Create Enum
-- Maps to REQ-RBAC-001 (Role Schema)
create type app_role as enum (
  'system_admin',
  'org_admin',
  'manager',
  'teacher',
  'student'
);

-- 2. Update Profiles
alter table public.profiles 
add column role app_role not null default 'student';

-- 3. RLS Helper Function
-- Allows policies to check the current user's role cleanly.
create or replace function auth.user_role() 
returns app_role as $$
  select role from public.profiles where id = auth.uid();
$$ language sql stable security definer;
-- Security Definer ensures we can read the role even if RLS is tricky (prevents recursion loops if we are careful).

-- 4. Policies

-- REQ-RBAC-002: Public Read (Profiles are visible to authenticated users)
-- Note: Adjust 'true' if we want strictly private visibility, but PRD said "Public Read".
create policy "Public Profiles are viewable by everyone" 
on public.profiles for select 
using ( auth.role() = 'authenticated' );

-- REQ-RBAC-003: Self Update
create policy "Users can update own profile" 
on public.profiles for update 
using ( auth.uid() = id );

-- REQ-RBAC-004: Role Integrity (Only Admin modifies roles)
-- We need to prevent regular users from updating their OWN role via "Self Update".
-- This is usually done via a TRIGGER or by excluding the column from the policy (Supabase doesn't support column-level RLS easily).
-- ALTERNATIVE: Use a Trigger to prevent role change unless auth.user_role() is admin.
-- For now, we allow the update CONTENT, but we must protect the ROLE column.
-- Since we can't easily block specific columns in RLS "USING", we use a BEFORE UPDATE trigger.

create or replace function public.handle_role_protection() 
returns trigger as $$
begin
  -- If role is changing
  if new.role <> old.role then
    -- Check if actor is an admin
    if auth.user_role() not in ('system_admin', 'org_admin') then
      raise exception 'Only Admins can change roles.';
    end if;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger protect_role_change
before update on public.profiles
for each row execute procedure public.handle_role_protection();

-- Admin Update Policy (Admins can update ANY profile)
create policy "Admins can update any profile" 
on public.profiles for update 
using ( auth.user_role() in ('system_admin', 'org_admin') );
