CREATE SCHEMA `dcdb` DEFAULT CHARACTER SET utf8;

CREATE TABLE `dbinfo` (
  `infoid` INT(11) NOT NULL AUTO_INCREMENT,
  `infoname` VARCHAR(45) NOT NULL,
  `info` VARCHAR(45) NULL,
  UNIQUE INDEX `item_UNIQUE` (`infoname` ASC),
  PRIMARY KEY (`infoid`));


INSERT INTO `dbinfo` (`infoname`, `info`) VALUES ('Brand Name', 'Essdee');

create table employee
(
	id int auto_increment
		primary key,
	email varchar(50) not null,
	password varchar(100) not null,
	createdAt timestamp not null,
	updatedAt datetime not null,
	constraint user_email_uindex
		unique (email)
);




