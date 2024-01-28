import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  passwordHash: text('passwordHash').notNull(),
  salt: text('salt').notNull()
})

export type User = typeof users.$inferSelect // return type when queried
export type InsertUser = typeof users.$inferInsert // insert type

