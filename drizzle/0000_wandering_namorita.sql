CREATE TABLE `beta_signups` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`whatsapp` text NOT NULL,
	`consent` integer NOT NULL,
	`consent_at` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`status` text DEFAULT 'waiting' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `beta_signups_email_unique` ON `beta_signups` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `beta_signups_whatsapp_unique` ON `beta_signups` (`whatsapp`);