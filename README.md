# Avighna Trust Website

This project is a Next.js App Router site for Avighna Trust and Vedavani Pathashala. The front-end has been scaffolded and the backend foundation below is prepared for Supabase-backed submissions, secure admin access, and protected data operations.

## Backend foundation status

This repository now includes:

- Supabase client helpers for browser and server usage
- server-side validation helper utilities
- SQL migration files under `supabase/migrations/`
- protected admin route shells
- server-side submission routes for contact, admission, newsletter, and volunteer intake
- shared Upstash Redis rate limiting and honeypot checks on public submission routes
- `.env.example` placeholders for required environment variables

Important: Supabase and Upstash credentials are not configured in this environment, so no live database connectivity, rate limiting, authentication, or production abuse protection is claimed. The submission endpoints fail closed when rate-limit configuration, a trusted client IP, or Upstash availability is missing.

## Supabase project and environment setup

1. Create a project in the Supabase dashboard and choose a strong, unique database password. Save it in your password manager; it is not an application environment variable.
2. In the project settings, find the project URL and API keys. Use the project URL, the public anon key, and the service-role key for the application variables below. The service-role key bypasses RLS and must remain server-only.
3. Create an Upstash Redis database in a region appropriate to the eventual app hosting region. Copy its HTTPS REST URL and REST token from Upstash. These values enable the shared, serverless-safe fixed-window limiter.
4. Generate a separate random HMAC key with at least 32 bytes of entropy for `RATE_LIMIT_HASH_SECRET`; keep it secret and server-side. It pseudonymizes client IPs before they are included in Redis key names.
5. In the repository root, create `.env.local` from the template only if it does not already exist, then replace the placeholders locally. This command preserves an existing `.env.local`:

   ```powershell
   if (-not (Test-Path .env.local)) { Copy-Item .env.example .env.local }
   ```

   On macOS/Linux, copy with `cp .env.example .env.local` only if `.env.local` does not already exist. `.env.local` is ignored by Git. Never commit it or paste its contents into chat or logs.
6. Configure the same six variables in the eventual hosting provider’s protected environment settings for every environment that needs them (preview/staging/production as appropriate). The two `NEXT_PUBLIC_` Supabase settings are public client configuration. Keep `SUPABASE_SERVICE_ROLE_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, and `RATE_LIMIT_HASH_SECRET` server-side; never give any of them a `NEXT_PUBLIC_` prefix. Treat the service-role key, Upstash REST token, and hash secret as secrets. Restrict production access to the hosting provider’s protected environment-variable settings.

The currently required variables are:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-upstash-rest-token
RATE_LIMIT_HASH_SECRET=replace-with-at-least-32-random-bytes
```

`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are public project configuration. The service-role key and all Upstash settings are server-side configuration and must never be exposed through `NEXT_PUBLIC_` variables; `SUPABASE_SERVICE_ROLE_KEY`, `UPSTASH_REDIS_REST_TOKEN`, and `RATE_LIMIT_HASH_SECRET` are secrets. `.env.example` contains placeholders only. This app does not currently use an `ADMIN_EMAILS` allowlist or `NEXT_PUBLIC_SITE_URL` variable.

## Apply the initial migration

For a brand-new, dedicated project:

1. In Supabase, open **SQL Editor** and create a new query.
2. Open `supabase/migrations/20261015_initial_schema.sql` locally, copy its complete contents into the query, and review the selected project before running it.
3. Run it once. Confirm the expected tables and RLS are present in **Table Editor**. Do not use `db reset`, drop existing tables, or re-run this initial migration on a project where it has already been applied.

Alternatively, with the Supabase CLI installed, run the following from the repository after confirming the target project reference:

```bash
supabase init
supabase link --project-ref <project-ref>
supabase db push
```

The CLI workflow uses migration history and is appropriate only when the repository’s migration history matches the remote project. If the migration was applied manually in SQL Editor, do not blindly run `db push`; reconcile migration history first. If this schema has already been applied, make future changes in a new migration and do not rewrite or replay the initial migration.

## Create the first admin securely

There is no public admin self-registration or role-granting endpoint. Keep ordinary public sign-up disabled in Supabase Auth. For the first administrator, a trusted project owner should:

1. Create/invite the named administrator in Supabase **Authentication → Users** and complete the account setup through the trusted email flow. Require a strong unique password and enable MFA where available.
2. Copy that user’s Auth UUID from the dashboard.
3. In the Supabase SQL Editor for the correct project, insert the matching profile using that UUID. SQL Editor runs with elevated project privileges; never run this as application/browser code and do not expose the role-grant operation as an endpoint.

```sql
insert into public.admin_profiles (id, full_name, role, is_active)
values ('<auth-user-uuid>', '<administrator name>', 'admin', true);
```

Replace both placeholders before running. Confirm exactly one intended row was created. To revoke access, set that profile’s `is_active` to `false` through trusted dashboard SQL. No passwords or credentials belong in this repository.

## Access-policy verification

Use a dedicated non-production Supabase project and non-sensitive test records. Run checks with the correct identity and **public anon key**, never the service-role key:

1. **Anonymous visitor:** call the Supabase Data API using the project URL and anon key without a signed-in user JWT. Reads of contact/admission/volunteer/event registrations, newsletter subscriptions, donations, payment transactions, and admin profiles must be denied. Anonymous writes to those tables and to events/gallery must be denied. Reads of events and gallery must include published rows only.
2. **Ordinary authenticated user:** create a temporary non-admin user from the dashboard for the test and sign in to obtain that user's session. Use the anon key plus that user's access token for Data API requests. Private submissions and payment/donation data must remain inaccessible; attempts to write any `admin_profiles` row or mutate one’s role must fail. An ordinary user should not be able to manage events or gallery. Delete the test user only in this non-production project after testing.
3. **Authorized admin:** create the profile only through the trusted dashboard procedure above, sign in as that account, and confirm `/admin` succeeds while an unauthenticated browser is redirected to `/admin/login`. Verify that the admin can read/manage operational submissions and content, but can only read (not write) donations and payment transactions through the authenticated Data API.
4. **Public form server routes:** with local app configuration set, submit valid and invalid requests to each `/api/contact`, `/api/admission`, `/api/volunteer`, and `/api/newsletter` endpoint. Confirm validation failures are 400, malformed/oversized requests are rejected, successful submissions appear in the intended table, and database failures return generic errors rather than internal DB details.

An active admin profile is provisioned through dashboard SQL Editor privileges; it is not provisioned by the browser or a public endpoint. SQL Editor checks do not test RLS because the SQL Editor runs with elevated privileges. Never use a service-role token to test anon or ordinary-user restrictions.

These instructions describe tests to perform; they are not evidence that live connectivity, RLS, or authentication has already been tested.

## Local testing

Once Supabase credentials are configured:

```bash
npm install
npm run dev
```

Then test the submission routes manually:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"+91 99999 99999","subject":"Website enquiry","message":"This is a local test message."}'
```

```bash
curl -X POST http://localhost:3000/api/admission \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","programmeInterest":"Vedic studies","message":"I am interested in learning more."}'
```

```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","source":"website"}'
```

```bash
curl -X POST http://localhost:3000/api/volunteer \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","interests":"I am interested in community service and outreach."}'
```

Verify that:

- the request succeeds only when credentials are configured,
- rows are created in the expected public tables,
- no public user can read private tables (see the Access-policy verification section),
- admin-only access is enforced through `admin_profiles` and server-side checks.

The four submission endpoints enforce a shared Upstash Redis fixed-window limit of five accepted requests per endpoint per client IP per ten minutes. Redis keys use an HMAC of the client IP rather than storing the raw IP. The server reads the first address in `X-Forwarded-For`; configure the hosting proxy/CDN to overwrite or sanitize that header so clients cannot choose their own limiter identity. Requests without a valid IP, missing Upstash configuration, Upstash errors, or timeouts fail closed with HTTP 503 before any database insert. A limit hit returns HTTP 429 and `Retry-After`.

Each route also recognizes a `companyWebsite` honeypot field: if non-empty, the route returns a generic accepted response without inserting a record. When the forms are wired to these APIs, include this as an unlabelled, visually hidden field that ordinary visitors cannot reach; do not prefill it. The honeypot is a low-cost bot signal, not CAPTCHA and not sufficient by itself.

There is no CAPTCHA provider configured. Rate limiting requires a reachable Upstash Redis REST database and all three `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, and `RATE_LIMIT_HASH_SECRET` values. Until that service is configured, the routes intentionally reject otherwise valid submissions with HTTP 503 instead of accepting unprotected writes. Do not deploy the public service-role-backed routes until the limiter and trusted proxy header behavior have been configured and tested.

## Relevant files

- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`
- `src/lib/supabase/admin.ts`
- `src/lib/validation.ts`
- `src/app/admin/page.tsx`
- `src/app/admin/login/page.tsx`
- `src/app/api/contact/route.ts`
- `src/app/api/admission/route.ts`
- `src/app/api/newsletter/route.ts`
- `src/app/api/volunteer/route.ts`
- `supabase/migrations/20261015_initial_schema.sql`
- `.env.example`

## Notes on security and scope

- No payment card details, CVVs, UPI PINs, or secrets are stored in the schema.
- The schema does not expose private donor records or admin identities to public users.
- Public visitors can submit forms, but they cannot enumerate protected records.
- Payment and donation tables are intentionally restricted to admin/server-side access in this foundation phase.
- Razorpay integration is intentionally excluded from this phase.
