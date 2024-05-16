'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { additionalDataTableClient, offers } from '@/schema/schema';
import { currentUser } from "@clerk/nextjs/server";
import OpenAI from 'openai';
import { clerkClient } from "@clerk/nextjs/server";
import { eq } from 'drizzle-orm';

const db = drizzle(sql);

const openai = new OpenAI({
    organization: "org-aNz8Hs6PinAJZz5FQPF9HbjN",
    apiKey: process.env.OPENAI_API_KEY,
});

export async function apply(data: any) {
    console.log('Starting apply function');

    const errandSchema = z.object({
        price: z.any(),
        bio: z.string().nonempty(),
        errandUuid: z.string().nonempty(),
    });

    console.log('Fetching current user');
    const user = await currentUser();
    const usermetadata = user?.publicMetadata;
    const userUuid = user?.id;

    try {
        console.log('Validating input data');
        const validatedData = errandSchema.parse(data);

        console.log('Checking the number of applications');
        const existingApplications = await db
            .select()
            .from(offers)
            //@ts-ignore
            .where(eq(offers.clientUuid, userUuid))
            .execute();

        const numberOfApplications = existingApplications.length;

        if (numberOfApplications >= 3) {
            console.log('User has reached the maximum number of applications');
            return { success: false, message: 'Не е разрешено да кандидатстваш повече от 3 пъти! Моля изчакай отговор от работодателя!' };
        }

        let bioNeedsValidation = true;

        if (usermetadata?.accountCompletedClient) {
            console.log('Checking if bio has changed for completed account');
            const existingData = await db
                .select({ bio: additionalDataTableClient.bio })
                .from(additionalDataTableClient)
                //@ts-ignore
                .where(eq(additionalDataTableClient.uploaderUuid, userUuid))
                .execute();

            if (existingData.length > 0 && existingData[0].bio === validatedData.bio) {
                console.log('Bio has not changed');
                bioNeedsValidation = false;
            }
        }

        if (bioNeedsValidation) {
            console.log('Bio needs validation, creating OpenAI thread');
            const thread = await openai.beta.threads.create();
            await openai.beta.threads.messages.create(thread.id, {
                role: "user",
                content: "Employer Bio: " + validatedData.bio,
            });

            console.log('Starting OpenAI thread run');
            const run = await openai.beta.threads.runs.create(thread.id, {
                assistant_id: 'asst_N1GcAdeBYUpDxZukBIvTgtFL'
            });

            const checkRunStatus = async () => {
                try {
                    const status = await openai.beta.threads.runs.retrieve(thread.id, run.id);
                    console.log('Run status:', status.status);
                    return status.status === 'completed';
                } catch (error) {
                    console.error("Error checking run status:", error);
                    return false;
                }
            };

            let isCompleted = await checkRunStatus();

            while (!isCompleted) {
                console.log('Run not completed, waiting...');
                await new Promise(resolve => setTimeout(resolve, 1000));
                isCompleted = await checkRunStatus();
            }

            console.log('Run completed, fetching messages');
            const messages = await openai.beta.threads.messages.list(thread.id);
            const assistantMessage = messages.data.find(message => message.role === 'assistant');

            if (assistantMessage && assistantMessage.content) {
                //@ts-ignore
                const responseText = assistantMessage.content.map(content => content.text.value).join(' ');
                const responseJSON = JSON.parse(responseText);
                console.log("Assistant's Response: ", responseJSON);

                if (responseJSON.success !== true) {
                    console.log('Bio validation failed');
                    return { success: false, message: 'Информацията във въведеното био не е каквато се очаква да бъде. Моля въведете повече информация за себе си и използвайте подходящ език!' };
                }
            }
        }

        let additionalData;
        if (!usermetadata?.accountCompletedClient) {
            console.log('User account not completed, inserting new bio');
            additionalData = {
                ...validatedData,
                uploaderUuid: userUuid,
            };
            //@ts-ignore
            await db.insert(additionalDataTableClient).values(additionalData).execute();
            //@ts-ignore
            await clerkClient.users.updateUserMetadata(userUuid, {
                publicMetadata: { accountCompletedClient: true }
            });
        } else if (bioNeedsValidation) {
            console.log('User account completed, updating bio');
            additionalData = {
                bio: validatedData.bio, // Ensure only the bio is being updated
                uploaderUuid: userUuid,
            };
            //@ts-ignore
            await db.update(additionalDataTableClient).set(additionalData).where(eq(additionalDataTableClient.uploaderUuid, userUuid)).execute();
        }

        console.log('Inserting offer data');
        const offerData = {
            clientUuid: userUuid,
            errandUuid: validatedData.errandUuid,
            price: validatedData.price,
        };
        //@ts-ignore
        await db.insert(offers).values(offerData).execute();

        console.log('Errand created successfully');
        return { success: true, message: 'Errand created successfully' };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Възникна грешка!' };
    }
}
