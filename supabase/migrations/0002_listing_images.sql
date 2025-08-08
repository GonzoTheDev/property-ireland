-- listing-images: allow authenticated users to manage files under {uid}/...
-- Insert
drop policy if exists "li_insert_owner" on storage.objects;
create policy "li_insert_owner"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'listing-images'
  and name like auth.uid() || '/%'
);

-- Update (not strictly needed for our flow, but useful)
drop policy if exists "li_update_owner" on storage.objects;
create policy "li_update_owner"
on storage.objects for update to authenticated
using (
  bucket_id = 'listing-images'
  and name like auth.uid() || '/%'
)
with check (
  bucket_id = 'listing-images'
  and name like auth.uid() || '/%'
);

-- Delete
drop policy if exists "li_delete_owner" on storage.objects;
create policy "li_delete_owner"
on storage.objects for delete to authenticated
using (
  bucket_id = 'listing-images'
  and name like auth.uid() || '/%'
);