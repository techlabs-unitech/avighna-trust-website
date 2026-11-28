-- Planned Trips: requests from the form at /pilgrimage/planned-trips
create table if not exists public.planned_trip_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  phone text not null check (char_length(trim(phone)) between 7 and 32),
  email text not null check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  age integer not null check (age between 1 and 120),
  gender text not null check (gender in ('Male','Female','Other','Prefer not to say')),
  days integer not null check (days between 1 and 90),
  address text not null check (char_length(trim(address)) between 5 and 500),
  elders_count integer not null default 0 check (elders_count between 0 and 100),
  kids_count integer not null default 0 check (kids_count between 0 and 100),
  places text[] not null check (cardinality(places) >= 1),
  travel_guide_needed boolean not null,
  travel_mode text not null check (travel_mode in ('Train','Flight','Bus','Car / Cab','Tempo Traveller','No preference')),
  darshan_type text not null check (darshan_type in ('Special darshan','Public darshan')),
  status text not null default 'new' check (status in ('new','in_review','quoted','confirmed','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_planned_trip_requests_status on public.planned_trip_requests (status, created_at desc);

create trigger set_planned_trip_requests_updated_at
before update on public.planned_trip_requests
for each row execute procedure public.set_updated_at();

alter table public.planned_trip_requests enable row level security;

create policy "admins can access planned trip requests"
on public.planned_trip_requests
for all
using (public.is_active_admin())
with check (public.is_active_admin());

revoke all on table public.planned_trip_requests from anon, authenticated;
grant select, insert, update, delete on table public.planned_trip_requests to authenticated;
grant all on table public.planned_trip_requests to service_role;
