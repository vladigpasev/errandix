"use client"
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { getAllErrands } from '@/server/getAllErrands'

function Page() {
  const [errands, setErrands] = useState([]);

  useEffect(() => {
    async function fetchErrands() {
      const errandsData = await getAllErrands();
      //@ts-ignore
      setErrands(errandsData);
    }
    fetchErrands();
  }, []);

  return (
    <div className='pt-24 px-24 dark:min-h-screen'>
      <SignedIn>
        <div className='flex flex-col gap-5'>
          {errands.map((errand) => (
            //@ts-ignore
            <a key={errand.uuid} href={"/findjob/errands/" + errand.uuid} className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full">
              {/* @ts-ignore */}
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{errand.title}</h5>
              {/* @ts-ignore */}
              <div className='font-extralight text-gray-600 pb-2'>{new Date(errand.date).toLocaleDateString()}</div>
              {/* @ts-ignore */}
              <div className="font-normal text-gray-700 dark:text-gray-400"><p>{errand.description}</p></div>
              <div className="font-light text-gray-600 dark:text-gray-400 pt-4">
                <div className='font-semibold'>Специални изисквания:</div>
                {/* @ts-ignore */}
                <p>{errand.specialReq}</p>
              </div>
              <div className="card-actions justify-end text-primary">
                {/* @ts-ignore */}
                <div className="border border-primary rounded-full px-2 py-1">{errand.category}</div>
                {/* @ts-ignore */}
                <div className="border border-primary rounded-full px-2 py-1">{errand.subCategory}</div>
              </div>
            </a>
          ))}
        </div>
      </SignedIn>

      <SignedOut>
        <div className='flex flex-col gap-5'>
          {errands.map((errand) => (
            //@ts-ignore
            <SignInButton>
              <div key={errand.uuid} className="cursor-pointer block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full">
                {/* @ts-ignore */}
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{errand.title}</h5>
                {/* @ts-ignore */}
                <div className='font-extralight text-gray-600 pb-2'>{new Date(errand.date).toLocaleDateString()}</div>
                {/* @ts-ignore */}
                <div className="font-normal text-gray-700 dark:text-gray-400"><p>{errand.description}</p></div>
                <div className="font-light text-gray-600 dark:text-gray-400 pt-4">
                  <div className='font-semibold'>Специални изисквания:</div>
                  {/* @ts-ignore */}
                  <p>{errand.specialReq}</p>
                </div>
                <div className="card-actions justify-end text-primary">
                  {/* @ts-ignore */}
                  <div className="border border-primary rounded-full px-2 py-1">{errand.category}</div>
                  {/* @ts-ignore */}
                  <div className="border border-primary rounded-full px-2 py-1">{errand.subCategory}</div>
                </div>
              </div>
            </SignInButton>
          ))}
        </div>
      </SignedOut>

    </div>
  )
}

export default Page