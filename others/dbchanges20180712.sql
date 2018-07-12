CREATE TABLE `pcdcitems` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `iddc` INT NOT NULL,
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
  INDEX `fk_pcdcitems_1_idx` (`iddc` ASC),
  INDEX `fk_pcdcitems_2_idx` (`iditem` ASC),
  CONSTRAINT `fk_pcdcitems_1`
    FOREIGN KEY (`iddc`)
    REFERENCES `dc` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_pcdcitems_2`
    FOREIGN KEY (`iditem`)
    REFERENCES `iteminfo` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `pcdcitems_BEFORE_UPDATE` BEFORE UPDATE ON `pcdcitems` FOR EACH ROW
BEGIN
  	INSERT INTO history (table_name,primary_id, previous_value, blame_user)
    SELECT 'pcdcitems',old.id,diff.row_diff,NEW.blame_user FROM
      (SELECT concat_ws('','{','"id":','"',old.id,'"',CASE when old.iddc <> new.iddc OR (old.iddc is NULL XOR new.iddc is NULL) then concat_ws( '',',"iddc":','"',old.iddc,'"') else '' END
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



CREATE TABLE `adcitems` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `iddc` INT NOT NULL,
  `lot_number` VARCHAR(45) NULL,
  `lot_index` INT NOT NULL DEFAULT '0',
  `iditem` INT NOT NULL,
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
  INDEX `fk_adcitems_1_idx` (`iddc` ASC),
  INDEX `fk_adcitems_2_idx` (`iditem` ASC),
  CONSTRAINT `fk_adcitems_1`
    FOREIGN KEY (`iddc`)
    REFERENCES `dc` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_adcitems_2`
    FOREIGN KEY (`iditem`)
    REFERENCES `iteminfo` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `adcitems_BEFORE_UPDATE` BEFORE UPDATE ON `adcitems` FOR EACH ROW
BEGIN
  	INSERT INTO history (table_name,primary_id, previous_value, blame_user)
    SELECT 'pdcitems',old.id,diff.row_diff,NEW.blame_user FROM
      (SELECT concat_ws('','{','"id":','"',old.id,'"',CASE when old.iddc <> new.iddc OR (old.iddc is NULL XOR new.iddc is NULL) then concat_ws( '',',"iddc":','"',old.iddc,'"') else '' END
                                                      ,CASE when old.lot_number <> new.lot_number OR (old.lot_number is NULL XOR new.lot_number is NULL) then concat_ws( '',',"lot_number":','"',old.lot_number,'"') else '' END
                                                      ,CASE when old.lot_index <> new.lot_index OR (old.lot_index is NULL XOR new.lot_index is NULL) then concat_ws( '',',"lot_index":','"',old.lot_index,'"') else '' END
                                                      ,CASE when old.iditem <> new.iditem OR (old.iditem is NULL XOR new.iditem is NULL) then concat_ws( '',',"iditem":','"',old.iditem,'"') else '' END
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

