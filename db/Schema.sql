CREATE DATABASE readylert_db;
USE readylert_db;

DROP TABLE IF EXISTS profiles;
CREATE TABLE profiles
(
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR (200) NOT NULL,
    description VARCHAR (255) NOT NULL,
    phone VARCHAR (20) NOT NULL,
    address VARCHAR (200) NOT NULL,
    picture VARCHAR (200) NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS rosters;
CREATE TABLE rosters
(
    id int NOT NULL AUTO_INCREMENT,
    created_by int NOT NULL,
    title VARCHAR (200) NOT NULL,
    PRIMARY KEY (id),

    FOREIGN KEY (created_by)
        REFERENCES profiles(id)
        ON DELETE CASCADE
);

DROP TABLE IF EXISTS profiles_rosters;
CREATE TABLE profiles_rosters
(
    id int NOT NULL AUTO_INCREMENT,
    profile_id int NOT NULL,
    roster_id int NOT NULL,
    PRIMARY KEY (id),

    FOREIGN KEY (profile_id)
        REFERENCES profiles(id)
        ON DELETE CASCADE,

    FOREIGN KEY (roster_id)
        REFERENCES rosters(id)
        ON DELETE CASCADE
);
