-- Reproducible schema for study-lab's dedicated project only.
-- Applied to wponmfstrswrbcxzzhjx. No other project is a dependency.
create table if not exists public.study_snapshots (
  user_id uuid primary key references auth.users(id) on delete cascade,
  revision bigint not null default 1,
  payload jsonb not null default '{}'::jsonb
    check (jsonb_typeof(payload) = 'object' and octet_length(payload::text) <= 5000000),
  updated_at timestamptz not null default now()
);
alter table public.study_snapshots enable row level security;
drop policy if exists own_snapshots on public.study_snapshots;
create policy own_snapshots on public.study_snapshots
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
revoke all on public.study_snapshots from anon;
grant select, insert, update on public.study_snapshots to authenticated;

create or replace function public.save_study_snapshot(expected_revision bigint, snapshot jsonb)
returns setof public.study_snapshots
language plpgsql security invoker set search_path = '' as $$
begin
  if auth.uid() is null then raise exception 'Sign in required'; end if;
  if jsonb_typeof(snapshot) <> 'object' or octet_length(snapshot::text) > 5000000 then
    raise exception 'Invalid snapshot';
  end if;
  if expected_revision = 0 then
    return query insert into public.study_snapshots(user_id,payload)
      values (auth.uid(),snapshot) on conflict do nothing returning *;
  else
    return query update public.study_snapshots
      set payload=snapshot, revision=revision+1, updated_at=now()
      where user_id=auth.uid() and revision=expected_revision returning *;
  end if;
end $$;
revoke execute on function public.save_study_snapshot(bigint,jsonb) from public,anon;
grant execute on function public.save_study_snapshot(bigint,jsonb) to authenticated;
