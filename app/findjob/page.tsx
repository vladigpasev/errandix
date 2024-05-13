import { SignedIn } from '@clerk/nextjs'
import React from 'react'

function Page() {
  return (
    <div className='pt-24'>
        <SignedIn>

        </SignedIn>
    </div>
  )
}

export default Page