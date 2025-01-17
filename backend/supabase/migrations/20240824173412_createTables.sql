create table account_type (
  id bigint generated always as identity primary key,
  type text not null,
  permissions text
);

create table account (
  id bigint generated always as identity primary key,
  email text not null,
  password text not null,
  phone_number int,
  account_type_id bigint references account_type(id)
);

create table address (
  id bigint generated always as identity primary key,
  addressNumber text not null,
  complement text,
  reference text,
  latitude float,
  longitude float,
  postalCode text not null,
  streetName text not null,
  neighborhood text not null,
  city text not null,
  state text not null
);

create table image (
  id bigint generated always as identity primary key,
  name text not null,
  description text,
  recommendations text
);

create table users (
  id bigint generated always as identity primary key,
  addressId bigint references address(id),
  accountId bigint references account(id),
  name text not null,
  birthdate date null
);

create table feedback (
  id bigint generated always as identity primary key,
  placeId bigint references place(id),
  userId bigint references users(id),
  rating float not null,
  description text
);

create table feedback_image (
  id bigint generated always as identity primary key,
  imageId bigint references image(id),
  feedbackId bigint references feedback(id)
);

create table place_by_activity (
  id bigint generated always as identity primary key,
  activityId bigint references activity(id),
  placeId bigint references place(id)
);

create table favorite_place (
  id bigint generated always as identity primary key,
  placeId bigint references place(id)
);

create table place_image (
  id bigint generated always as identity primary key,
  placeId bigint references place(id),
  imageId bigint references image(id)
);


create table event (
  id bigint generated always as identity primary key,
  placeId bigint references place(id),
  name text,
  url text
);

ALTER TABLE place
ALTER COLUMN "addressId" TYPE bigint USING "addressId"::bigint;

UPDATE place
SET "addressId" = 1
WHERE "addressId" NOT IN (SELECT id FROM address);

ALTER TABLE place
ADD CONSTRAINT fk_place_address
FOREIGN KEY ("addressId")
REFERENCES address(id);