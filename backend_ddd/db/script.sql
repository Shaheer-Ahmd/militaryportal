drop type if exists user_type_enum cascade;
drop table if exists users cascade;


create type user_type_enum as enum ('ARMY_CHIEF', 'GENERAL', 'COLONEL');
create table users (
    id uuid primary key,
    name varchar(255) not null,
    type user_type_enum not null,
    email varchar(255) not null,
    password varchar(255) not null
);
