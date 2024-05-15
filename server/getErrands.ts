// Server-side action
"use server";
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { eq } from 'drizzle-orm';
import { errands } from '@/schema/schema';
import { currentUser } from "@clerk/nextjs/server";

const db = drizzle(sql);

export async function getErrands() {
    const user = await currentUser();
    const userUuid = user?.id;

    if (!userUuid) {
        return [];
    }

    const errandsInfo = await db.select({
        uuid: errands.uuid,
        title: errands.title,
        clicks: errands.clicks,
        offers: errands.offers,
        status: errands.status,
    })
    .from(errands)
    .where(eq(errands.uploaderUuid, userUuid))
    .execute();

    return errandsInfo;
}
