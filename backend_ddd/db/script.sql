drop type if exists user_type_enum cascade;
drop table if exists users cascade;
drop table if exists bases cascade;
drop table if exists missiles cascade;
drop type if exists missile_status_enum cascade;

create type user_type_enum as enum ('ARMY_CHIEF', 'GENERAL', 'COLONEL');
create type missile_status_enum as enum ('UNFIRED', 'FIRED')

create table users (
    id uuid primary key,
    name varchar(255) not null,
    type user_type_enum not null,
    email varchar(255) not null,
    password varchar(255) not null
);

create table bases (
    id uuid primary key,
    name varchar(255) not null,
    latitude float not null,
    longitude float not null
);

create table missiles (
    id uuid primary key,
    name varchar(255) not null,
    base_id uuid references bases(id) not null,
    range float not null,
    blast_radius float not null,
    status missile_status_enum not null
);

