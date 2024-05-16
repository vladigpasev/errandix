// Server-side action
"use server";
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { eq } from 'drizzle-orm';
import { errands } from '@/schema/schema';

const db = drizzle(sql);

export async function getAllErrands() {

    const errandsInfo = await db.select({
        uuid: errands.uuid,
        title: errands.title,
        description: errands.description,
        specialReq: errands.specialReq,
        category: errands.category,
        subCategory: errands.subCategory,
        date: errands.dateTime,
        clicks: errands.clicks,
        offers: errands.offers,
        status: errands.status,
    })
    .from(errands)
    .where(eq(errands.status, 'active'))
    .execute();

    return errandsInfo;
}
