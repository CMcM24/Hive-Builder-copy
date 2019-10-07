DROP DATABASE IF EXISTS event_db;

CREATE DATABASE event_db;

USE event_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(75) NOT NULL,
    user_password VARCHAR(20) NOT NULL,
    user_identifier INT(10) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE events (
    id INT AUTO_INCREMENT NOT NULL,
    event_name VARCHAR(250) NOT NULL,
    event_category VARCHAR(50) NOT NULL,
    event_description VARCHAR(2000) NOT NULL,
    event_date,
    event_time,
);

INSERT INTO users (username, user_password, user_identifier) VALUES
("cmac", "password1", 0123456789),
("live", "password2", 9876543210),
("jnun", "password3", 1234554321),
("nveg", "passwrod4", 6789009876),
("jkim", "password5", 2468008642);

INSERT INTO events (event_name, event_category, event_description, event_date, event_time) VALUES
("Hack-a-thon", "Technology", "Fun coding challenges and friends!", 01-01-2020, 12:00),
("Apple Event", "Technology", "Hangout for the new Apple Product Annoucnement!", 02-02-2020, 11:00);
