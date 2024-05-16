CREATE TABLE IF NOT EXISTS "additionalDataTableClient" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT 'uuid_generate_v4()',
	"bio" text NOT NULL,
	"uploaderUuid" varchar(100) NOT NULL,
	"updated_at" timestamp DEFAULT 'now()',
	CONSTRAINT "additionalDataTableClient_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "offers" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT 'uuid_generate_v4()',
	"clientUuid" varchar(100) NOT NULL,
	"price" varchar(100) NOT NULL,
	"updated_at" timestamp DEFAULT 'now()',
	CONSTRAINT "offers_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
ALTER TABLE "errands" DROP COLUMN IF EXISTS "eventCoordinates";