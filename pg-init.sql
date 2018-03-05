DROP DATABASE IF EXISTS jaia;
CREATE DATABASE jaia;

\c jaia;

CREATE TABLE items (
	ID SERIAL PRIMARY KEY,
	name VARCHAR,
	make VARCHAR,
	model VARCHAR,
	serial_number VARCHAR,
	description VARCHAR
);

INSERT INTO items (name, make, model, serial_number, description)
	VALUES ('Red Gameboy', 'Nintendo', 'DMG-01', '123456789', 'A play it loud Red Gameboy');