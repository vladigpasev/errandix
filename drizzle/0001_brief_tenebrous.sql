ALTER TABLE "errands" ADD COLUMN "clicks" numeric DEFAULT '0';--> statement-breakpoint
ALTER TABLE "errands" ADD COLUMN "offers" numeric DEFAULT '0';--> statement-breakpoint
ALTER TABLE "errands" ADD COLUMN "status" varchar(100) NOT NULL;