ALTER TABLE dc ADD COLUMN locationId INT NOT NULL DEFAULT 1 AFTER comment;

ALTER TABLE grn ADD COLUMN locationId INT NOT NULL DEFAULT 1 AFTER comment;
