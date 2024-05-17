import React from 'react'
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { eq } from 'drizzle-orm';
import { additionalDataTableClient, errands, offers } from '@/schema/schema';
import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { notFound } from 'next/navigation';
import ErrandInfoForHiring from '@/components/hire/ErrandInfoForHiring';

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

    if (errandsInfo.length === 0) {
        notFound();
    }

    const currentErrand = errandsInfo[0];

    if (userUuid != currentErrand.uploaderUuid) {
        notFound();
    }

    const allOffers = await db.select({
        clientUuid: offers.clientUuid,
        price: offers.price,
    })
        .from(offers)
        .where(eq(offers.errandUuid, params.uuid))
        .execute();

    const detailedOffers = await Promise.all(allOffers.map(async offer => {
        const client = await clerkClient.users.getUser(offer.clientUuid);
        const additionalData = await db.select()
            .from(additionalDataTableClient)
            .where(eq(additionalDataTableClient.uploaderUuid, offer.clientUuid))
            .execute();

        return {
            ...offer,
            fullName: `${client.firstName} ${client.lastName}`,
            profileImageUrl: client.imageUrl,
            bio: additionalData[0]?.bio || ''
        };
    }));

    return (
        <div>
            {/* @ts-ignore */}
            <ErrandInfoForHiring errand={currentErrand} offers={detailedOffers} />
        </div>
    )
}

export default Page;
