-- Enable UUID extension if needed
create extension if not exists "uuid-ossp";

-- Profiles table (one-to-one with auth.users)
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  name text,
  phone text,
  bio text,
  company text,
  county text,
  town text,
  address_line1 text,
  address_line2 text,
  eircode text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Listings
create table if not exists public.listings (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  type text not null check (type in ('SALE','RENT')),
  price integer not null,
  bedrooms integer not null,
  bathrooms integer not null,
  area_sqm integer,
  furnished boolean,
  address_line1 text not null,
  address_line2 text,
  town text not null,
  county text not null,
  eircode text,
  latitude double precision,
  longitude double precision,
  amenities jsonb,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Listing images
create table if not exists public.listings_images (
  id uuid primary key default uuid_generate_v4(),
  url text not null,
  order_index integer default 0,
  listing_id uuid not null references public.listings(id) on delete cascade
);

-- Favorites
create table if not exists public.favorites (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique(user_id, listing_id)
);

-- Contact messages (edge function can write)
create table if not exists public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  sender_user_id uuid references auth.users(id) on delete set null,
  message text not null,
  created_at timestamp with time zone default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.listings_images enable row level security;
alter table public.favorites enable row level security;
alter table public.contact_messages enable row level security;

-- Profiles policies
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = user_id);
drop policy if exists "profiles_upsert_own" on public.profiles;
create policy "profiles_upsert_own" on public.profiles
  for insert with check (auth.uid() = user_id);
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = user_id);

-- Listings policies
drop policy if exists "listings_select_all" on public.listings;
create policy "listings_select_all" on public.listings
  for select using (true);
drop policy if exists "listings_insert_own" on public.listings;
create policy "listings_insert_own" on public.listings
  for insert with check (auth.uid() = user_id);
drop policy if exists "listings_update_own" on public.listings;
create policy "listings_update_own" on public.listings
  for update using (auth.uid() = user_id);
drop policy if exists "listings_delete_own" on public.listings;
create policy "listings_delete_own" on public.listings
  for delete using (auth.uid() = user_id);

-- Listings images policies (inherit ownership via listing)
drop policy if exists "images_select_all" on public.listings_images;
create policy "images_select_all" on public.listings_images for select using (true);
drop policy if exists "images_write_owner" on public.listings_images;
create policy "images_write_owner" on public.listings_images
  for insert with check (exists (select 1 from public.listings l where l.id = listing_id and l.user_id = auth.uid()));
create policy if not exists "images_update_owner" on public.listings_images
  for update using (exists (select 1 from public.listings l where l.id = listing_id and l.user_id = auth.uid()));
create policy if not exists "images_delete_owner" on public.listings_images
  for delete using (exists (select 1 from public.listings l where l.id = listing_id and l.user_id = auth.uid()));

-- Favorites policies
drop policy if exists "favorites_select_own" on public.favorites;
create policy "favorites_select_own" on public.favorites
  for select using (auth.uid() = user_id);
drop policy if exists "favorites_insert_own" on public.favorites;
create policy "favorites_insert_own" on public.favorites
  for insert with check (auth.uid() = user_id);
drop policy if exists "favorites_delete_own" on public.favorites;
create policy "favorites_delete_own" on public.favorites
  for delete using (auth.uid() = user_id);

-- Contact messages policies (insert allowed for signed-in)
drop policy if exists "contact_insert_signed_in" on public.contact_messages;
create policy "contact_insert_signed_in" on public.contact_messages
  for insert with check (auth.uid() is not null);
drop policy if exists "contact_select_owner" on public.contact_messages;
create policy "contact_select_owner" on public.contact_messages
  for select using (
    exists (
      select 1 from public.listings l
      where l.id = listing_id and l.user_id = auth.uid()
    )
  );


