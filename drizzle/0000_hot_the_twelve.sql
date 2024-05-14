CREATE TABLE IF NOT EXISTS "errands" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT 'uuid_generate_v4()',
	"title" text NOT NULL,
	"category" varchar(50) NOT NULL,
	"description" text NOT NULL,
	"specialReq" text NOT NULL,
	"location" varchar(100) NOT NULL,
	"eventCoordinates" varchar(100),
	"price" numeric(10, 2),
	"userUuid" varchar(100) NOT NULL,
	"dateTime" varchar(100) NOT NULL,
	"updated_at" timestamp DEFAULT 'now()',
	CONSTRAINT "errands_uuid_unique" UNIQUE("uuid")
);
