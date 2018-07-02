CREATE TABLE `grn` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idsupplier` INT NOT NULL,
  `naming_series` VARCHAR(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `grn_number` INT NOT NULL,
  `department` INT NOT NULL,
  `grn_date` DATE NOT NULL,
  `vehicle_number` VARCHAR(12) NULL,
  `comment` VARCHAR(120) NULL,
  `status` ENUM('active', 'inactive', 'complete') NOT NULL DEFAULT 'active',
  `blame_user` VARCHAR(45) NOT NULL,
  `modified_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `grn_number_unique` (`naming_series` ASC, `grn_number` ASC),
  INDEX `fk_grn_1_idx` (`idsupplier` ASC),
  INDEX `fk_grn_2_idx` (`department` ASC),
  CONSTRAINT `fk_grn_1`
    FOREIGN KEY (`idsupplier`)
    REFERENCES `supplier` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_grn_2`
    FOREIGN KEY (`department`)
    REFERENCES `department` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_grn_3`
    FOREIGN KEY (`naming_series`)
    REFERENCES `series` (`name`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `grn_BEFORE_INSERT` BEFORE INSERT ON `grn` FOR EACH ROW
BEGIN
  INSERT INTO series (name,`desc`,last_serial) VALUES (NEW.naming_series,'added from trigger',1)
  ON DUPLICATE KEY UPDATE last_serial = last_serial + 1; 
  SET NEW.grn_number = (SELECT last_serial FROM series WHERE name = NEW.naming_series);
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `grn_BEFORE_UPDATE` BEFORE UPDATE ON `grn` FOR EACH ROW
BEGIN
  	INSERT INTO history (table_name,primary_id, previous_value, blame_user)
    SELECT 'grn',old.id,diff.row_diff,NEW.blame_user FROM
      (SELECT concat_ws('','{','"id":','"',old.id,'"',CASE when old.idsupplier <> new.idsupplier OR (old.idsupplier is NULL XOR new.idsupplier is NULL) then concat_ws( '',',"idsupplier":','"',old.idsupplier,'"') else '' END
                                                      ,CASE when old.naming_series <> new.naming_series OR (old.naming_series is NULL XOR new.naming_series is NULL) then concat_ws( '',',"naming_series":','"',old.naming_series,'"') else '' END
                                                      ,CASE when old.grn_number <> new.grn_number OR (old.grn_number is NULL XOR new.grn_number is NULL) then concat_ws( '',',"grn_number":','"',old.grn_number,'"') else '' END
                                                      ,CASE when old.department <> new.department OR (old.department is NULL XOR new.department is NULL) then concat_ws( '',',"department":','"',old.department,'"') else '' END
                                                      ,CASE when old.grn_date <> new.grn_date OR (old.grn_date is NULL XOR new.grn_date is NULL) then concat_ws( '',',"grn_date":','"',old.grn_date,'"') else '' END
                                                      ,CASE when old.vehicle_number <> new.vehicle_number OR (old.vehicle_number is NULL XOR new.vehicle_number is NULL) then concat_ws( '',',"vehicle_number":','"',old.vehicle_number,'"') else '' END
                                                      ,CASE when old.comment <> new.comment OR (old.comment is NULL XOR new.comment is NULL) then concat_ws( '',',"comment":','"',old.comment,'"') else '' END
                                                      ,CASE when old.status <> new.status OR (old.status is NULL XOR new.status is NULL) then concat_ws( '',',"status":','"',old.status,'"') else '' END
                                                      ,CASE when old.blame_user <> new.blame_user OR (old.blame_user is NULL XOR new.blame_user is NULL) then concat_ws( '',',"blame_user":','"',old.blame_user,'"') else '' END
                                                      ,concat_ws( '',',"modified_time":','"',old.modified_time,'"'),'}')
as row_diff)
      as diff;
END $$
DELIMITER ;

CREATE TABLE `cgrnitems` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idgrn` INT NOT NULL,
  `lot_number` VARCHAR(45) NULL,
  `colour` VARCHAR(45) NULL,
  `colour_index` INT NOT NULL,
  `dia` FLOAT NULL,
  `roll` INT NULL,
  `weight` FLOAT NOT NULL,
  `comment` VARCHAR(120) NULL,
  `blame_user` VARCHAR(45) NOT NULL,
  `modified_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_cgrnitems_1_idx` (`idgrn` ASC),
  CONSTRAINT `fk_cgrnitems_1`
    FOREIGN KEY (`idgrn`)
    REFERENCES `grn` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `cgrnitems_BEFORE_UPDATE` BEFORE UPDATE ON `cgrnitems` FOR EACH ROW
BEGIN
  	INSERT INTO history (table_name,primary_id, previous_value, blame_user)
    SELECT 'cgrnitems',old.id,diff.row_diff,NEW.blame_user FROM
      (SELECT concat_ws('','{','"id":','"',old.id,'"',CASE when old.idgrn <> new.idgrn OR (old.idgrn is NULL XOR new.idgrn is NULL) then concat_ws( '',',"idgrn":','"',old.idgrn,'"') else '' END
                                                     ,CASE when old.lot_number <> new.lot_number OR (old.lot_number is NULL XOR new.lot_number is NULL) then concat_ws( '',',"lot_number":','"',old.lot_number,'"') else '' END
                                                     ,CASE when old.colour <> new.colour OR (old.colour is NULL XOR new.colour is NULL) then concat_ws( '',',"colour":','"',old.colour,'"') else '' END
                                                     ,CASE when old.colour_index <> new.colour_index OR (old.colour_index is NULL XOR new.colour_index is NULL) then concat_ws( '',',"colour_index":','"',old.colour_index,'"') else '' END
                                                     ,CASE when old.dia <> new.dia OR (old.dia is NULL XOR new.dia is NULL) then concat_ws( '',',"dia":','"',old.dia,'"') else '' END
                                                     ,CASE when old.roll <> new.roll OR (old.roll is NULL XOR new.roll is NULL) then concat_ws( '',',"roll":','"',old.roll,'"') else '' END
                                                     ,CASE when old.weight <> new.weight OR (old.weight is NULL XOR new.weight is NULL) then concat_ws( '',',"weight":','"',old.weight,'"') else '' END
                                                     ,CASE when old.comment <> new.comment OR (old.comment is NULL XOR new.comment is NULL) then concat_ws( '',',"comment":','"',old.comment,'"') else '' END
                                                     ,CASE when old.blame_user <> new.blame_user OR (old.blame_user is NULL XOR new.blame_user is NULL) then concat_ws( '',',"blame_user":','"',old.blame_user,'"') else '' END
                                                     ,concat_ws( '',',"modified_time":','"',old.modified_time,'"'),'}')
as row_diff)
      as diff;
END $$
DELIMITER ;

CREATE TABLE `pgrnitems` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idgrn` INT NOT NULL,
  `lot_number` VARCHAR(45) NULL,
  `iditem` INT NOT NULL,
  `part_index` INT NOT NULL DEFAULT '0',
  `colour` VARCHAR(45) NULL,
  `part` VARCHAR(45) NULL,
  `size1` INT NULL,
  `size2` INT NULL,
  `size3` INT NULL,
  `size4` INT NULL,
  `size5` INT NULL,
  `size6` INT NULL,
  `size7` INT NULL,
  `size8` INT NULL,
  `size9` INT NULL,
  `size10` INT NULL,
  `wsize1` FLOAT NOT NULL,
  `wsize2` FLOAT NOT NULL,
  `wsize3` FLOAT NOT NULL,
  `wsize4` FLOAT NOT NULL,
  `wsize5` FLOAT NOT NULL,
  `wsize6` FLOAT NOT NULL,
  `wsize7` FLOAT NOT NULL,
  `wsize8` FLOAT NOT NULL,
  `wsize9` FLOAT NOT NULL,
  `wsize10` FLOAT NOT NULL,
  `comment` VARCHAR(120) NULL,
  `blame_user` VARCHAR(45) NOT NULL,
  `modified_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_pgrnitems_1_idx` (`idgrn` ASC),
  INDEX `fk_pgrnitems_2_idx` (`iditem` ASC),
  CONSTRAINT `fk_pgrnitems_1`
    FOREIGN KEY (`idgrn`)
    REFERENCES `grn` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_pgrnitems_2`
    FOREIGN KEY (`iditem`)
    REFERENCES `iteminfo` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `pgrnitems_BEFORE_UPDATE` BEFORE UPDATE ON `pgrnitems` FOR EACH ROW
BEGIN
  	INSERT INTO history (table_name,primary_id, previous_value, blame_user)
    SELECT 'pgrnitems',old.id,diff.row_diff,NEW.blame_user FROM
      (SELECT concat_ws('','{','"id":','"',old.id,'"',CASE when old.idgrn <> new.idgrn OR (old.idgrn is NULL XOR new.idgrn is NULL) then concat_ws( '',',"idgrn":','"',old.idgrn,'"') else '' END
                                                      ,CASE when old.colour <> new.colour OR (old.colour is NULL XOR new.colour is NULL) then concat_ws( '',',"colour":','"',old.colour,'"') else '' END
                                                      ,CASE when old.lot_number <> new.lot_number OR (old.lot_number is NULL XOR new.lot_number is NULL) then concat_ws( '',',"lot_number":','"',old.lot_number,'"') else '' END
                                                      ,CASE when old.iditem <> new.iditem OR (old.iditem is NULL XOR new.iditem is NULL) then concat_ws( '',',"iditem":','"',old.iditem,'"') else '' END
                                                      ,CASE when old.part_index <> new.part_index OR (old.part_index is NULL XOR new.part_index is NULL) then concat_ws( '',',"part_index":','"',old.part_index,'"') else '' END
                                                      ,CASE when old.part <> new.part OR (old.part is NULL XOR new.part is NULL) then concat_ws( '',',"part":','"',old.part,'"') else '' END
                                                      ,CASE when old.size1 <> new.size1 OR (old.size1 is NULL XOR new.size1 is NULL) then concat_ws( '',',"size1":','"',old.size1,'"') else '' END
                                                      ,CASE when old.size2 <> new.size2 OR (old.size2 is NULL XOR new.size2 is NULL) then concat_ws( '',',"size2":','"',old.size2,'"') else '' END
                                                      ,CASE when old.size3 <> new.size3 OR (old.size3 is NULL XOR new.size3 is NULL) then concat_ws( '',',"size3":','"',old.size3,'"') else '' END
                                                      ,CASE when old.size4 <> new.size4 OR (old.size4 is NULL XOR new.size4 is NULL) then concat_ws( '',',"size4":','"',old.size4,'"') else '' END
                                                      ,CASE when old.size5 <> new.size5 OR (old.size5 is NULL XOR new.size5 is NULL) then concat_ws( '',',"size5":','"',old.size5,'"') else '' END
                                                      ,CASE when old.size6 <> new.size6 OR (old.size6 is NULL XOR new.size6 is NULL) then concat_ws( '',',"size6":','"',old.size6,'"') else '' END
                                                      ,CASE when old.size7 <> new.size7 OR (old.size7 is NULL XOR new.size7 is NULL) then concat_ws( '',',"size7":','"',old.size7,'"') else '' END
                                                      ,CASE when old.size8 <> new.size8 OR (old.size8 is NULL XOR new.size8 is NULL) then concat_ws( '',',"size8":','"',old.size8,'"') else '' END
                                                      ,CASE when old.size9 <> new.size9 OR (old.size9 is NULL XOR new.size9 is NULL) then concat_ws( '',',"size9":','"',old.size9,'"') else '' END
                                                      ,CASE when old.size10 <> new.size10 OR (old.size10 is NULL XOR new.size10 is NULL) then concat_ws( '',',"size10":','"',old.size10,'"') else '' END
                                                      ,CASE when old.wsize1 <> new.wsize1 OR (old.wsize1 is NULL XOR new.wsize1 is NULL) then concat_ws( '',',"wsize1":','"',old.wsize1,'"') else '' END
                                                      ,CASE when old.wsize2 <> new.wsize2 OR (old.wsize2 is NULL XOR new.wsize2 is NULL) then concat_ws( '',',"wsize2":','"',old.wsize2,'"') else '' END
                                                      ,CASE when old.wsize3 <> new.wsize3 OR (old.wsize3 is NULL XOR new.wsize3 is NULL) then concat_ws( '',',"wsize3":','"',old.wsize3,'"') else '' END
                                                      ,CASE when old.wsize4 <> new.wsize4 OR (old.wsize4 is NULL XOR new.wsize4 is NULL) then concat_ws( '',',"wsize4":','"',old.wsize4,'"') else '' END
                                                      ,CASE when old.wsize5 <> new.wsize5 OR (old.wsize5 is NULL XOR new.wsize5 is NULL) then concat_ws( '',',"wsize5":','"',old.wsize5,'"') else '' END
                                                      ,CASE when old.wsize6 <> new.wsize6 OR (old.wsize6 is NULL XOR new.wsize6 is NULL) then concat_ws( '',',"wsize6":','"',old.wsize6,'"') else '' END
                                                      ,CASE when old.wsize7 <> new.wsize7 OR (old.wsize7 is NULL XOR new.wsize7 is NULL) then concat_ws( '',',"wsize7":','"',old.wsize7,'"') else '' END
                                                      ,CASE when old.wsize8 <> new.wsize8 OR (old.wsize8 is NULL XOR new.wsize8 is NULL) then concat_ws( '',',"wsize8":','"',old.wsize8,'"') else '' END
                                                      ,CASE when old.wsize9 <> new.wsize9 OR (old.wsize9 is NULL XOR new.wsize9 is NULL) then concat_ws( '',',"wsize9":','"',old.wsize9,'"') else '' END
                                                      ,CASE when old.wsize10 <> new.wsize10 OR (old.wsize10 is NULL XOR new.wsize10 is NULL) then concat_ws( '',',"wsize10":','"',old.wsize10,'"') else '' END
                                                      ,CASE when old.comment <> new.comment OR (old.comment is NULL XOR new.comment is NULL) then concat_ws( '',',"comment":','"',old.comment,'"') else '' END
                                                      ,CASE when old.blame_user <> new.blame_user OR (old.blame_user is NULL XOR new.blame_user is NULL) then concat_ws( '',',"blame_user":','"',old.blame_user,'"') else '' END
                                                      ,concat_ws( '',',"modified_time":','"',old.modified_time,'"'),'}')
as row_diff)
      as diff;
END $$
DELIMITER ;

CREATE TABLE `pcgrnitems` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idgrn` INT NOT NULL,
  `lot_number` VARCHAR(45) NULL,
  `iditem` INT NOT NULL,
  `part_index` INT NOT NULL DEFAULT '0',
  `colour` VARCHAR(45) NULL,
  `part` VARCHAR(45) NULL,
  `size1` INT NULL,
  `size2` INT NULL,
  `size3` INT NULL,
  `size4` INT NULL,
  `size5` INT NULL,
  `size6` INT NULL,
  `size7` INT NULL,
  `size8` INT NULL,
  `size9` INT NULL,
  `size10` INT NULL,
  `comment` VARCHAR(120) NULL,
  `blame_user` VARCHAR(45) NOT NULL,
  `modified_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_pcgrnitems_1_idx` (`idgrn` ASC),
  INDEX `fk_pcgrnitems_2_idx` (`iditem` ASC),
  CONSTRAINT `fk_pcgrnitems_1`
    FOREIGN KEY (`idgrn`)
    REFERENCES `grn` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_pcgrnitems_2`
    FOREIGN KEY (`iditem`)
    REFERENCES `iteminfo` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `pcgrnitems_BEFORE_UPDATE` BEFORE UPDATE ON `pcgrnitems` FOR EACH ROW
BEGIN
  	INSERT INTO history (table_name,primary_id, previous_value, blame_user)
    SELECT 'pcgrnitems',old.id,diff.row_diff,NEW.blame_user FROM
      (SELECT concat_ws('','{','"id":','"',old.id,'"',CASE when old.idgrn <> new.idgrn OR (old.idgrn is NULL XOR new.idgrn is NULL) then concat_ws( '',',"idgrn":','"',old.idgrn,'"') else '' END
                                                      ,CASE when old.colour <> new.colour OR (old.colour is NULL XOR new.colour is NULL) then concat_ws( '',',"colour":','"',old.colour,'"') else '' END
                                                      ,CASE when old.lot_number <> new.lot_number OR (old.lot_number is NULL XOR new.lot_number is NULL) then concat_ws( '',',"lot_number":','"',old.lot_number,'"') else '' END
                                                      ,CASE when old.iditem <> new.iditem OR (old.iditem is NULL XOR new.iditem is NULL) then concat_ws( '',',"iditem":','"',old.iditem,'"') else '' END
                                                      ,CASE when old.part_index <> new.part_index OR (old.part_index is NULL XOR new.part_index is NULL) then concat_ws( '',',"part_index":','"',old.part_index,'"') else '' END
                                                      ,CASE when old.part <> new.part OR (old.part is NULL XOR new.part is NULL) then concat_ws( '',',"part":','"',old.part,'"') else '' END
                                                      ,CASE when old.size1 <> new.size1 OR (old.size1 is NULL XOR new.size1 is NULL) then concat_ws( '',',"size1":','"',old.size1,'"') else '' END
                                                      ,CASE when old.size2 <> new.size2 OR (old.size2 is NULL XOR new.size2 is NULL) then concat_ws( '',',"size2":','"',old.size2,'"') else '' END
                                                      ,CASE when old.size3 <> new.size3 OR (old.size3 is NULL XOR new.size3 is NULL) then concat_ws( '',',"size3":','"',old.size3,'"') else '' END
                                                      ,CASE when old.size4 <> new.size4 OR (old.size4 is NULL XOR new.size4 is NULL) then concat_ws( '',',"size4":','"',old.size4,'"') else '' END
                                                      ,CASE when old.size5 <> new.size5 OR (old.size5 is NULL XOR new.size5 is NULL) then concat_ws( '',',"size5":','"',old.size5,'"') else '' END
                                                      ,CASE when old.size6 <> new.size6 OR (old.size6 is NULL XOR new.size6 is NULL) then concat_ws( '',',"size6":','"',old.size6,'"') else '' END
                                                      ,CASE when old.size7 <> new.size7 OR (old.size7 is NULL XOR new.size7 is NULL) then concat_ws( '',',"size7":','"',old.size7,'"') else '' END
                                                      ,CASE when old.size8 <> new.size8 OR (old.size8 is NULL XOR new.size8 is NULL) then concat_ws( '',',"size8":','"',old.size8,'"') else '' END
                                                      ,CASE when old.size9 <> new.size9 OR (old.size9 is NULL XOR new.size9 is NULL) then concat_ws( '',',"size9":','"',old.size9,'"') else '' END
                                                      ,CASE when old.size10 <> new.size10 OR (old.size10 is NULL XOR new.size10 is NULL) then concat_ws( '',',"size10":','"',old.size10,'"') else '' END
                                                      ,CASE when old.comment <> new.comment OR (old.comment is NULL XOR new.comment is NULL) then concat_ws( '',',"comment":','"',old.comment,'"') else '' END
                                                      ,CASE when old.blame_user <> new.blame_user OR (old.blame_user is NULL XOR new.blame_user is NULL) then concat_ws( '',',"blame_user":','"',old.blame_user,'"') else '' END
                                                      ,concat_ws( '',',"modified_time":','"',old.modified_time,'"'),'}')
as row_diff)
      as diff;
END $$
DELIMITER ;


CREATE TABLE `dcgrn` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `iddc` INT NOT NULL,
  `idgrn` INT NOT NULL,
  `document_type` ENUM('dc', 'grn') NOT NULL,
  `blame_user` VARCHAR(45) NOT NULL,
  `modified_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_dcgrn_1_idx` (`idgrn` ASC),
  INDEX `fk_dcgrn_2_idx` (`iddc` ASC),
  CONSTRAINT `fk_dcgrn_1`
    FOREIGN KEY (`idgrn`)
    REFERENCES `grn` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_dcgrn_2`
    FOREIGN KEY (`iddc`)
    REFERENCES `dc` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE );


DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `dcgrn_BEFORE_UPDATE` BEFORE UPDATE ON `dcgrn` FOR EACH ROW
BEGIN
  	INSERT INTO history (table_name,primary_id, previous_value, blame_user)
    SELECT 'dcgrn',old.id,diff.row_diff,NEW.blame_user FROM
      (SELECT concat_ws('','{','"id":','"',old.id,'"',CASE when old.idgrn <> new.idgrn OR (old.idgrn is NULL XOR new.idgrn is NULL) then concat_ws( '',',"idgrn":','"',old.idgrn,'"') else '' END
                                                      ,CASE when old.iddc <> new.iddc OR (old.iddc is NULL XOR new.iddc is NULL) then concat_ws( '',',"iddc":','"',old.iddc,'"') else '' END
                                                      ,CASE when old.document_type <> new.document_type OR (old.document_type is NULL XOR new.document_type is NULL) then concat_ws( '',',"document_type":','"',old.document_type,'"') else '' END
                                                      ,CASE when old.blame_user <> new.blame_user OR (old.blame_user is NULL XOR new.blame_user is NULL) then concat_ws( '',',"blame_user":','"',old.blame_user,'"') else '' END
                                                      ,concat_ws( '',',"modified_time":','"',old.modified_time,'"'),'}')
as row_diff)
      as diff;
END $$
DELIMITER ;