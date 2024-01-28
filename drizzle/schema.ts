import { sqliteTable, AnySQLiteColumn, uniqueIndex, integer, text, numeric } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const users = sqliteTable("users", {
	id: integer("id").primaryKey().notNull(),
	email: text("email").notNull(),
	password: text("password").notNull(),
},
(table) => {
	return {
		emailUnique: uniqueIndex("users_email_unique").on(table.email),
	}
});

export const drizzleMigrations = sqliteTable("__drizzle_migrations", {
	id: numeric("id").primaryKey(),
	hash: text("hash").notNull(),
	createdAt: numeric("created_at"),
});