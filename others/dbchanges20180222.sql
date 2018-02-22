ALTER TABLE department ADD dept_type ENUM('cloth', 'piece') NOT NULL;
ALTER TABLE department
  MODIFY COLUMN dept_type ENUM('cloth', 'piece') NOT NULL AFTER `desc`;

