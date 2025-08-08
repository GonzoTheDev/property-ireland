-- Clean up previous bucket policies for listing-images (safe if they don't exist)
drop policy if exists "li_insert_owner" on storage.objects;
drop policy if exists "li_update_owner" on storage.objects;
drop policy if exists "li_delete_owner" on storage.objects;

-- Allow authenticated users to manage their own files in bucket 'listing-images'
create policy "li_insert_owner"
on storage.objects
for insert to authenticated
with check (
  bucket_id = 'listing-images'
  and owner = auth.uid()
);

create policy "li_update_owner"
on storage.objects
for update to authenticated
using (
  bucket_id = 'listing-images'
  and owner = auth.uid()
)
with check (
  bucket_id = 'listing-images'
  and owner = auth.uid()
);

create policy "li_delete_owner"
on storage.objects
for delete to authenticated
using (
  bucket_id = 'listing-images'
  and owner = auth.uid()
);