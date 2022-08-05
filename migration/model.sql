drop database if exists blog_site;

create database blog_site;

\c blog_site;

drop table if exists users;
create table users(
    userId bigserial not null primary key,
    user_name character varying(255) not null,
    email character varying(255) not null,
    user_password character varying(255) not null
);

drop table if exists posts;
create table posts(
    postId bigserial not null primary key,
    author character varying(255) not null,
    title character varying(255) not null
);