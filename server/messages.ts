//Copyright (C) 2024  Vladimir Pasev
'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { errands, messages } from '@/schema/schema';
import { eq } from 'drizzle-orm';
//@ts-ignore
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'
import { currentUser } from "@clerk/nextjs/server";
import OpenAI from 'openai';
import { clerkClient } from "@clerk/nextjs/server";

const db = drizzle(sql);

export async function sendMessage(senderUuid:any, messageText:any, offerId:any) {
    const messageSchema = z.object({
        senderUuid: z.string().nonempty(),
        messageText: z.string().nonempty(),
        offerId: z.string().nonempty(),
    });

    try {
        const validatedData = messageSchema.parse({senderUuid, messageText, offerId});
        const result = await db.insert(messages).values(validatedData).execute();
    } catch (error) {
        console.log(error);
    }
}