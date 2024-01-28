ALTER TABLE `users` RENAME COLUMN `password` TO `passwordHash`;--> statement-breakpoint
ALTER TABLE users ADD `salt` text NOT NULL;