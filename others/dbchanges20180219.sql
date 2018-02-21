CREATE TABLE `sizetype` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(10) NOT NULL,
  `size1` VARCHAR(10) NOT NULL DEFAULT '---',
  `size2` VARCHAR(10) NOT NULL DEFAULT '---',
  `size3` VARCHAR(10) NOT NULL DEFAULT '---',
  `size4` VARCHAR(10) NOT NULL DEFAULT '---',
  `size5` VARCHAR(10) NOT NULL DEFAULT '---',
  `size6` VARCHAR(10) NOT NULL DEFAULT '---',
  `size7` VARCHAR(10) NOT NULL DEFAULT '---',
  `size8` VARCHAR(10) NOT NULL DEFAULT '---',
  `size9` VARCHAR(10) NOT NULL DEFAULT '---',
  `size10` VARCHAR(10) NOT NULL DEFAULT '---',
  `modified_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC));


CREATE TABLE `sizerange` (
  `idsize` INT(11) NOT NULL AUTO_INCREMENT,
  `idsizetype` INT(11) NOT NULL,
  `name` VARCHAR(10) NOT NULL,
  `size1` INT(11) NOT NULL DEFAULT '0',
  `size2` INT(11) NOT NULL DEFAULT '0',
  `size3` INT(11) NOT NULL DEFAULT '0',
  `size4` INT(11) NOT NULL DEFAULT '0',
  `size5` INT(11) NOT NULL DEFAULT '0',
  `size6` INT(11) NOT NULL DEFAULT '0',
  `size7` INT(11) NOT NULL DEFAULT '0',
  `size8` INT(11) NOT NULL DEFAULT '0',
  `size9` INT(11) NOT NULL DEFAULT '0',
  `size10` INT(11) NOT NULL DEFAULT '0',
  `modified_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idsize`),
  UNIQUE INDEX `index2` (`idsizetype` ASC, `size1` ASC, `size2` ASC, `size3` ASC, `size4` ASC, `size5` ASC, `size6` ASC, `size7` ASC, `size8` ASC, `size9` ASC, `size10` ASC),
  CONSTRAINT `fk_sizerange_1`
    FOREIGN KEY (`idsizetype`)
    REFERENCES `sizetype` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);



CREATE TABLE `iteminfo` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `naming_series` VARCHAR(45) NOT NULL,
  `uid` INT NOT NULL,
  `name` VARCHAR(60) NOT NULL,
  `sizerange` INT(11) NOT NULL,
  `pieces` INT(11) NULL DEFAULT NULL,
  `boxespercarton` INT(11) NOT NULL DEFAULT '0',
  `category` VARCHAR(45) NULL DEFAULT NULL,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `blame_user` VARCHAR(45) NOT NULL DEFAULT 'NA',
  `modified_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  INDEX `fk_iteminfo_1_idx` (`sizerange` ASC),
  CONSTRAINT `fk_iteminfo_1`
    FOREIGN KEY (`sizerange`)
    REFERENCES `sizerange` (`idsize`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);


CREATE DEFINER = CURRENT_USER TRIGGER `iteminfo_BEFORE_UPDATE` BEFORE UPDATE ON `iteminfo` FOR EACH ROW
BEGIN
  	INSERT INTO history (table_name,primary_id, previous_value, blame_user)
    SELECT 'iteminfo',old.id,diff.row_diff,NEW.blame_user FROM
      (SELECT concat_ws('','{','"id":','"',old.id,'"',CASE when old.naming_series <> new.naming_series OR (old.naming_series is NULL XOR new.naming_series is NULL) then concat_ws( '',',"naming_series":','"',old.naming_series,'"') else '' END
                                                      ,CASE when old.uid <> new.uid OR (old.uid is NULL XOR new.uid is NULL) then concat_ws( '',',"uid":','"',old.uid,'"') else '' END
                                                      ,CASE when old.name <> new.name OR (old.name is NULL XOR new.name is NULL) then concat_ws( '',',"name":','"',old.name,'"') else '' END
                                                      ,CASE when old.sizerange <> new.sizerange OR (old.sizerange is NULL XOR new.sizerange is NULL) then concat_ws( '',',"sizerange":','"',old.sizerange,'"') else '' END
                                                      ,CASE when old.pieces <> new.pieces OR (old.pieces is NULL XOR new.pieces is NULL) then concat_ws( '',',"pieces":','"',old.pieces,'"') else '' END
                                                      ,CASE when old.boxespercarton <> new.boxespercarton OR (old.boxespercarton is NULL XOR new.boxespercarton is NULL) then concat_ws('',',"boxespercarton":','"',old.boxespercarton,'"') else '' END
                                                      ,CASE when old.category <> new.category OR (old.category is NULL XOR new.category is NULL) then concat_ws( '',',"category":','"',old.category,'"') else '' END
                                                      ,CASE when old.status <> new.status OR (old.status is NULL XOR new.status is NULL) then concat_ws( '',',"status":','"',old.status,'"') else '' END
                                                      ,CASE when old.blame_user <> new.blame_user OR (old.blame_user is NULL XOR new.blame_user is NULL) then concat_ws( '',',"blame_user":','"',old.blame_user,'"') else '' END
                                                      ,concat_ws( '',',"modified_time":','"',old.modified_time,'"'),'}')
as row_diff)
      as diff;
END;




INSERT INTO sizetype (name, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10) VALUES ('75 - 120', '75', '80', '85', '90', '95', '100', '105', '110', '115', '120');
INSERT INTO sizetype (name, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10) VALUES ('35 - 80', '35 cm', '40 cm', '45 cm', '50 cm', '55 cm', '60 cm', '65 cm', '70 cm', '75 cm', '80 cm');
INSERT INTO sizetype (name, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10) VALUES ('XS - 4XL', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '---', '---');
INSERT INTO sizetype (name, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10) VALUES ('Free Size', '32-40', '---', '---', '---', '---', '---', '---', '---', '---', '---');
INSERT INTO sizetype (name, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10) VALUES ('60 - 90', '60 cm', '65 cm', '70 cm', '75 cm', '80 cm', '85 cm', '90 cm', '---', '---', '---');




INSERT INTO sizerange (idsizetype, name, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10) VALUES (1, '75 - 100', 1, 1, 1, 1, 1, 1, 0, 0, 0, 0);
INSERT INTO sizerange (idsizetype, name, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10) VALUES (1, '80 - 100', 0, 1, 1, 1, 1, 1, 0, 0, 0, 0);
INSERT INTO sizerange (idsizetype, name, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10) VALUES (1, '75 - 90', 1, 1, 1, 1, 0, 0, 0, 0, 0, 0);
INSERT INTO sizerange (idsizetype, name, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10) VALUES (2, '45 - 75', 0, 0, 1, 1, 1, 1, 1, 1, 1, 0);
INSERT INTO sizerange (idsizetype, name, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10) VALUES (2, '45 - 80', 0, 0, 1, 1, 1, 1, 1, 1, 1, 1);
INSERT INTO sizerange (idsizetype, name, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10) VALUES (3, 'M - XL', 0, 0, 1, 1, 1, 0, 0, 0, 0, 0);
INSERT INTO sizerange (idsizetype, name, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10) VALUES (2, '60 - 75', 0, 0, 0, 0, 0, 1, 1, 1, 1, 0);
INSERT INTO sizerange (idsizetype, name, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10) VALUES (2, '35 - 75', 1, 1, 1, 1, 1, 1, 1, 1, 1, 0);
INSERT INTO sizerange (idsizetype, name, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10) VALUES (1, '75 - 110', 1, 1, 1, 1, 1, 1, 1, 1, 0, 0);
INSERT INTO sizerange (idsizetype, name, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10) VALUES (3, 'S - XXL', 0, 1, 1, 1, 1, 1, 0, 0, 0, 0);
INSERT INTO sizerange (idsizetype, name, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10) VALUES (1, '80 - 110', 0, 1, 1, 1, 1, 1, 1, 1, 0, 0);
INSERT INTO sizerange (idsizetype, name, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10) VALUES (4, 'Free Size', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
INSERT INTO sizerange (idsizetype, name, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10) VALUES (5, '60 - 90', 1, 1, 1, 1, 1, 1, 1, 0, 0, 0);





