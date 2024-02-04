import { drizzle } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm';
import { users } from '../db/schema';
import * as schema from '../db/schema'
import type { InsertUser, User } from '../db/schema';
import Database from 'better-sqlite3';
import { checkEmail } from '../db/handlers';
import { dbPath } from '../test';
const databasePath = String(process.env.SQLITE_DATABASE)
console.log(dbPath, 'in db.ts');

export const userDB = new Database(dbPath, {fileMustExist: true});
export const db = drizzle(userDB, {schema});

const allUsers: User[] = db.select().from(users).all();

export const insertUser = (user: InsertUser) => {
  return db.insert(users).values(user).run()
}

const result = await checkEmail('yemen@wo4k.com')
console.log(result)
