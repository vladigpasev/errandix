import { SignedIn, SignedOut } from '@clerk/nextjs';
import React from 'react';
import { currentUser } from "@clerk/nextjs/server";
import Redirect from '@/components/Redirect';
import Link from 'next/link';

async function Home() {
  const user = await currentUser();

  return (
    <div>
      <SignedOut>
        <div className='herodesign w-full page-content'>
          <div className='w-full max-w-4xl p-20 sm:pt-48 sm:px-20 lg:px-36 pt-28 px-10'>
            <h1>
              <span className="text-white sm:text-5xl text-4xl font-semibold">Намери </span>
              <span className="text-white sm:text-5xl text-4xl font-extralight">услугата</span>
              <span className="text-white sm:text-5xl text-4xl font-semibold ">, която ти трябва, лесно</span>
            </h1>
            <div className='pt-8'>
              <form className="max-w-xl">
                <div className="flex w-full">
                  <Link href='/findjob' className='w-full'>
                    <div className="z-1 page-content w-full">
                      <input type="search" id="search-dropdown" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 " placeholder="Търси всякакви услуги..." required />
                    </div>
                  </Link>
                </div>
              </form>
              <div className='sm:flex hidden items-start gap-5 pt-8 text-white text-sm font-medium'>
                <div>Популярни:</div>
                <div className="card-actions justify-start ">
                  <div className="badge badge-outline text-sm font-medium">Разходка на куче</div>
                  <div className="badge badge-outline text-sm font-medium">Грижа за дете</div>
                  <div className="badge badge-outline text-sm font-medium">Почистване на къща</div>
                  <div className="badge badge-outline text-sm font-medium">Поддържане на градина</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='md:p-10 px-10 p-5 md:px-36 text-base-content font-semibold text-3xl'>
          <h2>Популярни услуги</h2>
          <div className='grid grid-cols-1 place-content-center md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 pt-10'>
            <div className='flex justify-center'><img src="/popular/1.svg" className='rounded-lg' /></div>
            <div className='flex justify-center'><img src="/popular/2.svg" className='rounded-lg' /></div>
            <div className='flex justify-center'><img src="/popular/3.svg" className='rounded-lg' /></div>
            <div className='flex justify-center'><img src="/popular/5.svg" className='rounded-lg' /></div>
          </div>
        </div>

        <div>
          <div className='md:p-10 px-10 p-5 md:px-36  bg-[#FFD28E] bg-opacity-40 dark:bg-opacity-40 grid lg:grid-cols-2 grid-cols-1 gap-5'>
            <div>
              <h2 className='text-base-content font-semibold text-3xl pb-10'>Защо Errandix?</h2>
              <div className='flex flex-col gap-5 text-xl font-medium'>
                <div className='flex gap-2'>
                  <div className='text-gray-500 dark:text-white'><svg fill='currentColor' width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z"></path><path d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z"></path></svg></div>
                  <div>Повече свободно време</div>
                </div>
                <div className='flex gap-2'>
                  <div className='text-gray-500 dark:text-white'><svg fill='currentColor' width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z"></path><path d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z"></path></svg></div>
                  <div>Спокойно ежедневие</div>
                </div>
                <div className='flex gap-2'>
                  <div className='text-gray-500 dark:text-white'><svg fill='currentColor' width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z"></path><path d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z"></path></svg></div>
                  <div>Гарантирана сигурност</div>
                </div>
              </div>
            </div>
            <div>
              <img src="/whyussvg.svg" className='rounded w-full' />
            </div>
          </div>
        </div>

        <div className='px-20 py-10 bg-white'>
          <div className=' mb-12'>
            <h2 className='text-3xl lg:text-4xl font-bold text-[#292929]'>Как работи?</h2>
            <p className='text-md mt-3 text-gray-600'>Разберете стъпките от създаването на обява за работа до намирането ѝ.</p>
          </div>

          <div className='space-y-12 md:space-y-0 px-6'>
            {/* Step 1 */}
            <div className='flex flex-col md:grid md:grid-cols-12 gap-6 items-center'>
              <div className='md:col-span-5'>
                <img src="/steps/create.svg" className='w-full max-w-md mx-auto' />
              </div>
              <div className='md:col-span-7'>
                <h3 className='text-lg font-semibold mb-3'>Работодателят създава обява</h3>
                <p className='text-gray-600'>Работодателите могат да създадат обява за работа, която да бъде лесно открита в платформата.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className='flex flex-col md:grid md:grid-cols-12 gap-6 items-center'>
              <div className='md:col-span-7 md:order-1 order-2'>
                <h3 className='text-lg font-semibold mb-3'>Ученикът открива обявата</h3>
                <p className='text-gray-600'>Ученикът открива обявата и предлага заплащане, за което би я извършил.</p>
              </div>
              <div className='md:col-span-5 md:order-2 order-1'>
                <img src="/steps/search.svg" className='w-full max-w-md mx-auto' />
              </div>
            </div>

            {/* Step 3 */}
            <div className='flex flex-col md:grid md:grid-cols-12 gap-6 items-center'>
              <div className='md:col-span-5'>
                <img src="/steps/choose.svg" className='w-full max-w-md mx-auto' />
              </div>
              <div className='md:col-span-7'>
                <h3 className='text-lg font-semibold mb-3'>Работодателят избира своя помощник</h3>
                <p className='text-gray-600'>Работодателят може да види профилите на желаещите за съответната работа и да си избере един от тях.</p>
              </div>
            </div>
          </div>
        </div>

        <div id='reviews' className="bg-gray-100 py-10 text-[#292929]">
          <div className='mb-12 px-20'>
            <h2 className='text-3xl lg:text-4xl font-bold'>Какво казват хората за нас?</h2>
          </div>
          <div className='flex flex-wrap justify-center gap-10 px-5 lg:px-52'>
            {[
              {
                name: "Nikolina Petrova",
                review: "Открих си работа за по-малко от 5 минути! Много съм доволна.",
                stars: 5,
              },
              {
                name: "Боян Петров",
                review: "Имах нужда от помощ с градината на село. Пуснах си обява и си намерих помощник!",
                stars: 5,
              },
              {
                name: "Генка Петакова",
                review: "Човек може да си намери работа много лесно и най-хубавото е, че ти сам си предлагаш цената за труда. Много хубава платформа!",
                stars: 5,
              },
            ].map((item, key) => (
              <div
                key={key}
                className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    {[...Array(item.stars)].map((star, index) => (
                      <svg key={index} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-yellow-500" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.396-.956 1.555-.956 1.951 0l1.562 3.77 4.16.606c.68.1 1.007 1.028.487 1.542l-3.008 2.93.709 4.125c.115.668-.585 1.176-1.175.859l-3.707-1.948-3.707 1.948c-.59.317-1.29-.191-1.175-.859l.709-4.125-3.008-2.93c-.52-.514-.193-1.442.487-1.542l4.16-.606 1.562-3.77z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mt-2">{item.review}</p>
                  <div className="mt-4">
                    <span className="text-[#F04624] font-semibold">{item.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="footer p-10 text-base-content">
          <aside>
            <img src="/logo-white.svg" alt="Errandix Logo" width={50} height={50} className='w-40 dark:hidden block' />
            <img src="/logo-black.svg" alt="Errandix Logo" width={50} height={50} className='w-40 hidden dark:block' />
            <p className='pl-4'>Еррандикс ЕООД. <br /> Всички права запазени 2024 ®</p>
          </aside>
          <nav className='pl-4'>
            <header className="footer-title">СОЦИАЛНИ</header>
            <div className="grid grid-flow-col gap-4">
              <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
              <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
              <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
            </div>
          </nav>
        </footer>
      </SignedOut>
      <SignedIn>
        <Redirect route="/findjob" />
      </SignedIn>
    </div>
  )
}

export default Home;
