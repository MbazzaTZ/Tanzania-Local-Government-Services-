-- =====================================================
-- Supabase Migration: Cases, Permits, Payments
-- =====================================================

-- CASES TABLE ---------------------------------------------------------
create table if not exists public.cases (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  applicant_name text not null,
  respondent_name text,
  case_type text,
  description text,
  verification_status text default 'pending',
  decision text,
  approved_by uuid,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- PERMITS TABLE -------------------------------------------------------
create table if not exists public.permits (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  applicant_name text not null,
  permit_type text not null,
  details text,
  valid_from date,
  valid_to date,
  issued_by text,
  status text default 'pending',
  control_number text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- PAYMENTS TABLE ------------------------------------------------------
create table if not exists public.payments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  full_name text not null,
  service_type text not null,
  amount numeric(12,2) not null,
  control_number text,
  payment_status text default 'pending',
  receipt_url text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- ENABLE REALTIME BROADCAST ------------------------------------------
alter publication supabase_realtime add table public.cases;
alter publication supabase_realtime add table public.permits;
alter publication supabase_realtime add table public.payments;
