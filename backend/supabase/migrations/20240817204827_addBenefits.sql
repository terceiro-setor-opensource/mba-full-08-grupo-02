create table benefit (
  id bigint generated always as identity primary key,
  name text not null,
  description text not null
);