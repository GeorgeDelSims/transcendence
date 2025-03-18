import Database from 'better-sqlite3';
import fileSystem from 'fs';
import path from 'path';

const db = new Database('./database/database.sqlite');

// Get all SQL migration files sorted by number
const migrationsDir = path.join(process.cwd(), 'migrations');
const migrationFiles = fileSystem.readdirSync(migrationsDir).sort();

for (const file of migrationFiles) {
    const migrationPath = path.join(migrationsDir, file);
    const sql = fileSystem.readFileSync(migrationPath, 'utf8');

    console.log(`Running migration: ${file}`);
    db.exec(sql);
}

console.log('All migrations applied.');
db.close();
