create table activity (
  id bigint generated always as identity primary key,
  name text not null,
  description text null
);

create table activity_benefit (
  id bigint generated always as identity primary key,
  activity_id bigint references activity(id),
  benefit_id bigint references benefit(id)
);