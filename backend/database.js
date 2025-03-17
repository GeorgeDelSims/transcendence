/*
Keep SQL logic only in models (apart from table creation)
Keep HTTP logic only in controllers
Keep routing only in route files
*/

import fp from 'fastify-plugin'
import Database from 'better-sqlite3'


// create database plugin to be able to control when it's loaded
async function databasePlugin(fastify, options) {
    const db = new Database('/database/database.sqlite')

    // create User table:
    db.prepare(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `).run();
    
    // Create Game table:
    db.prepare(`
        CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            player1_id INTEGER NOT NULL,
            player2_id INTEGER NOT NULL,
            winner_id INTEGER,
            player1_score INTEGER,
            player2_score INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(player1_id) REFERENCES users(id),
            FOREIGN KEY(player2_id) REFERENCES users(id),
            FOREIGN KEY(winner_id) REFERENCES users(id)
        )
    `).run();

    // Create Tournament table:
    db.prepare(`
        CREATE TABLE IF NOT EXISTS tournaments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            created_by INTEGER,
            status TEXT DEFAULT 'upcoming', -- 'upcoming', 'ongoing', 'finished'
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(created_by) REFERENCES users(id)
        )
    `).run();

    // // Create Tournament Players table (link between tournament and players tables)
    // db.prepare(`
    //     CREATE TABLE IF NOT EXISTS tournament_players (
    //         tournament_id INTEGER NOT NULL,
    //         user_id INTEGER NOT NULL,
    //         score INTEGER DEFAULT 0,
    //         joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    //         PRIMARY KEY (tournament_id, user_id),
    //         FOREIGN KEY(tournament_id) REFERENCES tournaments(id),
    //         FOREIGN KEY(user_id) REFERENCES users(id)
    //     )
    // `).run();

    // // Create Friends table:
    // db.prepare(`
    //     CREATE TABLE IF NOT EXISTS friends (
    //         user_id INTEGER NOT NULL,
    //         friend_id INTEGER NOT NULL,
    //         status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'blocked'
    //         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    //         PRIMARY KEY (user_id, friend_id),
    //         FOREIGN KEY(user_id) REFERENCES users(id),
    //         FOREIGN KEY(friend_id) REFERENCES users(id)
    //     )
    // `).run();    

    fastify.decorate('db', db);
}

export default fp(databasePlugin);
