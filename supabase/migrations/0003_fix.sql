-- Allow authenticated users to manage files under their own {uid}/... in bucket 'listing-images'

-- INSERT
drop policy if exists "li_insert_owner" on storage.objects;
create policy "li_insert_owner"
on storage.objects
for insert to authenticated
with check (
  bucket_id = 'listing-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- UPDATE (needed when using upsert: true)
drop policy if exists "li_update_owner" on storage.objects;
create policy "li_update_owner"
on storage.objects
for update to authenticated
using (
  bucket_id = 'listing-images'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'listing-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- DELETE (optional but useful)
drop policy if exists "li_delete_owner" on storage.objects;
create policy "li_delete_owner"
on storage.objects
for delete to authenticated
using (
  bucket_id = 'listing-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);