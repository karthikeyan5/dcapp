DROP TRIGGER IF EXISTS `grn_BEFORE_UPDATE`;

DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `grn_BEFORE_UPDATE` BEFORE UPDATE ON `grn` FOR EACH ROW
BEGIN
  	INSERT INTO history (table_name,primary_id, previous_value, blame_user)
    SELECT 'grn',old.id,diff.row_diff,NEW.blame_user FROM
      (SELECT concat_ws('','{','"id":','"',old.id,'"',CASE when old.idsupplier <> new.idsupplier OR (old.idsupplier is NULL XOR new.idsupplier is NULL) then concat_ws( '',',"idsupplier":','"',old.idsupplier,'"') else '' END
                                                      ,CASE when old.naming_series <> new.naming_series OR (old.naming_series is NULL XOR new.naming_series is NULL) then concat_ws( '',',"naming_series":','"',old.naming_series,'"') else '' END
                                                      ,CASE when old.grn_number <> new.grn_number OR (old.grn_number is NULL XOR new.grn_number is NULL) then concat_ws( '',',"grn_number":','"',old.grn_number,'"') else '' END
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
