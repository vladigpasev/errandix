'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { errands } from '@/schema/schema';
import { eq } from 'drizzle-orm';
import { currentUser } from "@clerk/nextjs/server";
import OpenAI from 'openai';

const db = drizzle(sql);

const openai = new OpenAI({
    organization: "org-aNz8Hs6PinAJZz5FQPF9HbjN",
    apiKey: process.env.OPENAI_API_KEY,
});

export async function updateErrand(data: any) {
    const errandSchema = z.object({
        uuid: z.string().nonempty(),
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
        status: z.string().nonempty(),
    });

    const user = await currentUser();
    const userUuid = user?.id;

    if (!user?.publicMetadata.accountCompleted) {
        if (data.status === 'active') {
            console.log(user?.publicMetadata);
            console.log(data.status);
            return { success: false, message: 'Not authorized to set the status to active' };
        }
    }

    try {
        const validatedData = errandSchema.parse(data);

        const existingErrand = await db.select()
            .from(errands)
            .where(eq(errands.uuid, validatedData.uuid))
            .execute();

        if (existingErrand.length === 0) {
            return { success: false, message: 'Errand not found' };
        }

        const errand = existingErrand[0];
        if (errand.uploaderUuid !== userUuid) {
            return { success: false, message: 'Not authorized to update this errand' };
        }

        const updatedData = {
            title: validatedData.title,
            dateTime: validatedData.dateTime,
            location: validatedData.location,
            category: validatedData.category,
            subCategory: validatedData.subCategory,
            maxPrice: validatedData.maxPrice,
            description: validatedData.description,
            specialReq: validatedData.specialReq,
            status: validatedData.status,
        };

        const fieldsToCheck = ['title', 'category', 'subCategory', 'description', 'specialReq', 'location'];
        //@ts-ignore
        const shouldRunOpenAIValidation = fieldsToCheck.some(field => errand[field] !== updatedData[field]);

        if (shouldRunOpenAIValidation) {
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
                await new Promise(resolve => setTimeout(resolve, 1000));
                isCompleted = await checkRunStatus();
            }

            const messages = await openai.beta.threads.messages.list(thread.id);

            const assistantMessage = messages.data.find(message => message.role === 'assistant');

            if (assistantMessage && assistantMessage.content) {
                //@ts-ignore
                const responseText = assistantMessage.content.map(content => content.text.value).join(' ');
                const responseJSON = JSON.parse(responseText);

                if (responseJSON.success !== true) {
                    return { success: false, message: 'Errand update failed', errorfields: responseJSON.errorfields };
                }
            }
        }

        await db.update(errands)
            .set(updatedData)
            .where(eq(errands.uuid, validatedData.uuid))
            .execute();

        return { success: true, message: 'Errand updated successfully' };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Errand update failed' };
    }
}