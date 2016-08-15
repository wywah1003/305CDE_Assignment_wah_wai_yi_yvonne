ALTER TABLE drug_finder.favourite_details
DROP FOREIGN KEY fk_favourite_details;
ALTER TABLE drug_finder.favourite_details
CHANGE COLUMN f_id f_id INT(11) NULL ,
ADD COLUMN description VARCHAR(1000) NULL AFTER created_at;
ALTER TABLE drug_finder.favourite_details
ADD CONSTRAINT fk_favourite_details
FOREIGN KEY (f_id)
REFERENCES drug_finder.favourites (id);

ALTER TABLE drug_finder.favourite_details
DROP FOREIGN KEY fk_favourite_details;
ALTER TABLE drug_finder.favourite_details
DROP INDEX fk_favourite_details ;