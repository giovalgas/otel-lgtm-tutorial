create table if not exists public.user (
    id bigserial primary key,
    first_name text,
    last_name text,
    age smallint,
    full_address text,
    birthday date
)
