import { drizzle } from 'drizzle-orm/better-sqlite3';
import { createInsertSchema, createSelectSchema } from 'drizzle-valibot';
import { parse } from 'valibot'
import { eq } from 'drizzle-orm';
import { users } from '../db/schema';
import * as schema from '../db/schema'
import type { InsertUser, User } from '../db/schema';
import Database from 'better-sqlite3';
// import { checkEmail } from '../db/handlers';
import { dbPath } from '../test';
// console.log(dbPath, 'in db.ts');

export const userDB = new Database(dbPath, {fileMustExist: true});
export const db = drizzle(userDB, {schema});

// export const allUsers: User[] = db.select().from(users).all();


// Schema for inserting a user - can be used to validate API requests
export const insertUserSchema = createInsertSchema(users);

// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(users);

export const insertUser = (user: InsertUser) => {

  try {
    parse(insertUserSchema, user)
    return db.insert(users).values(user).run()
  } catch (error) {
   console.log(error) 
  }
}

// const result = await checkEmail('yemen@wo4k.com')
// console.log(result)
