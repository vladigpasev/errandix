'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { additionalDataTable, errands } from '@/schema/schema';
import { currentUser } from "@clerk/nextjs/server";
import OpenAI from 'openai';
import { clerkClient } from "@clerk/nextjs/server";

const db = drizzle(sql);

const openai = new OpenAI({
    organization: "org-aNz8Hs6PinAJZz5FQPF9HbjN",
    apiKey: process.env.OPENAI_API_KEY,
});

export async function completeProfile(data: any) {
    // Define a schema for event data validation
    const errandSchema = z.object({
        birthDate: z.string().nonempty().refine(
            (dateString) => {
                const date = new Date(dateString);
                const age = new Date().getFullYear() - date.getFullYear();
                const isOldEnough = age > 16 || (age === 16 && new Date() >= new Date(date.getFullYear() + 16, date.getMonth(), date.getDate()));
                return !isNaN(date.getTime()) && isOldEnough;
            },
            {
                message: "You must be at least 16 years old.",
            }
        ),
        bio: z.string().nonempty(),
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
                content: "Employer Bio: " + validatedData.bio,
            }
        );

        const run = await openai.beta.threads.runs.create(
            thread.id,
            {
                assistant_id: 'asst_GYTdoXqQz9ES57xmyPVZbcV2'
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
            await new Promise(resolve => setTimeout(resolve, 1000)); // wait for 1 second
            isCompleted = await checkRunStatus();
        }

        const messages = await openai.beta.threads.messages.list(thread.id);

        const assistantMessage = messages.data.find(message => message.role === 'assistant');

        if (assistantMessage && assistantMessage.content) {
            //@ts-ignore
            const responseText = assistantMessage.content.map(content => content.text.value).join(' ');
            const responseJSON = JSON.parse(responseText);
            console.log("Assistant's Response: ", responseJSON);

            if (responseJSON.success != true) {
                return { success: false, message: 'Информацията във въведеното био не е каквато се очаква да бъде. Моля въведете повече информация за себе си и използвайте подходящ език!' };
            } else {

            }

            //return responseText;
        }

        // Combine validated data with userUuid
        let additionalData;
        if (!usermetadata?.accountCompleted) {
            additionalData = {
                ...validatedData,
                //@ts-ignore
                uploaderUuid: userUuid,
            };
        } else {
            additionalData = {
                ...validatedData,
                uploaderUuid: userUuid,
            };
        }

        //@ts-ignore
        const result = await db.insert(additionalDataTable).values(additionalData).execute();
        //@ts-ignore
        await clerkClient.users.updateUserMetadata(userUuid, {
            publicMetadata: {
                accountCompleted: true
            }
        })

        return { success: true, message: 'Errand created successfully' };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Трябва да сте на поне 16 години, за да продължите!' };
    }
}