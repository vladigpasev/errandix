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
  maxPrice: numeric('price', { precision: 10, scale: 2 }),
  uploaderUuid: varchar('uploaderUuid', {length: 100}).notNull(),
  dateTime: varchar('dateTime', {length: 100}).notNull(),
  clicks: numeric('clicks').default('0'),
  offers: numeric('offers').default('0'),
  status: varchar('status', {length: 100}).notNull(),
  //@ts-ignore
  updatedAt: timestamp('updated_at').default(`now()`),
});

export const additionalDataTable = pgTable('additionalDataTable', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').default(`uuid_generate_v4()`).unique(),
  birthDate: varchar('birthDate', {length: 100}).notNull(),
  bio: text('bio').notNull(),
  uploaderUuid: varchar('uploaderUuid', {length: 100}).notNull(),
  //@ts-ignore
  updatedAt: timestamp('updated_at').default(`now()`),
});

export const additionalDataTableClient = pgTable('additionalDataTableClient', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').default(`uuid_generate_v4()`).unique(),
  bio: text('bio').notNull(),
  uploaderUuid: varchar('uploaderUuid', {length: 100}).notNull(),
  //@ts-ignore
  updatedAt: timestamp('updated_at').default(`now()`),
});

export const offers = pgTable('offers', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').default(`uuid_generate_v4()`).unique(),
  clientUuid: varchar('clientUuid', {length: 100}).notNull(),
  errandUuid: varchar('errandUuid', {length: 100}).notNull(),
  price: varchar('price', {length: 100}).notNull(),
  //@ts-ignore
  updatedAt: timestamp('updated_at').default(`now()`),
});