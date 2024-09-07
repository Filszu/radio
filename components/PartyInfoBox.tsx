'use client';

import { useState, useEffect } from 'react';
import { Disc3 } from 'lucide-react';
import { THost } from '@/types';
import Link from 'next/link';

export function PartyInfoBox(props: THost) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        // Generate a random image URL
        const randomId = Math.floor(Math.random() * 1000);
        setImageUrl(`https://picsum.photos/seed/${randomId}/400/200`);
    }, []);

    return (
        // <div>
        //   {JSON.stringify(props)}

        // </div>
        <Link href={`/party/${props.hostUrl}`}>
            <div
                className="relative w-80 h-48 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl group  cursor-pointer"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md group-hover:backdrop-blur-sm transition-all duration-300"></div>
                <div className="relative z-10 h-full p-4 text-white flex flex-col justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="animate-spin">
                            <Disc3 size={40} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">
                                {props.hostName}
                            </h2>
                            <p className="text-sm opacity-75">
                                {/* {props.creatorId} */}
                                @author
                            </p>
                        </div>
                    </div>
                    <div className="text-sm opacity-75">
                        <p>/{props.hostUrl}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
