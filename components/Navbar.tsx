"use client"
import Link from 'next/link';
import React, { useState } from 'react';

function Navbar() {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

    return (
        <div>
            <div className='flex justify-between lg:block items-center sm:pr-8 lg:pr-0'>
                <div className="flex items-center lg:justify-between sm:justify-end sm:flex-grow-0 flex-grow justify-between pr-8 sm:pr-0 lg:pr-8 pl-8 flex-row-reverse lg:flex-row">
                    <div className='sm:hidden block'>
                        <ul className='sm:hidden flex flex-row-reverse gap-8 text-base-content items-center font-semibold'>
                            <Link href='/register' className=' p-1 px-2 text-sm rounded'><li>Регистрация</li></Link>
                        </ul>
                    </div>
                    <a href='https://www.errandix.bg'><div className='sm:w-60 w-48'><img src="/logo.png" alt="Errandix" /></div></a>
                    <div>
                        <div onClick={toggleNavbar} className='w-5 lg:hidden cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
                            </svg>
                        </div>
                        <ul className={`lg:flex hidden flex-row-reverse gap-8 text-base-content items-center font-medium ${!isNavbarOpen && 'hidden'}`}>
                            <Link href='/register' className='border border-base-content p-2 px-3 rounded'><li>Регистрация</li></Link>
                            <Link href='/login'><li>Вход</li></Link>
                            <Link href='/findjob'><li>Намери си работа</li></Link>
                            <Link href='/searchservice'><li>Нуждаеш се от услуга?</li></Link>
                        </ul>
                    </div>
                </div>
                <div className='sm:block hidden'>
                    <ul className='lg:hidden flex flex-row-reverse gap-8 text-base-content items-center font-medium'>
                        <Link href='/register' className='border border-base-content p-2 px-3 rounded'><li>Регистрация</li></Link>
                        <Link href='/login'><li>Вход</li></Link>
                    </ul>
                </div>
            </div>
            {isNavbarOpen && (
                <>
                    <div className='lg:hidden fixed h-full w-full max-w-72 bg-white top-0 left-0 p-5 z-50'>
                        <ul className='flex w-full flex-col gap-5'>
                            <Link href='/register' className='border border-base-content p-2 px-3 rounded bg-base-content text-white w-fit'><li>Регистрация</li></Link>
                            <Link href='/login'><li>Вход</li></Link>
                            <Link href='/findjob'><li>Намери си работа</li></Link>
                            <Link href='/searchservice'><li>Нуждаеш се от услуга?</li></Link>
                        </ul>
                    </div>
                    <div onClick={toggleNavbar} className='lg:hidden fixed z-49 bg-black opacity-25 top-0 left-0 w-full h-full'></div>
                </>
            )}
        </div>
    );
}

export default Navbar;
