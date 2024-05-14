//Copyright (C) 2024  Vladimir Pasev
import { pgTable, serial, varchar, text, uuid, boolean, timestamp, numeric } from 'drizzle-orm/pg-core';

export const errands = pgTable('errands', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').default(`uuid_generate_v4()`).unique(),
  title: text('title').notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  subCategory: varchar('subCategory', { length: 50 }).notNull(),
  description: text('description').notNull(),
  specialReq: text('specialReq'),
  location: varchar('location', {length: 100}).notNull(),
  errandCoordinates: varchar('eventCoordinates', {length: 100}),
  maxPrice: numeric('price', { precision: 10, scale: 2 }),
  uploaderUuid: varchar('userUuid', {length: 100}).notNull(),
  dateTime: varchar('dateTime', {length: 100}).notNull(),
  clicks: numeric('clicks').default('0'),
  offers: numeric('offers').default('0'),
  status: varchar('status', {length: 100}).notNull(),
  //@ts-ignore
  updatedAt: timestamp('updated_at').default(`now()`),
});