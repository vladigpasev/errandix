CREATE TABLE IF NOT EXISTS "additionalDataTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT 'uuid_generate_v4()',
	"birthDate" varchar(100) NOT NULL,
	"bio" text NOT NULL,
	"uploaderUuid" varchar(100) NOT NULL,
	"updated_at" timestamp DEFAULT 'now()',
	CONSTRAINT "additionalDataTable_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
ALTER TABLE "errands" RENAME COLUMN "userUuid" TO "uploaderUuid";--> statement-breakpoint
ALTER TABLE "errands" ALTER COLUMN "specialReq" DROP NOT NULL;