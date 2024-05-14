"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import RegisterBtn from './RegisterBtn';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import UserButton from './UserButton';
import { usePathname } from 'next/navigation'


function Navbar({ userProfileUrl }: any) {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
    const pathname = usePathname()

    console.log(pathname);
    return (
        <div>
            <div className='fixed flex justify-between lg:block items-center sm:pr-8 lg:pr-0 bg-white dark:bg-black w-full z-49 navbartozindex'>
                <div className="flex items-center lg:justify-between sm:justify-end sm:flex-grow-0 flex-grow justify-between pr-8 sm:pr-0 lg:pr-8 pl-8 flex-row-reverse lg:flex-row">
                    <div className='sm:hidden block'>
                        <ul className='sm:hidden flex flex-row-reverse gap-8 text-base-content items-center font-semibold'>
                            <SignedOut>
                                <RegisterBtn smallDevice />
                            </SignedOut>
                            <SignedIn>
                                <UserButton userProfileUrl={userProfileUrl} />
                            </SignedIn>
                        </ul>
                    </div>
                    <a href='/'><div className='sm:w-60 w-48'><img src="/logo-white.svg" alt="Errandix" className='block dark:hidden' /><img src="/logo-black.svg" alt="Errandix" className='dark:block hidden' /></div></a>
                    <div>
                        <div onClick={toggleNavbar} className='w-5 lg:hidden cursor-pointer text-black dark:text-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill='currentColor'>
                                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                            </svg>
                        </div>
                        <ul className={`lg:flex hidden flex-row-reverse gap-8 text-base-content items-center font-medium ${!isNavbarOpen && 'hidden'}`}>
                            <SignedOut>
                                <RegisterBtn />
                                <SignInButton mode='modal'><li className='cursor-pointer'>Вход</li></SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton userProfileUrl={userProfileUrl} />
                            </SignedIn>
                            {pathname.startsWith('/hire') && (
                                <>
                                    <Link href='/findjob' className='border border-base-content px-5 py-2 rounded'><li>Открий си работа</li></Link>
                                    <Link href='/hire'><li>My Errands</li></Link>
                                </>
                            )}
                            {pathname.startsWith('/findjob') && (
                                <>
                                    <Link href='/hire' className='border border-base-content px-5 py-2 rounded'><li>Предложи работа</li></Link>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
                <div className='sm:block hidden'>
                    <ul className='lg:hidden flex flex-row-reverse gap-8 text-base-content items-center font-medium'>
                        <SignedOut>
                            <RegisterBtn />
                            <SignInButton mode='modal'><li className='cursor-pointer'>Вход</li></SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton userProfileUrl={userProfileUrl} />
                        </SignedIn>
                    </ul>
                </div>
            </div>
            {isNavbarOpen && (
                <>
                    <div className='navbarstyle lg:hidden fixed h-full w-full max-w-72 bg-white top-0 left-0 p-5 z-100 text-[#292929]'>
                        <ul className='flex w-full flex-col gap-5'>
                            <SignedOut>
                                <RegisterBtn onOpenNavbar />
                                <Link href='/login'><li>Вход</li></Link>
                            </SignedOut>
                            {pathname.startsWith('/hire') && (
                                <>
                                    <Link href='/findjob' className='border border-black px-5 py-2 rounded'><li>Открий си работа</li></Link>
                                    <Link href='/hire'><li>My Errands</li></Link>
                                </>
                            )}
                            {pathname.startsWith('/findjob') && (
                                <>
                                    <Link href='/hire' className='border border-black px-5 py-2 rounded'><li>Предложи работа</li></Link>
                                </>
                            )}
                        </ul>
                    </div>
                    <div onClick={toggleNavbar} className='overlay lg:hidden fixed z-49 bg-black opacity-25 top-0 left-0 w-full h-full'></div>
                </>
            )}
        </div>
    );
}

export default Navbar;
