const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool();

const clearDB = async () => {
  await pool.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
};
const setupDBSchema = async () => {
  await pool.query(`
    DROP SCHEMA public CASCADE; CREATE SCHEMA public;
    CREATE TABLE users (
        email VARCHAR(50) NOT NULL,
        name VARCHAR(50) NOT NULL,
        password VARCHAR(500) NOT NULL,
        PRIMARY KEY (email)
    );
    create table children (
        child_name VARCHAR(50) NOT NULL, 
        email VARCHAR(50) NOT NULL,
        date_added DATE DEFAULT NOW(),
        PRIMARY KEY (child_name, email),
        CONSTRAINT fk_email
          FOREIGN KEY(email)
            REFERENCES users(email)
              ON DELETE CASCADE
    );
    create table game_scores (
        game_name VARCHAR(50) NOT NULL,
        game_score INT NOT NULL,
        date_attempt TIMESTAMP NOT NULL,
        email VARCHAR(50) NOT NULL,
        child_name VARCHAR(50) NOT NULL,
        CONSTRAINT fk_email
          FOREIGN KEY(email)
            REFERENCES users(email)
              ON DELETE CASCADE
    );
    `);
  await pool.query(`
        INSERT INTO users VALUES ('a@gmail.com', 'a', '$2b$10$AoBxR9VTIVNampqIuEF6NeaB/OF.j5VLvMoWaDEkuZ6KPpav8.YtO');
        INSERT INTO users VALUES ('b@gmail.com', 'b', '$2b$10$AoBxR9VTIVNampqIuEF6NeaB/OF.j5VLvMoWaDEkuZ6KPpav8.YtO');
        INSERT INTO users VALUES ('c@gmail.com', 'c', '$2b$10$AoBxR9VTIVNampqIuEF6NeaB/OF.j5VLvMoWaDEkuZ6KPpav8.YtO');
        INSERT INTO users VALUES ('d@gmail.com', 'd', '$2b$10$AoBxR9VTIVNampqIuEF6NeaB/OF.j5VLvMoWaDEkuZ6KPpav8.YtO');
        INSERT INTO users VALUES ('e@gmail.com', 'e', '$2b$10$AoBxR9VTIVNampqIuEF6NeaB/OF.j5VLvMoWaDEkuZ6KPpav8.YtO');

        INSERT INTO children VALUES ('emily', 'a@gmail.com');
        INSERT INTO children VALUES ('joan', 'a@gmail.com');
        INSERT INTO children VALUES ('matt', 'a@gmail.com');
        INSERT INTO children VALUES ('sam', 'c@gmail.com');
        INSERT INTO children VALUES ('sarah', 'c@gmail.com');
        INSERT INTO children VALUES ('anna', 'd@gmail.com');
        INSERT INTO children VALUES ('susy', 'd@gmail.com');

        INSERT INTO game_scores (game_name,game_score,email,child_name, date_attempt) VALUES ('Nouns', 60, 'a@gmail.com', 'emily', NOW());
        INSERT INTO game_scores (game_name,game_score,email,child_name, date_attempt) VALUES ('Nouns', 50, 'a@gmail.com', 'joan', NOW());
        INSERT INTO game_scores (game_name,game_score,email,child_name, date_attempt) VALUES ('Nouns', 40, 'a@gmail.com', 'matt', NOW());
        INSERT INTO game_scores (game_name,game_score,email,child_name, date_attempt) VALUES ('Adjectives', 60, 'c@gmail.com', 'sam', NOW());
        INSERT INTO game_scores (game_name,game_score,email,child_name, date_attempt) VALUES ('Adjectives', 70, 'c@gmail.com', 'sam', NOW());
        INSERT INTO game_scores (game_name,game_score,email,child_name, date_attempt) VALUES ('Verbs', 80, 'c@gmail.com', 'anna', NOW());
        INSERT INTO game_scores (game_name,game_score,email,child_name, date_attempt) VALUES ('Verbs', 30, 'd@gmail.com', 'anna', NOW());
        INSERT INTO game_scores (game_name,game_score,email,child_name, date_attempt) VALUES ('Verbs', 30, 'd@gmail.com', 'susy', NOW());
        INSERT INTO game_scores (game_name,game_score,email,child_name, date_attempt) VALUES ('Verbs', 35, 'd@gmail.com', 'susy', NOW());
        INSERT INTO game_scores (game_name,game_score,email,child_name, date_attempt) VALUES ('Verbs', 30, 'd@gmail.com', 'anna', NOW());
        INSERT INTO game_scores (game_name,game_score,email,child_name, date_attempt) VALUES ('Nouns', 40, 'd@gmail.com', 'susy', NOW());
        INSERT INTO game_scores (game_name,game_score,email,child_name, date_attempt) VALUES ('Nouns', 80, 'd@gmail.com', 'anna', NOW());
        INSERT INTO game_scores (game_name,game_score,email,child_name, date_attempt) VALUES ('Adjectives', 30, 'd@gmail.com', 'susy', NOW());
        INSERT INTO game_scores (game_name,game_score,email,child_name, date_attempt) VALUES ('Adjectives', 40, 'd@gmail.com', 'anna', NOW());
        INSERT INTO game_scores (game_name,game_score,email,child_name, date_attempt) VALUES ('Adjectives', 45, 'd@gmail.com', 'susy', NOW());
        INSERT INTO game_scores (game_name,game_score,email,child_name, date_attempt) VALUES ('Adjectives', 20, 'd@gmail.com', 'anna', NOW());
        INSERT INTO game_scores (game_name,game_score,email,child_name, date_attempt) VALUES ('Adjectives', 60, 'd@gmail.com', 'susy', NOW());
        INSERT INTO game_scores (game_name,game_score,email,child_name, date_attempt) VALUES ('Nouns', 40, 'd@gmail.com', 'anna', NOW());
        INSERT INTO game_scores (game_name,game_score,email,child_name, date_attempt) VALUES ('Nouns', 50, 'd@gmail.com', 'susy', NOW());
        INSERT INTO game_scores (game_name,game_score,email,child_name, date_attempt) VALUES ('Nouns', 10, 'd@gmail.com', 'anna', NOW());
    `);
};
//clearDB()
setupDBSchema();

module.exports = setupDBSchema
