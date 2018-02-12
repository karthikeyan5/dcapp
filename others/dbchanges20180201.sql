CREATE TABLE `department` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(90) NOT NULL,
  `desc` VARCHAR(150) NULL,
  `blame_user` VARCHAR(45) NOT NULL,
  `modified_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));



CREATE TABLE `supplier` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `address1` VARCHAR(100) NULL DEFAULT NULL,
  `address2` VARCHAR(100) NULL DEFAULT NULL,
  `city` VARCHAR(45) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `pincode` VARCHAR(6) NULL DEFAULT NULL,
  `phone1` VARCHAR(15) NULL DEFAULT NULL,
  `phone2` VARCHAR(15) NULL DEFAULT NULL,
  `gstin` VARCHAR(15) NULL DEFAULT NULL,
  `email` VARCHAR(50) NULL DEFAULT NULL,
  `otherdetails` VARCHAR(150) NULL DEFAULT NULL,
  `blame_user` VARCHAR(45) NOT NULL,
  `modified_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));




CREATE TABLE `supplierdepartment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `iddept` INT NOT NULL,
  `idsup` INT NOT NULL,
  `blame_user` VARCHAR(45) NOT NULL,
  `modified_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_supplierdepartment_1_idx` (`iddept` ASC),
  INDEX `fk_supplierdepartment_2_idx` (`idsup` ASC),
  UNIQUE INDEX `supplierdepartment_unique` (`iddept` ASC, `idsup` ASC),
  CONSTRAINT `fk_supplierdepartment_1`
    FOREIGN KEY (`iddept`)
    REFERENCES `department` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_supplierdepartment_2`
    FOREIGN KEY (`idsup`)
    REFERENCES `supplier` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);



CREATE TABLE history
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    table_name VARCHAR(60) NOT NULL,
    primary_id INT,
    previous_value LONGTEXT,
    blame_user VARCHAR(45),
    creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);





CREATE DEFINER = CURRENT_USER TRIGGER `supplier_BEFORE_UPDATE` BEFORE UPDATE ON `supplier` FOR EACH ROW
BEGIN
	INSERT INTO history (table_name,primary_id, previous_value, blame_user)
    SELECT 'supplier',old.id,diff.row_diff,NEW.blame_user FROM
      (SELECT concat_ws('','{','"id":','"',old.id,'"',CASE when old.name <> new.name OR (old.name is NULL XOR new.name is NULL) then concat_ws( '',',"name":','"',old.name,'"') else '' END
                                                      ,CASE when old.address1 <> new.address1 OR (old.address1 is NULL XOR new.address1 is NULL) then concat_ws( '',',"address1":','"',old.address1,'"') else '' END
                                                      ,CASE when old.address2 <> new.address2 OR (old.address2 is NULL XOR new.address2 is NULL) then concat_ws( '',',"address2":','"',old.address2,'"') else '' END
                                                      ,CASE when old.city <> new.city OR (old.city is NULL XOR new.city is NULL) then concat_ws( '',',"city":','"',old.city,'"') else '' END
                                                      ,CASE when old.state <> new.state OR (old.state is NULL XOR new.state is NULL) then concat_ws( '',',"state":','"',old.state,'"') else '' END
                                                      ,CASE when old.pincode <> new.pincode OR (old.pincode is NULL XOR new.pincode is NULL) then concat_ws( '',',"pincode":','"',old.pincode,'"') else '' END
                                                      ,CASE when old.phone1 <> new.phone1 OR (old.phone1 is NULL XOR new.phone1 is NULL) then concat_ws('',',"phone1":','"',old.phone1,'"') else '' END
                                                      ,CASE when old.phone2 <> new.phone2 OR (old.phone2 is NULL XOR new.phone2 is NULL) then concat_ws( '',',"phone2":','"',old.phone2,'"') else '' END
                                                      ,CASE when old.gstin <> new.gstin OR (old.gstin is NULL XOR new.gstin is NULL) then concat_ws( '',',"gstin":','"',old.gstin,'"') else '' END
                                                      ,CASE when old.email <> new.email OR (old.email is NULL XOR new.email is NULL) then concat_ws( '',',"email":','"',old.email,'"') else '' END
                                                      ,CASE when old.otherdetails <> new.otherdetails OR (old.otherdetails is NULL XOR new.otherdetails is NULL) then concat_ws( '',',"otherdetails":','"',old.otherdetails,'"') else '' END
                                                      ,CASE when old.blame_user <> new.blame_user OR (old.blame_user is NULL XOR new.blame_user is NULL) then concat_ws( '',',"blame_user":','"',old.blame_user,'"') else '' END
                                                      ,concat_ws( '',',"modified_time":','"',old.modified_time,'"'),'}')
as row_diff)
      as diff;
END;



CREATE DEFINER = CURRENT_USER TRIGGER `supplierdepartment_BEFORE_DELETE` BEFORE DELETE ON `supplierdepartment` FOR EACH ROW
BEGIN
  INSERT INTO history (table_name,primary_id, previous_value, blame_user)
    SELECT 'supplierdepartment',old.idsup,diff.row_diff,'NA' FROM
       (SELECT concat_ws('','{','"id":','"',old.id,'"',concat_ws( '',',"iddept":','"',old.iddept,'"')
                                                      ,concat_ws( '',',"idsup":','"',old.idsup,'"')
                                                      ,concat_ws( '',',"blame_user":','"',old.blame_user,'"')
                                                      ,concat_ws( '',',"modified_time":','"',old.modified_time,'"'),'}')
as row_diff)
      as diff;
END;












