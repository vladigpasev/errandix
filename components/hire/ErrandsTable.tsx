"use client"
import React, { useState } from 'react';

function ErrandsTable() {
    const [activeTab, setActiveTab] = useState('active');  // Initial active tab state

    const data = [
        {
            id: 1,
            imgSrc: "/docs/images/products/apple-watch.png",
            errand: "Active errand details...",
            clicks: 10,
            offers: 2,
            status: 'active'
        },
        {
            id: 2,
            imgSrc: "/docs/images/products/apple-watch.png",
            errand: "Draft errand details...",
            clicks: 3,
            offers: 0,
            status: 'draft'
        },
        {
            id: 3,
            imgSrc: "/docs/images/products/apple-watch.png",
            errand: "Paused errand details...",
            clicks: 5,
            offers: 1,
            status: 'paused'
        },
        {
            id: 4,
            imgSrc: "/docs/images/products/apple-watch.png",
            errand: "Paused errand details 2...",
            clicks: 5,
            offers: 1,
            status: 'paused'
        },
        {
            id: 4,
            imgSrc: "/docs/images/products/apple-watch.png",
            errand: "Deleted errand details...",
            clicks: 0,
            offers: 0,
            status: 'deleted'
        }
    ];

    const handleTabClick = (tab: any) => {
        setActiveTab(tab);  // Update the active tab state
    };

    return (
        <div>
            <div className='font-light text-4xl py-2 pb-10'>Errands</div>

            <button type="button" className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary">
               
                <svg className="w-3.5 h-3.5 me-2"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                Създай Errand
            </button>

            <div className="pt-10 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                    {Object.entries({ active: 'Активни', draft: 'Чернови', paused: 'Паузирани', deleted: 'Изтрити' }).map(([key, label]) => (
                        <li key={key} className="me-2">
                            <a href="#" onClick={() => handleTabClick(key)} className={`inline-block p-4 border-b-2 ${activeTab === key ? 'border-primary text-primary' : 'border-transparent'} rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}>
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='pt-10'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-16 py-3">
                                    <span className="sr-only">Изображение</span>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Errand
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Кликове
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Предложения
                                </th>
                                <th scope="col" className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.filter(item => item.status === activeTab).map((item) => (
                                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="p-4">
                                        <img src={item.imgSrc} className="w-16 md:w-32 max-w-full max-h-full" alt="Product" />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {item.errand}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {item.clicks}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {item.offers}
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium hover:underline">Edit</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ErrandsTable;
