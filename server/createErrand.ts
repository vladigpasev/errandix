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
import OpenAI from 'openai';
import { clerkClient } from "@clerk/nextjs/server";

const db = drizzle(sql);

const openai = new OpenAI({
    organization: "org-aNz8Hs6PinAJZz5FQPF9HbjN",
    apiKey: process.env.OPENAI_API_KEY,
});

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
        specialReq: z.any(),
    });
    const user = await currentUser();
    const usermetadata = user?.publicMetadata;
    const userUuid = user?.id;

    try {
        const validatedData = errandSchema.parse(data);
        const thread = await openai.beta.threads.create();
        const message = await openai.beta.threads.messages.create(
            thread.id,
            {
                role: "user",
                content: JSON.stringify({
                    title: validatedData.title,
                    category: validatedData.category,
                    sub_category: validatedData.subCategory,
                    description: validatedData.description,
                    special_requirements: validatedData.specialReq,
                    location: validatedData.location,
                })
            }
        );
        console.log(JSON.stringify({
            title: validatedData.title,
            category: validatedData.category,
            sub_category: validatedData.subCategory,
            description: validatedData.description,
            special_requirements: validatedData.specialReq,
            location: validatedData.location,
        }));
        
        const run = await openai.beta.threads.runs.create(
            thread.id,
            {
                assistant_id: 'asst_fZreLzdFmjo9BEApfs6BVjqP'
            }
        );

        const checkRunStatus = async () => {
            try {
                const status = await openai.beta.threads.runs.retrieve(thread.id, run.id);
                return status.status === 'completed';
            } catch (error) {
                console.error("Error checking run status:", error);
                return false;
            }
        };

        let isCompleted = await checkRunStatus();

        while (!isCompleted) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // wait for 2 seconds
            isCompleted = await checkRunStatus();
        }

        const messages = await openai.beta.threads.messages.list(thread.id);

        const assistantMessage = messages.data.find(message => message.role === 'assistant');

        if (assistantMessage && assistantMessage.content) {
            //@ts-ignore

            const responseText = assistantMessage.content.map(content => content.text.value).join(' ');
            const responseJSON = JSON.parse(responseText);
            console.log("Assistant's Response: ", responseJSON);

            if(responseJSON.success != true){
                return { success: false, message: 'Errand creation failed', errorfields: responseJSON.errorfields };
            }else{

            }
            
            //return responseText;
        }

        
        // Combine validated data with userUuid
        let eventData;
        if(!usermetadata?.accountCompleted){
            eventData = {
                ...validatedData,
                uploaderUuid: userUuid,
                status: 'paused',
            };
        }else{
            eventData = {
                ...validatedData,
                uploaderUuid: userUuid,
                status: 'active',
            };
        }
        
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
