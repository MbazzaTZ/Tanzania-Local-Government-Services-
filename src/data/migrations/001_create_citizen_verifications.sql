-- Table: citizen_verifications
create table if not exists public.citizen_verifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  nida_number text not null,
  full_name text not null,
  dob date,
  gender text,
  phone text,
  guardian_name text,
  guardian_contact text,
  region text,
  district text,
  ward text,
  village text,
  verification_status text default 'pending_verification',
  verification_reason text,
  certificate_url text,
  approved_by uuid,
  created_at timestamp default now(),
  updated_at timestamp default now()
);
