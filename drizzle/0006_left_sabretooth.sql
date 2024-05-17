CREATE TABLE IF NOT EXISTS "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"offer_id" uuid NOT NULL,
	"senderUuid" varchar(100) NOT NULL,
	"messageText" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT 'now()'
);
