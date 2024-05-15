import React from 'react'
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { eq } from 'drizzle-orm';
import { errands } from '@/schema/schema';
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from 'next/navigation';
import ErrandInfo from '@/components/hire/ErrandInfo';

const db = drizzle(sql);

const isValidUUID = (uuid: any) => {
    const regexExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regexExp.test(uuid);
}

async function Page({ params }: { params: { uuid: string } }) {
    if (!isValidUUID(params.uuid)) {
        notFound();
        return;
    }

    const user = await currentUser();
    const usermetadata = user?.publicMetadata;
    const userUuid = user?.id;

    const errandsInfo = await db.select({
        uuid: errands.uuid,
        title: errands.title,
        category: errands.category,
        subCategory: errands.subCategory,
        description: errands.description,
        specialReq: errands.specialReq,
        location: errands.location,
        maxPrice: errands.maxPrice,
        dateTime: errands.dateTime,
        clicks: errands.clicks,
        offers: errands.offers,
        status: errands.status,
        uploaderUuid: errands.uploaderUuid,
    })
        .from(errands)
        .where(eq(errands.uuid, params.uuid))
        .execute();

    if (errandsInfo.length > 0) {
        // There are results
    } else {
        notFound();
    }

    const currentErrand = errandsInfo[0];

    if (userUuid != currentErrand.uploaderUuid) {
        notFound();
    }

    return (
        <div>
            <ErrandInfo errand={currentErrand} />
        </div>
    )
}

export default Page
