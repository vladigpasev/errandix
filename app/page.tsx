import React from 'react'

function Home() {
  return (
    <div className='herodesign w-full'>
      <div className='w-full max-w-4xl p-20 sm:pt-48 sm:px-20 lg:px-36 pt-28 px-10'>
        <h1><span className="text-white sm:text-5xl text-4xl font-semibold">Намери </span><span className="text-white sm:text-5xl text-4xl font-extralight">услугата</span><span className="text-white sm:text-5xl text-4xl font-semibold ">, която ти трябва лесно</span></h1>
        <div className='pt-8'>
          <form className="max-w-lg">
            <div className="flex">
              <div className="relative z-1 w-full">
                <input type="search" id="search-dropdown" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 " placeholder="Търси всякакви услуги..." required />
                <button type="submit" className="sm:absolute top-0 end-0 p-2.5 text-sm font-medium sm:h-full sm:m-0 mt-2 text-white bg-secondary sm:rounded-e-lg border border-secondary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary sm:w-auto w-full h-10 rounded">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                  <span className="sr-only">Търсене</span>
                </button>
              </div>
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
  )
}

export default Home