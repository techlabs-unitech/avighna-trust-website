-- Planned Trips: placeholders for the payment gateway that will be integrated later.
alter table public.planned_trip_requests
  add column if not exists reference text unique,
  add column if not exists payment_status text not null default 'not_started'
    check (payment_status in ('not_started','pending','paid','failed','refunded')),
  add column if not exists payment_provider text,
  add column if not exists payment_reference text,
  add column if not exists amount_cents integer check (amount_cents is null or amount_cents >= 0),
  add column if not exists currency text not null default 'INR';
