import React from 'react';
import Image from 'next/image';
import { IAdUnit } from '@/types';
import Link from 'next/link';
interface Props {}

const AdUnit = (props: IAdUnit) => {
    return (
        <Link
            href={props.url}
            target="_blank"
            // rel="noopener noreferrer"
            className="rounded overflow-clip w-40 md:w-80 cursor-pointer ease-out duration-300 flex justify-center items-center md:p-10"
        >
            <div className="rounded overflow-clip w-40 md:w-80cursor-pointer ease-out duration-300 hover:scale-110">
                <div className='text-xs text-center'>AD</div>
                <Image
                    src={props.image}
                    alt={props.name}
                    className="object-cover rounded w-full h-auto overflow-clip ease-out duration-300 delay-100 hover:scale-105"
                />
            </div>
        </Link>
    );
};

export default AdUnit;
