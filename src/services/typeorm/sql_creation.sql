-- drop database basicdb;
-- create database basicdb;
-- use basicdb;

create table user(
  userId int AUTO_INCREMENT,
  userFirstname varchar(50) not null,
  userLastname varchar(50) not null,
  userUsername varchar(50) not null,
  userPassword varchar(100) not null,
  userMail varchar(50) not null,
  userLastNotificationDate varchar(50) not null,
  createdAt varchar(50) not null,
  deletedAt varchar(150) not null,
  primary key(userId)
);

insert into user(
  userFirstname,
  userLastname,
  userUsername,
  userPassword,
  userMail,
  userLastNotificationDate,
  createdAt,
  deletedAt
) values
  ('Ted', 'Palmer','TeddyPop','1422a50614af12d3db8d917ff7528da2526bc911c3051ec6d00763ca4b44b457','ted.palmer@gmail.com','2020-06-12 08:52:24.985 +02:00', '2020-12-12 11:12:22.258 +02:00', ''),
  ('Marina','Gomez','marina253','1422a50614af12d3db8d917ff7528da2526bc911c3051ec6d00763ca4b44b457','marina.gomez@gmail.com','2020-09-12 11:12:24.569 +02:00', '2020-05-12 02:32:22.752 +02:00', ''),
  ('Sarah', 'Malah','Sarah523','1422a50614af12d3db8d917ff7528da2526bc911c3051ec6d00763ca4b44b457','Sarah.malah@gmail.com','2020-07-12 22:12:24.478 +02:00', '2020-12-01 19:56:22.569 +02:00', '')
;