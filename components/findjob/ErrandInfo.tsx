import React from 'react';
import ApplyBtn from './ApplyButton';

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
}

const ErrandInfo: React.FC<ErrandInfoProps> = ({ errand, bio }:any) => {
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
                <ApplyBtn maxprice={errand.maxPrice} errandUuid={errand.uuid} bio={bio} />
            </div>
            
        </div>
    );
}

export default ErrandInfo;
