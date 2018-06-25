CREATE TABLE `dc` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idsupplier` INT NOT NULL,
  `naming_series` VARCHAR(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dc_number` INT NOT NULL,
  `department` INT NOT NULL,
  `dc_date` DATE NOT NULL,
  `rateperkg` FLOAT NULL,
  `additionalvalue` DOUBLE NULL,
  `vehicle_number` VARCHAR(12) NULL,
  `comment` VARCHAR(120) NULL,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `blame_user` VARCHAR(45) NOT NULL,
  `modified_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `dc_number_unique` (`naming_series` ASC, `dc_number` ASC),
  INDEX `fk_dc_1_idx` (`idsupplier` ASC),
  INDEX `fk_dc_2_idx` (`department` ASC),
  CONSTRAINT `fk_dc_1`
    FOREIGN KEY (`idsupplier`)
    REFERENCES `supplier` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_dc_2`
    FOREIGN KEY (`department`)
    REFERENCES `department` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_dc_3`
    FOREIGN KEY (`naming_series`)
    REFERENCES `series` (`name`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);
    


ALTER TABLE `cdcitems` 
ADD COLUMN `iddc` INT NOT NULL AFTER `idcdc`,
ADD COLUMN `lot_number` VARCHAR(45) NULL AFTER `iddc`,
ADD INDEX `fk_cdcitems_2_idx` (`iddc` ASC);


ALTER TABLE `pdcitems` 
ADD COLUMN `iddc` INT NOT NULL AFTER `idpdc`,
ADD COLUMN `lot_number` VARCHAR(45) NULL AFTER `iddc`,
ADD COLUMN `iditem` INT NOT NULL AFTER `lot_number`, 
ADD INDEX `fk_pdcitems_2_idx` (`iddc` ASC),
ADD INDEX `fk_pdcitems_3_idx` (`iditem` ASC);

-- migration
insert into dc(idsupplier, naming_series, dc_number, department, dc_date, rateperkg, additionalvalue, vehicle_number,
 comment, status, blame_user, modified_time)
select idsupplier, naming_series, dc_number, department, dc_date, rateperkg, 0 additionalvalue, vehicle_number,
 comment, status, blame_user, modified_time from cdc
 union all
 select idsupplier, naming_series, dc_number, department, dc_date, rateperkg, additionalvalue, vehicle_number,
 comment, status, blame_user, modified_time from pdc
 order by naming_series, dc_number;

update cdcitems,
(select dc.id id, cdc.id idcdc, cdc.lot_number
from dc, cdc
where dc.naming_series=cdc.naming_series and dc.dc_number=cdc.dc_number) src
set cdcitems.iddc=src.id, cdcitems.lot_number=src.lot_number
where cdcitems.idcdc=src.idcdc;

update pdcitems,
(select dc.id id, pdc.id idpdc, pdc.lot_number, pdc.iditem
from dc, pdc
where dc.naming_series=pdc.naming_series and dc.dc_number=pdc.dc_number) src
set pdcitems.iddc=src.id, pdcitems.lot_number=src.lot_number, pdcitems.iditem=src.iditem
where pdcitems.idpdc=src.idpdc;

-- execution after migration: done

ALTER TABLE `cdcitems` 
ADD CONSTRAINT `fk_cdcitems_2`
  FOREIGN KEY (`iddc`)
  REFERENCES `dc` (`id`)
  ON DELETE RESTRICT
  ON UPDATE CASCADE;


ALTER TABLE `pdcitems` 
ADD CONSTRAINT `fk_pdcitems_2`
  FOREIGN KEY (`iddc`)
  REFERENCES `dc` (`id`)
  ON DELETE RESTRICT
  ON UPDATE CASCADE,
ADD CONSTRAINT `fk_pdcitems_3`
  FOREIGN KEY (`iditem`)
  REFERENCES `iteminfo` (`id`)
  ON DELETE RESTRICT
  ON UPDATE CASCADE;





