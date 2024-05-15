'use client';
import React, { useState } from 'react';
import { completeProfile } from '@/server/completeProfile'; // Import the server action

function AdditionalInfoModal({ isAccountCompleted }: any) {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const birthdate = formData.get('birthdate')?.toString();
        const bio = formData.get('bio')?.toString();

        if (!birthdate || !bio) {
            setError('Please fill in all the fields.');
            return;
        }

        const data = {
            birthDate: birthdate,
            bio: bio
        };

        setIsLoading(true);

        try {
            const result = await completeProfile(data);

            if (result.success) {
                window.location.reload();
            } else {
                setError(result.message || 'An error occurred.');
            }
        } catch (error) {
            setError('An error occurred while submitting the form.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {!isAccountCompleted && (
                <div>
                    <div>
                        <div className='px-2 pt-10'>
                            <div role="alert" className="alert alert-warning mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <span>Предупреждение: Вашите Errands няма да бъдат видими, докато не допълните липсващата информация в акаунта си! <button className='link' onClick={openModal}>Допълни липсваща информация.</button> </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isOpen && (
                <div>
                    <div id="default-modal" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-[calc(100%-1rem)] max-h-full">
                        <div className="relative p-4 w-full max-w-2xl max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Допълнителна информация
                                    </h3>
                                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeModal}>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className='px-10 pt-5'>
                                        {error && (
                                            <div role="alert" className="alert alert-error mt-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span>{error}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 px-10 py-10">
                                        <div className="w-full">
                                            <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Дата на раждане</label>
                                            <input type="date" name="birthdate" id="birthdate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Био</label>
                                            <p className='text-xs font-light pb-2 text-gray-600'>Дайте повече информация за себе си, за да може изпълнителите да ви избират.</p>
                                            <textarea id="bio" name="bio" rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Вашето био тук" required></textarea>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                        <button type="submit" className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary" disabled={isLoading}>
                                            {isLoading ? 'Зареждане...' : 'Попълни'}
                                        </button>
                                        <button onClick={closeModal} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Отказ</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AdditionalInfoModal;
