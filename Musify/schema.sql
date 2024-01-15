
create table sale (
  id int not null auto_increment,
  saleText text not null,
  startTime timestamp default CURRENT_TIMESTAMP,
  endTime timestamp default null,
  active bool not null default FALSE,
  primary key(id)        
);
create table contact (
id int not null auto_increment,
clientName text not null,
email text not null,
subsDate text not null,
subscribtion text not null,
checkbox text,
primary key(id)
);

