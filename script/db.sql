create extension if not exists "uuid-ossp" 
-- Serve para criar a extensão para UUID caso ela não exista no postgres

create table usuarios (
  id uuid primary key,
  nome varchar(255) not null,
  email varchar(255) not null,
  senha varchar(255) not null
);