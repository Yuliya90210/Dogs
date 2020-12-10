create table members (
  id serial primary key,
  name varchar(255),
  race varchar(255),
  age int,
  father varchar(255),
  mother varchar(255),
  club int references clubs(id),
  number int,
  ring int,
  prize int
);

create table clubs (
  id serial primary key,
  name varchar(255)
);

create table experts (
  id serial primary key,
  full_name varchar(255),
  club int references clubs(id),
  ring int
);


insert into clubs (
  name
)
values (
  'YourPuppy'
);


insert into members (
  name,
  race,
  age,
  father,
  mother,
  club,
  number,
  ring
) values (
  'Ярд',
  'Бигль',
  4,
  'Юлик',
  'Адель',
  3,
  4,
  3
);

insert into experts (
  full_name,
  club,
  ring
) values (
  '123 456 789',
  1,
  3
);