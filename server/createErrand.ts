//Copyright (C) 2024  Vladimir Pasev
'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { errands } from '@/schema/schema';
import { eq } from 'drizzle-orm';
//@ts-ignore
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'
import { currentUser } from "@clerk/nextjs/server";

const db = drizzle(sql);

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

async function geocodeLocation(address: any) {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleMapsApiKey}`;

    try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();
        //@ts-ignore
        if (data.results && data.results.length > 0) {
            //@ts-ignore
            const { lat, lng } = data.results[0].geometry.location;
            //console.log("Geocoding result for", address, ":", { lat, lng });
            return { lat, lng };
        } else {
            console.error('No results found for location:', address);
            return null;
        }
    } catch (error) {
        console.error('Error in geocoding:', error);
        return null;
    }
}

export async function createErrand(data: any) {
    // Define a schema for event data validation
    const errandSchema = z.object({
        title: z.string().nonempty(),
        dateTime: z.string().nonempty().refine(
            (dateString) => {
                const date = new Date(dateString);
                return !isNaN(date.getTime()) && date > new Date();
            },
            {
                message: "DateTime must be a valid future date and time.",
            }
        ),
        location: z.string().nonempty(),
        category: z.string().nonempty(),
        subCategory: z.string().nonempty(),
        maxPrice: z.any(),
        description: z.string().nonempty(),
        specialReq: z.string().nonempty(),
    });
    const user = await currentUser();
    const userUuid = user?.id;

    try {
        const validatedData = errandSchema.parse(data);
        const coordinates = await geocodeLocation(validatedData.location);
        // Combine validated data with userUuid
        const eventData = {
            ...validatedData,
            uploaderUuid: userUuid,
            eventCoordinates: coordinates,
            status: 'active',
        };
        //@ts-ignore
        console.log(eventData);
        //@ts-ignore
        const result = await db.insert(errands).values(eventData).execute();
        return { success: true, message: 'Errand created successfully' };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Errand creation failed' };
    }
}
