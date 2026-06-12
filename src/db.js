import {DatabaseSync} from 'node:sqlite';
const db = new DatabaseSync(':memory:');

db.exec(`
       CREATE TABLE users(
            userId INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
       )
`);

db.exec(`
      CREATE TABLE todu(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER UNIQUE,           
            task TEXT,
            completed BOOLEAN DEFAULT 0,
            FOREIGN KEY(userId) REFERENCES users(userId)
      )
`)

export default db;