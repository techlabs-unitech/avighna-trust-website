create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists public.contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 120),
  email text not null check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone text,
  subject text not null default 'General enquiry' check (char_length(trim(subject)) <= 200),
  message text not null check (char_length(trim(message)) between 10 and 4000),
  status text not null default 'new' check (status in ('new','in_review','responded','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admission_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 120),
  email text not null check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone text,
  programme_interest text not null check (char_length(trim(programme_interest)) between 2 and 200),
  message text not null check (char_length(trim(message)) between 10 and 4000),
  status text not null default 'new' check (status in ('new','in_review','responded','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.volunteer_registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  email text not null unique check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  interests text not null check (char_length(trim(interests)) between 10 and 4000),
  status text not null default 'new' check (status in ('new','reviewing','accepted','rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 2 and 200),
  description text,
  event_date timestamptz,
  location text,
  is_published boolean not null default false,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade,
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  email text not null check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone text,
  notes text,
  status text not null default 'registered' check (status in ('registered','confirmed','cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  source text not null default 'website' check (char_length(trim(source)) between 2 and 120),
  is_active boolean not null default true,
  consent_confirmed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 2 and 200),
  caption text,
  image_url text not null check (char_length(trim(image_url)) > 0),
  alt_text text not null default '',
  category text,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  donor_name text,
  donor_email text,
  donation_type text not null default 'general' check (donation_type in ('general','education','research','temple','community','event')),
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'INR' check (currency = upper(currency) and char_length(currency) = 3),
  payment_provider text not null default 'unverified' check (char_length(trim(payment_provider)) between 2 and 50),
  payment_reference text,
  status text not null default 'pending' check (status in ('pending','paid','failed','refunded')),
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payment_transactions (
  id uuid primary key default gen_random_uuid(),
  donation_id uuid not null references public.donations(id) on delete cascade,
  provider text not null check (char_length(trim(provider)) between 2 and 50),
  payment_reference text not null,
  order_id text,
  status text not null default 'pending' check (status in ('pending','paid','failed','refunded')),
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'INR' check (currency = upper(currency) and char_length(currency) = 3),
  signature_hash text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  role text not null default 'editor' check (role in ('admin','editor')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_contact_enquiries_created_at on public.contact_enquiries (created_at desc);
create index if not exists idx_admission_enquiries_created_at on public.admission_enquiries (created_at desc);
create index if not exists idx_volunteer_registrations_status on public.volunteer_registrations (status, created_at desc);
create index if not exists idx_event_registrations_event_id on public.event_registrations (event_id, created_at desc);
create index if not exists idx_newsletter_subscriptions_email on public.newsletter_subscriptions (email);
create index if not exists idx_events_published on public.events (is_published, event_date);
create index if not exists idx_gallery_items_published on public.gallery_items (is_published, sort_order);
create index if not exists idx_donations_status on public.donations (status, created_at desc);
create index if not exists idx_payment_transactions_donation_id on public.payment_transactions (donation_id, created_at desc);

create trigger set_contact_enquiries_updated_at
before update on public.contact_enquiries
for each row execute procedure public.set_updated_at();

create trigger set_admission_enquiries_updated_at
before update on public.admission_enquiries
for each row execute procedure public.set_updated_at();

create trigger set_volunteer_registrations_updated_at
before update on public.volunteer_registrations
for each row execute procedure public.set_updated_at();

create trigger set_event_registrations_updated_at
before update on public.event_registrations
for each row execute procedure public.set_updated_at();

create trigger set_newsletter_subscriptions_updated_at
before update on public.newsletter_subscriptions
for each row execute procedure public.set_updated_at();

create trigger set_events_updated_at
before update on public.events
for each row execute procedure public.set_updated_at();

create trigger set_gallery_items_updated_at
before update on public.gallery_items
for each row execute procedure public.set_updated_at();

create trigger set_donations_updated_at
before update on public.donations
for each row execute procedure public.set_updated_at();

create trigger set_payment_transactions_updated_at
before update on public.payment_transactions
for each row execute procedure public.set_updated_at();

create trigger set_admin_profiles_updated_at
before update on public.admin_profiles
for each row execute procedure public.set_updated_at();

alter table public.contact_enquiries enable row level security;
alter table public.admission_enquiries enable row level security;
alter table public.volunteer_registrations enable row level security;
alter table public.event_registrations enable row level security;
alter table public.newsletter_subscriptions enable row level security;
alter table public.events enable row level security;
alter table public.gallery_items enable row level security;
alter table public.donations enable row level security;
alter table public.payment_transactions enable row level security;
alter table public.admin_profiles enable row level security;

create or replace function public.is_active_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $function$
  select exists (
    select 1
    from public.admin_profiles ap
    where ap.id = (select auth.uid())
      and ap.role = 'admin'
      and ap.is_active = true
  );
$function$;

revoke all on function public.is_active_admin() from public, anon, authenticated;
grant execute on function public.is_active_admin() to authenticated;

create policy "admins can access contact enquiries"
on public.contact_enquiries
for all
using (public.is_active_admin())
with check (public.is_active_admin());

create policy "admins can access admission enquiries"
on public.admission_enquiries
for all
using (public.is_active_admin())
with check (public.is_active_admin());

create policy "admins can access volunteer registrations"
on public.volunteer_registrations
for all
using (public.is_active_admin())
with check (public.is_active_admin());

create policy "admins can access event registrations"
on public.event_registrations
for all
using (public.is_active_admin())
with check (public.is_active_admin());

create policy "admins can access newsletter subscriptions"
on public.newsletter_subscriptions
for all
using (public.is_active_admin())
with check (public.is_active_admin());

create policy "public can read published events"
on public.events
for select
using (is_published = true);

create policy "admins can manage events"
on public.events
for all
using (public.is_active_admin())
with check (public.is_active_admin());

create policy "public can read published gallery items"
on public.gallery_items
for select
using (is_published = true);

create policy "admins can manage gallery items"
on public.gallery_items
for all
using (public.is_active_admin())
with check (public.is_active_admin());

create policy "admins can read donations"
on public.donations
for select
using (public.is_active_admin());

create policy "admins can read payment transactions"
on public.payment_transactions
for select
using (public.is_active_admin());

create policy "users can read own admin profile"
on public.admin_profiles
for select
using (auth.uid() = id);

revoke all on table
  public.contact_enquiries,
  public.admission_enquiries,
  public.volunteer_registrations,
  public.event_registrations,
  public.newsletter_subscriptions,
  public.events,
  public.gallery_items,
  public.donations,
  public.payment_transactions,
  public.admin_profiles
from anon, authenticated;

grant select, insert, update, delete on table
  public.contact_enquiries,
  public.admission_enquiries,
  public.volunteer_registrations,
  public.event_registrations,
  public.newsletter_subscriptions,
  public.events,
  public.gallery_items
to authenticated;

grant select on table public.events, public.gallery_items to anon;
grant select on table
  public.donations,
  public.payment_transactions,
  public.admin_profiles
to authenticated;

grant all on table
  public.contact_enquiries,
  public.admission_enquiries,
  public.volunteer_registrations,
  public.event_registrations,
  public.newsletter_subscriptions,
  public.events,
  public.gallery_items,
  public.donations,
  public.payment_transactions,
  public.admin_profiles
to service_role;
