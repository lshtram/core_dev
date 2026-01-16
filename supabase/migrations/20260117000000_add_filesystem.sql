-- Create storage_files table metadata
create table if not exists storage_files (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null default auth.org(),
  owner_id uuid not null default auth.uid(),
  parent_id uuid references storage_files(id),
  name text not null,
  type text not null check (type in ('file', 'folder')),
  mime_type text,
  size bigint default 0,
  storage_path text, -- Null for folders
  deleted_at timestamptz, -- Soft delete support
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indexes
create index idx_storage_files_org_id on storage_files(org_id);
create index idx_storage_files_parent_id on storage_files(parent_id);
create index idx_storage_files_owner_id on storage_files(owner_id);

-- RLS Policies for storage_files
alter table storage_files enable row level security;

-- Policy: Users see files in their Org
create policy "Users can view files in their org"
  on storage_files for select
  using (
    org_id = auth.org() 
    and deleted_at is null -- Hide soft deleted by default
  );

-- Policy: Users see deleted files if they own them (Trash Bin)
create policy "Users can view their own trash"
  on storage_files for select
  using (
    owner_id = auth.uid() 
    and deleted_at is not null
  );

-- Policy: Users can insert files in their org
create policy "Users can insert files in their org"
  on storage_files for insert
  with check (
    org_id = auth.org()
  );

-- Policy: Users can update files in their org (Rename, Move, Soft Delete)
create policy "Users can update files in their org"
  on storage_files for update
  using (
    org_id = auth.org()
  );

-- Function: Prevent circular folders
create or replace function check_circular_folder()
returns trigger as $$
begin
  if new.parent_id = new.id then
    raise exception 'Circular folder reference details';
  end if;
  -- Deep recursion check could go here
  return new;
end;
$$ language plpgsql;

create trigger tr_check_circular_folder
  before update on storage_files
  for each row execute function check_circular_folder();

-- RLS Policies for Storage Bucket 'files'
-- Note: 'files' bucket must be created in Supabase Dashboard or seed.
-- For now we assume it exists or RLS on objects table.

insert into storage.buckets (id, name, public) 
values ('files', 'files', false)
on conflict (id) do nothing;

create policy "Users can access storage objects in their org"
  on storage.objects for select
  using (
    bucket_id = 'files'
    and (storage.foldername(name))[1]::uuid = auth.org()
  );

create policy "Users can upload storage objects in their org"
  on storage.objects for insert
  with check (
    bucket_id = 'files'
    and (storage.foldername(name))[1]::uuid = auth.org()
  );

create policy "Users can delete storage objects in their org"
  on storage.objects for delete
  using (
    bucket_id = 'files'
    and (storage.foldername(name))[1]::uuid = auth.org()
  );
