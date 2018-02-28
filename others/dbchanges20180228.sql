ALTER TABLE supplier MODIFY name VARCHAR(100) NOT NULL;

ALTER TABLE iteminfo
ADD UNIQUE INDEX `index4` (`naming_series` ASC, `uid` ASC);


