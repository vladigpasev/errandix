import React from 'react';
import ChatClient from './chat';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { and, eq } from 'drizzle-orm';
import { errands, offers } from '@/schema/schema';
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { notFound } from 'next/navigation';

const db = drizzle(sql);

async function Page({ params }: { params: { mode: string, offerId: string } }) {
  console.log('Page component initialized with params:', params);

  const isValidUUID = (uuid: any) => {
    const regexExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regexExp.test(uuid);
  }
  
  if (!isValidUUID(params.offerId)) {
    console.log('Invalid UUID:', params.offerId);
    notFound();
    return;
  }
  
  console.log('Valid UUID:', params.offerId);
  
  const user = await currentUser();
  console.log('Current user:', user);

  const userUuid = user?.id;

  const allOffers = await db.select({
    uuid: offers.uuid,
    clientUuid: offers.clientUuid,
    errandUuid: offers.errandUuid,
    price: offers.price,
  })
    .from(offers)
    .where(and(
      eq(offers.uuid, params.offerId),
    ))
    .execute();
  
  console.log('All offers for offerId:', params.offerId, allOffers);

  if (allOffers.length === 0) {
    console.log('No offers found for offerId:', params.offerId);
    notFound();
    return;
  }

  const currentOffer = allOffers[0];
  console.log('Current offer:', currentOffer);

  let senderName;
  let senderProfileImage;

  if (currentOffer.clientUuid === userUuid) {
    console.log('Client UUID matches current user UUID:', userUuid);
    const clientInfo = await clerkClient.users.getUser(userUuid);
    console.log('Client info:', clientInfo);
    senderName = clientInfo.fullName;
    senderProfileImage = clientInfo.imageUrl;
  } else {
    console.log('Client UUID does not match current user UUID:', userUuid);
    const errandsInfo = await db.select({
      uploaderUuid: errands.uploaderUuid,
    })
      .from(errands)
      .where(eq(errands.uuid, currentOffer.errandUuid))
      .execute();
    console.log('Errands info for errandUuid:', currentOffer.errandUuid, errandsInfo);

    const currentErrand = errandsInfo[0];
    const employerUuid = currentErrand.uploaderUuid;

    if (employerUuid !== userUuid) {
      console.log('Employer UUID does not match current user UUID:', userUuid);
      notFound();
      return;
    }

    const clientInfo = await clerkClient.users.getUser(employerUuid);
    console.log('Client info for employerUuid:', employerUuid, clientInfo);
    senderName = clientInfo.fullName;
    senderProfileImage = clientInfo.imageUrl;
  }

  console.log('Sender name:', senderName);
  console.log('Sender profile image:', senderProfileImage);

  return (
    <div>
      <ChatClient 
        mode={params.mode} 
        offerId={params.offerId} 
        //@ts-ignore
        senderName={senderName} 
        senderProfileImage={senderProfileImage} 
      />
    </div>
  );
}

export default Page;
