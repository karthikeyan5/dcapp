CREATE TABLE `master_colour` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(90) NOT NULL,
  `desc` VARCHAR(150) NULL,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `blame_user` VARCHAR(45) NOT NULL,
  `modified_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));


CREATE DEFINER = CURRENT_USER TRIGGER `master_colour_BEFORE_UPDATE` BEFORE UPDATE ON `master_colour` FOR EACH ROW
BEGIN
  	INSERT INTO history (table_name,primary_id, previous_value, blame_user)
    SELECT 'master_colour',old.id,diff.row_diff,NEW.blame_user FROM
      (SELECT concat_ws('','{','"id":','"',old.id,'"',CASE when old.name <> new.name OR (old.name is NULL XOR new.name is NULL) then concat_ws( '',',"name":','"',old.name,'"') else '' END
                                                      ,CASE when old.desc <> new.desc OR (old.desc is NULL XOR new.desc is NULL) then concat_ws( '',',"desc":','"',old.desc,'"') else '' END
                                                      ,CASE when old.status <> new.status OR (old.status is NULL XOR new.status is NULL) then concat_ws( '',',"status":','"',old.status,'"') else '' END
                                                      ,CASE when old.blame_user <> new.blame_user OR (old.blame_user is NULL XOR new.blame_user is NULL) then concat_ws( '',',"blame_user":','"',old.blame_user,'"') else '' END
                                                      ,concat_ws( '',',"modified_time":','"',old.modified_time,'"'),'}')
as row_diff)
      as diff;
END;


CREATE TABLE `master_lot` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(90) NOT NULL,
  `desc` VARCHAR(150) NULL,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `blame_user` VARCHAR(45) NOT NULL,
  `modified_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));


CREATE DEFINER = CURRENT_USER TRIGGER `master_lot_BEFORE_UPDATE` BEFORE UPDATE ON `master_lot` FOR EACH ROW
BEGIN
  	INSERT INTO history (table_name,primary_id, previous_value, blame_user)
    SELECT 'master_lot',old.id,diff.row_diff,NEW.blame_user FROM
      (SELECT concat_ws('','{','"id":','"',old.id,'"',CASE when old.name <> new.name OR (old.name is NULL XOR new.name is NULL) then concat_ws( '',',"name":','"',old.name,'"') else '' END
                                                      ,CASE when old.desc <> new.desc OR (old.desc is NULL XOR new.desc is NULL) then concat_ws( '',',"desc":','"',old.desc,'"') else '' END
                                                      ,CASE when old.status <> new.status OR (old.status is NULL XOR new.status is NULL) then concat_ws( '',',"status":','"',old.status,'"') else '' END
                                                      ,CASE when old.blame_user <> new.blame_user OR (old.blame_user is NULL XOR new.blame_user is NULL) then concat_ws( '',',"blame_user":','"',old.blame_user,'"') else '' END
                                                      ,concat_ws( '',',"modified_time":','"',old.modified_time,'"'),'}')
as row_diff)
      as diff;
END;


