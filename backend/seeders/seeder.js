import Database from 'better-sqlite3';

const db = new Database('./database/database.sqlite');

console.log('Seeding database...');

// Delete all existing records (keeps the structure)
db.prepare('DELETE FROM users').run();

// Reset the auto-increment ID counter (optional)
db.prepare("DELETE FROM sqlite_sequence WHERE name='users'").run();

// Insert new data
const insert = db.prepare('INSERT INTO users (name) VALUES (?)');
const insertMany = db.transaction((users) => {
    for (const user of users) insert.run(user);
});

insertMany(['Jean-Mi', 'Remy', 'Charlie', 'Pascal']);

console.log('Seeding complete.');
db.close();
