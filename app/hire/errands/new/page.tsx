'use client';

import React from 'react';
import CategorySelector from '@/components/hire/createerrand/CategorySelector';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const Page: React.FC = () => {
    const handleCategoryChange = (selectedCategory: string, subcategories: string[]) => {
        // Handle category change logic if needed
        console.log('Selected Category:', selectedCategory);
        console.log('Subcategories:', subcategories);
    };

    return (
        <LoadScript
            //@ts-ignore
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            libraries={["places"]}
        >
            <div className='pt-20'>
                <section className="bg-white dark:bg-gray-900">
                    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Създай нов Errand</h2>
                        <form action="#">
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div className="sm:col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Заглавие</label>
                                    <p className='text-xs font-light pb-2 text-gray-600'>Това е <span className='font-bold'>най-важният компонент от създаването на Errand</span>, заглавието Ви трябва да включва ключови думи, които биха били търсени от търсещите работа.</p>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Напишете заглавето тук"
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="when" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Кога трябва да се извърши услугата?</label>
                                    <p className='text-xs font-light pb-2 text-gray-600'>На коя дата трябва да се извърши услугата? Може да бъде доуточнено с ученик.</p>
                                    <input
                                        type="date"
                                        name="when"
                                        id="when"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Кога трябва да се извърши услугата?"
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Къде трябва да се извърши услугата?</label>
                                    <p className='text-xs font-light pb-2 text-gray-600'>Не е необходимо да въвеждате точен адрес, а само ориентировъчен квартал или район.</p>
                                    <Autocomplete>
                                        <input
                                            type="text"
                                            name="location"
                                            id="location"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Лозенец"
                                            required
                                        />
                                    </Autocomplete>
                                </div>
                                <CategorySelector onCategoryChange={handleCategoryChange} />
                                <div className="w-full sm:col-span-2 sm:w-1/2">
                                    <label htmlFor="maxprice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Максимална цена за услуга (в лева)</label>
                                    <p className='text-xs font-light pb-2 text-gray-600'>Въведете максималната цена, която сте готови да заплатите за услугата.</p>
                                        <input
                                            type="number"
                                            name="maxprice"
                                            id="maxprice"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="20"
                                            required
                                        />
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Описание</label>
                                    <p className='text-xs font-light pb-2 text-gray-600'>Моля опишете по-точно в какво се състои работата.</p>
                                    <textarea
                                        id="description"
                                        rows={8}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Въведете описанието тук"
                                    ></textarea>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Специални изисквания</label>
                                    <p className='text-xs font-light pb-2 text-gray-600'>Моля отбележете специалните си изисквания към служителите, ако имате такива.</p>
                                    <textarea
                                        id="description"
                                        rows={8}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Въведете описанието тук"
                                    ></textarea>
                                </div>
                            </div>
                            <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                Създай Errand
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </LoadScript>
    );
};

export default Page;
