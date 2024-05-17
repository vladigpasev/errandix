import React from 'react';

interface Offer {
    clientUuid: string;
    price: number;
    fullName: string;
    profileImageUrl: string;
    bio: string;
}

interface ErrandInfoProps {
    errand: {
        uuid: string;
        title: string;
        category: string;
        subCategory: string;
        description: string;
        specialReq: string;
        location: string;
        maxPrice: number;
        dateTime: string;
        clicks: number;
        offers: number;
        status: string;
        uploaderUuid: string;
    };
    offers: Offer[];
}

const ErrandInfoForHiring: React.FC<ErrandInfoProps> = ({ errand, offers }) => {
    return (
        <div className='py-24'>
            <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full mt-8">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{errand.title}</h5>
                <div className='font-extralight text-gray-600 pb-2'>{new Date(errand.dateTime).toLocaleDateString()}</div>
                <div className="font-normal text-gray-700 dark:text-gray-400">
                    <p>{errand.description}</p>
                </div>
                <div className="font-light text-gray-600 dark:text-gray-400 pt-4">
                    <div className='font-semibold'>Специални изисквания:</div>
                    <p>{errand.specialReq}</p>
                </div>
                <div className="font-light text-gray-600 dark:text-gray-400 pt-4">
                    <div className='font-semibold'>Локация:</div>
                    <p>{errand.location}</p>
                </div>
                <div className="font-light text-gray-600 dark:text-gray-400 pt-4">
                    <div className='font-semibold'>Максимално заплащане:</div>
                    <p>{errand.maxPrice} лв</p>
                </div>
                <div className="card-actions justify-end text-primary pt-4">
                    <div className="badge badge-outline">{errand.category}</div>
                    <div className="badge badge-outline">{errand.subCategory}</div>
                </div>
                <br />
                <hr />
                <div className='text-xl pt-2'>Кандидатури</div>
                <div className="space-y-4 mt-4">
                    {offers.map((offer, index) => (
                        <div key={index} className="flex items-center p-4 bg-gray-100 rounded-lg shadow dark:bg-gray-700">
                            <img className="w-16 h-16 rounded-full" src={offer.profileImageUrl} alt={offer.fullName} />
                            <div className="ml-4">
                                <div className="text-lg font-bold text-gray-900 dark:text-white">{offer.fullName}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-300">{offer.bio}</div>
                                <div className="text-lg font-semibold text-gray-800 dark:text-gray-100 pt-2">{offer.price} лв</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ErrandInfoForHiring;
