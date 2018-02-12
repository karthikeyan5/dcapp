CREATE TABLE `series` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `desc` VARCHAR(120) NULL,
  `last_serial` INT NOT NULL DEFAULT 0,
  `length` INT NOT NULL DEFAULT 0,
  `modified_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC));




CREATE TABLE `cdc` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idsupplier` INT NOT NULL,
  `naming_series` VARCHAR(45) NOT NULL,
  `dc_number` INT NOT NULL,
  `department` INT NOT NULL,
  `dc_date` DATE NOT NULL,
  `lot_number` VARCHAR(45) NULL,
  `rateperkg` VARCHAR(45) NULL,
  `vehicle_number` VARCHAR(12) NULL,
  `comment` VARCHAR(120) NULL,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `blame_user` VARCHAR(45) NOT NULL,
  `modified_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `cdc_number_unique` (`naming_series` ASC, `dc_number` ASC),
  INDEX `fk_cdc_1_idx` (`idsupplier` ASC),
  INDEX `fk_cdc_2_idx` (`department` ASC),
  CONSTRAINT `fk_cdc_1`
    FOREIGN KEY (`idsupplier`)
    REFERENCES `supplier` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_cdc_2`
    FOREIGN KEY (`department`)
    REFERENCES `department` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_cdc_3`
    FOREIGN KEY (`naming_series`)
    REFERENCES `series` (`name`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);



CREATE TABLE `cdcitems` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idcdc` INT NOT NULL,
  `colour` VARCHAR(45) NULL,
  `cdc_colour_index` INT NOT NULL,
  `dia` INT NULL,
  `roll` INT NULL,
  `weight` FLOAT NOT NULL,
  `comment` VARCHAR(120) NULL,
  `blame_user` VARCHAR(45) NOT NULL,
  `modified_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_cdcitems_1_idx` (`idcdc` ASC),
  CONSTRAINT `fk_cdcitems_1`
    FOREIGN KEY (`idcdc`)
    REFERENCES `cdc` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);



CREATE DEFINER = CURRENT_USER TRIGGER `cdc_BEFORE_INSERT` BEFORE INSERT ON `cdc` FOR EACH ROW
BEGIN
  INSERT INTO series (name,`desc`,last_serial) VALUES (NEW.naming_series,'added from trigger',1)
  ON DUPLICATE KEY UPDATE last_serial = last_serial + 1;
  SET NEW.dc_number = (SELECT last_serial FROM series WHERE name = NEW.naming_series);
END;



CREATE DEFINER = CURRENT_USER TRIGGER `cdc_BEFORE_UPDATE` BEFORE UPDATE ON `cdc` FOR EACH ROW
BEGIN
  	INSERT INTO history (table_name,primary_id, previous_value, blame_user)
    SELECT 'cdc',old.id,diff.row_diff,NEW.blame_user FROM
      (SELECT concat_ws('','{','"id":','"',old.id,'"',CASE when old.idsupplier <> new.idsupplier OR (old.idsupplier is NULL XOR new.idsupplier is NULL) then concat_ws( '',',"idsupplier":','"',old.idsupplier,'"') else '' END
                                                      ,CASE when old.naming_series <> new.naming_series OR (old.naming_series is NULL XOR new.naming_series is NULL) then concat_ws( '',',"naming_series":','"',old.naming_series,'"') else '' END
                                                      ,CASE when old.dc_number <> new.dc_number OR (old.dc_number is NULL XOR new.dc_number is NULL) then concat_ws( '',',"dc_number":','"',old.dc_number,'"') else '' END
                                                      ,CASE when old.department <> new.department OR (old.department is NULL XOR new.department is NULL) then concat_ws( '',',"department":','"',old.department,'"') else '' END
                                                      ,CASE when old.dc_date <> new.dc_date OR (old.dc_date is NULL XOR new.dc_date is NULL) then concat_ws( '',',"dc_date":','"',old.dc_date,'"') else '' END
                                                      ,CASE when old.lot_number <> new.lot_number OR (old.lot_number is NULL XOR new.lot_number is NULL) then concat_ws( '',',"lot_number":','"',old.lot_number,'"') else '' END
                                                      ,CASE when old.rateperkg <> new.rateperkg OR (old.rateperkg is NULL XOR new.rateperkg is NULL) then concat_ws('',',"rateperkg":','"',old.rateperkg,'"') else '' END
                                                      ,CASE when old.vehicle_number <> new.vehicle_number OR (old.vehicle_number is NULL XOR new.vehicle_number is NULL) then concat_ws( '',',"vehicle_number":','"',old.vehicle_number,'"') else '' END
                                                      ,CASE when old.comment <> new.comment OR (old.comment is NULL XOR new.comment is NULL) then concat_ws( '',',"comment":','"',old.comment,'"') else '' END
                                                      ,CASE when old.status <> new.status OR (old.status is NULL XOR new.status is NULL) then concat_ws( '',',"status":','"',old.status,'"') else '' END
                                                      ,CASE when old.blame_user <> new.blame_user OR (old.blame_user is NULL XOR new.blame_user is NULL) then concat_ws( '',',"blame_user":','"',old.blame_user,'"') else '' END
                                                      ,concat_ws( '',',"modified_time":','"',old.modified_time,'"'),'}')
as row_diff)
      as diff;
END;



CREATE DEFINER = CURRENT_USER TRIGGER `cdcitems_BEFORE_UPDATE` BEFORE UPDATE ON `cdcitems` FOR EACH ROW
BEGIN
  	INSERT INTO history (table_name,primary_id, previous_value, blame_user)
    SELECT 'cdcitems',old.id,diff.row_diff,NEW.blame_user FROM
      (SELECT concat_ws('','{','"id":','"',old.id,'"',CASE when old.idcdc <> new.idcdc OR (old.idcdc is NULL XOR new.idcdc is NULL) then concat_ws( '',',"idcdc":','"',old.idcdc,'"') else '' END
                                                      ,CASE when old.colour <> new.colour OR (old.colour is NULL XOR new.colour is NULL) then concat_ws( '',',"colour":','"',old.colour,'"') else '' END
                                                      ,CASE when old.cdc_colour_index <> new.cdc_colour_index OR (old.cdc_colour_index is NULL XOR new.cdc_colour_index is NULL) then concat_ws( '',',"cdc_colour_index":','"',old.cdc_colour_index,'"') else '' END
                                                      ,CASE when old.dia <> new.dia OR (old.dia is NULL XOR new.dia is NULL) then concat_ws( '',',"dia":','"',old.dia,'"') else '' END
                                                      ,CASE when old.roll <> new.roll OR (old.roll is NULL XOR new.roll is NULL) then concat_ws( '',',"roll":','"',old.roll,'"') else '' END
                                                      ,CASE when old.weight <> new.weight OR (old.weight is NULL XOR new.weight is NULL) then concat_ws( '',',"weight":','"',old.weight,'"') else '' END
                                                      ,CASE when old.comment <> new.comment OR (old.comment is NULL XOR new.comment is NULL) then concat_ws( '',',"comment":','"',old.comment,'"') else '' END
                                                      ,CASE when old.blame_user <> new.blame_user OR (old.blame_user is NULL XOR new.blame_user is NULL) then concat_ws( '',',"blame_user":','"',old.blame_user,'"') else '' END
                                                      ,concat_ws( '',',"modified_time":','"',old.modified_time,'"'),'}')
as row_diff)
      as diff;
END;


ALTER TABLE series ALTER COLUMN length SET DEFAULT 5;




