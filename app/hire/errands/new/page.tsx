"use client"
import React, { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import CategorySelector from '@/components/hire/createerrand/CategorySelector';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { createErrand } from '@/server/createErrand';

const Page: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        when: '',
        location: '',
        category: '',
        subCategory: '',
        maxprice: '',
        description: '',
        specialReq: ''
    });

    const [errors, setErrors] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null); // Reference for the input field
    const router = useRouter(); // Use the useRouter hook

    const handleCategoryChange = (selectedCategory: string, selectedSubcategory: string) => {
        setFormData({
            ...formData,
            category: selectedCategory,
            subCategory: selectedSubcategory
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAutocompleteLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
        autocompleteRef.current = autocomplete;
    }, []);

    const handleAutocomplete = () => {
        if (autocompleteRef.current && inputRef.current) {
            const place = autocompleteRef.current.getPlace();
            const inputValue = inputRef.current.value; // Get the value directly from the input field

            if (place && place.formatted_address) {
                setFormData({
                    ...formData,
                    location: inputValue // Save the value as it appears in the input field
                });
            } else {
                console.error("No address available for this place.");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formattedData = {
            title: formData.name,
            dateTime: formData.when,
            location: formData.location,
            category: formData.category,
            subCategory: formData.subCategory,
            maxPrice: formData.maxprice,
            description: formData.description,
            specialReq: formData.specialReq
        };

        const result = await createErrand(formattedData);
        if (result.success) {
            // Redirect to a success page or another page after successful submission
            router.push('/hire'); // Adjust the path to your desired route
        } else {
            setErrors(result.errorfields || []);
        }

        setIsSubmitting(false);
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
                        {errors.length > 0 && (
                            <div className='px-2 pb-4'>
                                <div role="alert" className="alert alert-error mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>Някои полета не са попълнени, както се очаква. Моля поправете информацията в тях!</span>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div className="sm:col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Заглавие</label>
                                    <p className='text-xs font-light pb-2 text-gray-600'>Това е <span className='font-bold'>най-важният компонент от създаването на Errand</span>, заглавието Ви трябва да включва ключови думи, които биха били търсени от търсещите работа.</p>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`bg-gray-50 border ${errors.includes('title') ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
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
                                        value={formData.when}
                                        onChange={handleInputChange}
                                        className={`bg-gray-50 border ${errors.includes('dateTime') ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                                        placeholder="Кога трябва да се извърши услугата?"
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Къде трябва да се извърши услугата?</label>
                                    <p className='text-xs font-light pb-2 text-gray-600'>Не е необходимо да въвеждате точен адрес, а само ориентировъчен квартал или район.</p>
                                    <Autocomplete
                                        onLoad={handleAutocompleteLoad}
                                        onPlaceChanged={handleAutocomplete}
                                    >
                                        <input
                                            type="text"
                                            name="location"
                                            id="location"
                                            ref={inputRef} // Reference for the input field
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            className={`bg-gray-50 border ${errors.includes('location') ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                                            placeholder="Лозенец"
                                            required
                                        />
                                    </Autocomplete>
                                </div>
                                {/* @ts-ignore */}
                                <CategorySelector onCategoryChange={handleCategoryChange} />
                                <div className="w-full sm:col-span-2 sm:w-1/2">
                                    <label htmlFor="maxprice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Максимална цена за услуга (в лева)</label>
                                    <p className='text-xs font-light pb-2 text-gray-600'>Въведете максималната цена, която сте готови да заплатите за услугата.</p>
                                    <input
                                        type="number"
                                        name="maxprice"
                                        id="maxprice"
                                        value={formData.maxprice}
                                        onChange={handleInputChange}
                                        className={`bg-gray-50 border ${errors.includes('maxPrice') ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                                        placeholder="20"
                                        required
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Описание</label>
                                    <p className='text-xs font-light pb-2 text-gray-600'>Моля опишете по-точно в какво се състои работата.</p>
                                    <textarea
                                        name="description"
                                        id="description"
                                        rows={8}
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${errors.includes('description') ? 'border-red-500' : 'border-gray-300'} focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                                        placeholder="Въведете описанието тук"
                                        required
                                    ></textarea>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="specialReq" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Специални изисквания</label>
                                    <p className='text-xs font-light pb-2 text-gray-600'>Моля отбележете специалните си изисквания към служителите, ако имате такива.</p>
                                    <textarea
                                        name="specialReq"
                                        id="specialReq"
                                        rows={8}
                                        value={formData.specialReq}
                                        onChange={handleInputChange}
                                        className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${errors.includes('special_requirements') ? 'border-red-500' : 'border-gray-300'} focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                                        placeholder="Въведете специални изисквания тук"

                                    ></textarea>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className={`inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white ${isSubmitting ? 'bg-gray-500' : 'bg-primary'} rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 ${isSubmitting ? '' : 'hover:bg-primary-800'}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Loading...' : 'Създай Errand'}
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </LoadScript>
    );
};

export default Page;
