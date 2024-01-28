import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  email: text('email').notNull(),
  password: text('password').notNull()
})

export type User = typeof users.$inferSelect // return type when queried
export type InsertUser = typeof users.$inferInsert // insert type

