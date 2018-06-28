ALTER TABLE department ADD grn_dept_type ENUM('cloth', 'piece') NOT NULL AFTER `dept_type`;

ALTER TABLE `department` 
CHANGE COLUMN `dept_type` `dept_type` ENUM('cloth', 'piece', 'yarn', 'packed', 'accessory', 'general') NOT NULL ,
CHANGE COLUMN `grn_dept_type` `grn_dept_type` ENUM('cloth', 'piece', 'yarn', 'packed', 'accessory', 'general') NOT NULL ;

UPDATE `department` SET `grn_dept_type`='piece' WHERE `id`='6';
UPDATE `department` SET `grn_dept_type`='piece' WHERE `id`='7';
UPDATE `department` SET `grn_dept_type`='piece' WHERE `id`='8';
UPDATE `department` SET `grn_dept_type`='packed' WHERE `id`='9';
UPDATE `department` SET `grn_dept_type`='packed' WHERE `id`='10';
UPDATE `department` SET `dept_type`='yarn', `grn_dept_type`='cloth' WHERE `id`='11';
UPDATE `department` SET `dept_type`='yarn', `grn_dept_type`='yarn' WHERE `id`='12';
UPDATE `department` SET `grn_dept_type`='packed' WHERE `id`='13';
UPDATE `department` SET `grn_dept_type`='packed' WHERE `id`='14';
UPDATE `department` SET `name`='Rework (piece)', `grn_dept_type`='piece' WHERE `id`='16';

ALTER TABLE `dc` 
CHANGE COLUMN `status` `status` ENUM('active', 'inactive', 'complete') NOT NULL DEFAULT 'active';
