-- ROBOGPT Veritabanı Kurulum SQL
-- Bu SQL'i Supabase SQL Editor'a yapıştır ve çalıştır

create table if not exists ogrenciler (
  id uuid default gen_random_uuid() primary key,
  ad text not null,
  ucret integer not null,
  odeme_tarihi date,
  grup text default 'Büyük',
  notlar text,
  telefon text,
  email text,
  durum text default 'Aktif',
  created_at timestamp with time zone default now()
);

-- Row Level Security (herkese açık - basit kullanım için)
alter table ogrenciler enable row level security;

create policy "Allow all" on ogrenciler
  for all using (true) with check (true);
