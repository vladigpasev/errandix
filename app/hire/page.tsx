import { SignedIn } from '@clerk/nextjs';
import React from 'react';
import { currentUser } from "@clerk/nextjs/server";
import ErrandsTable from '@/components/hire/ErrandsTable';

function Page() {
    
    return (
        <div className='pt-24 px-[10%]'>
            <SignedIn>
                <ErrandsTable />
            </SignedIn>
        </div>
    );
}

export default Page;
