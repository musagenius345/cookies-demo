import { drizzle } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm';
import { users } from '../db/schema';
import * as schema from '../db/schema'
import type { InsertUser, User } from '../db/schema';
import Database from 'better-sqlite3';

export const userDB = new Database('./users.db');
export const db = drizzle(userDB, {schema});

const allUsers: User[] = db.select().from(users).all();

export const insertUser = (user: InsertUser) => {
  return db.insert(users).values(user).run()
}

export const emailExists = (email) => {
  return db.query.users.findFirst({
    where: eq(users.email, email)
  })
}
