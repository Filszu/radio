'use client';
import { Cookie } from '@/types';
import createCookie from '@/utils/appCookies';
import React, { useEffect } from 'react';

const Ref = async ({code}:{code:string}) => {
    useEffect(() => {
        createCookie({
            name: 'promocode',
            value: code,
        } as Cookie).then();
    }, []);
    return (
    // <div>ref</div>

    <></>)
    ;
};

export default Ref;
